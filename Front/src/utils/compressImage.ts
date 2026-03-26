import imageCompression from "browser-image-compression";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 1200,
  useWebWorker: true,
  fileType: "image/webp",
  initialQuality: 0.8,
};

export async function compressImage(file: File): Promise<File> {
  const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([compressed], `${baseName}.webp`, { type: "image/webp" });
}
