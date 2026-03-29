import type { VercelRequest, VercelResponse } from "@vercel/node";
import formidable from "formidable";
import fs from "fs";
import { getDriveClient, FOLDER_ID, setCors } from "./_drive";

export const config = {
  api: { bodyParser: false },
};

const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
]);

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

function sanitize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 60);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable({
    maxFileSize: MAX_SIZE,
    keepExtensions: true,
  });

  let fields: formidable.Fields;
  let files: formidable.Files;

  try {
    [fields, files] = await form.parse(req);
  } catch {
    res.status(413).json({ error: "Arquivo maior que 100 MB" });
    return;
  }

  const fileArray = files.file;
  const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

  if (!file) {
    res.status(400).json({ error: "Nenhum arquivo enviado" });
    return;
  }

  if (!file.mimetype || !ALLOWED_MIMES.has(file.mimetype)) {
    res.status(415).json({ error: "Tipo de arquivo não permitido" });
    return;
  }

  const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;

  const ext = file.originalFilename?.split(".").pop() || "jpg";
  const randomId = Math.random().toString(36).substring(2, 10);
  const safeName = name ? sanitize(name) : "anonimo";
  const filename = `${safeName}_${randomId}.${ext}`;

  try {
    const drive = await getDriveClient();
    await drive.files.create({
      requestBody: {
        name: filename,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.mimetype!,
        body: fs.createReadStream(file.filepath),
      },
      fields: "id,name",
      supportsAllDrives: true,
    });

    res.status(200).json({ success: true, filename });
  } catch (err) {
    console.error("Drive upload error:", err);
    res.status(500).json({ error: "Erro ao enviar para o Drive" });
  }
}
