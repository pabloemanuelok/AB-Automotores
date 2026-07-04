export function parseCombustible(description: string): string | null {
  const firstLine = description.split("\n")[0];
  if (firstLine.startsWith("Combustible: ")) {
    return firstLine.replace("Combustible: ", "").trim();
  }
  return null;
}

export function stripCombustible(description: string): string {
  const lines = description.split("\n");
  if (lines[0].startsWith("Combustible: ")) {
    return lines.slice(1).join("\n").trimStart();
  }
  return description;
}

export function buildDescription(combustible: string, notas: string): string {
  if (!combustible) return notas;
  return `Combustible: ${combustible}\n${notas}`;
}
