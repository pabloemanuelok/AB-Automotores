export interface VehicleSpecs {
  version: string;
  motor: string;
  combustible: string;
  potencia: string;
  transmision: string;
  traccion: string;
  autonomia: string;
  velocidadMax: string;
  largo: string;
  ancho: string;
  alto: string;
  tanque: string;
  baul: string;
}

const SPEC_KEYS: Record<string, keyof VehicleSpecs> = {
  "Version": "version",
  "Motor": "motor",
  "Combustible": "combustible",
  "Potencia": "potencia",
  "Transmision": "transmision",
  "Traccion": "traccion",
  "Autonomia": "autonomia",
  "VelocidadMax": "velocidadMax",
  "Largo": "largo",
  "Ancho": "ancho",
  "Alto": "alto",
  "Tanque": "tanque",
  "Baul": "baul",
};

export function parseVehicleSpecs(description: string): VehicleSpecs {
  const specs: VehicleSpecs = {
    version: "", motor: "", combustible: "", potencia: "", transmision: "",
    traccion: "", autonomia: "", velocidadMax: "", largo: "", ancho: "",
    alto: "", tanque: "", baul: "",
  };
  const lines = description.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  for (const line of lines) {
    if (line === "---") break;
    const colonIdx = line.indexOf(": ");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 2).trim();
    const field = SPEC_KEYS[key];
    if (field) specs[field] = value;
  }
  return specs;
}

export function parseNotas(description: string): string {
  const desc = description.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const sepIdx = desc.indexOf("\n---\n");
  if (sepIdx !== -1) return desc.slice(sepIdx + 5).trim();
  // Backward-compat: skip all leading spec key-value lines
  const lines = desc.split("\n");
  let i = 0;
  while (i < lines.length) {
    if (lines[i] === "---") { i++; break; }
    const colonIdx = lines[i].indexOf(": ");
    if (colonIdx === -1) break;
    const key = lines[i].slice(0, colonIdx);
    if (!SPEC_KEYS[key]) break;
    i++;
  }
  return lines.slice(i).join("\n").trimStart();
}

export function buildDescription(specs: Partial<VehicleSpecs>, notas: string): string {
  const lines: string[] = [];
  const keyMap: [string, keyof VehicleSpecs][] = [
    ["Version", "version"],
    ["Motor", "motor"],
    ["Combustible", "combustible"],
    ["Potencia", "potencia"],
    ["Transmision", "transmision"],
    ["Traccion", "traccion"],
    ["Autonomia", "autonomia"],
    ["VelocidadMax", "velocidadMax"],
    ["Largo", "largo"],
    ["Ancho", "ancho"],
    ["Alto", "alto"],
    ["Tanque", "tanque"],
    ["Baul", "baul"],
  ];
  for (const [label, field] of keyMap) {
    const val = specs[field];
    if (val) lines.push(`${label}: ${val}`);
  }
  if (lines.length === 0) return notas;
  return `${lines.join("\n")}\n---\n${notas}`;
}

// Backward-compat: still used by Card (being removed) and EditVehicleModal if any
export function parseCombustible(description: string): string | null {
  const specs = parseVehicleSpecs(description);
  if (specs.combustible) return specs.combustible;
  // old format
  const firstLine = description.split("\n")[0];
  if (firstLine.startsWith("Combustible: ")) return firstLine.replace("Combustible: ", "").trim();
  return null;
}

export function stripCombustible(description: string): string {
  return parseNotas(description);
}
