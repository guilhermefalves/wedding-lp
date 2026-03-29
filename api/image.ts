import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDriveClient, FOLDER_ID, setCors } from "./_drive";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const id = req.query.id as string;
  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  try {
    const drive = await getDriveClient();

    // Verify file belongs to our folder
    const meta = await drive.files.get({
      fileId: id,
      fields: "id,parents,mimeType",
      supportsAllDrives: true,
    });

    if (!meta.data.parents?.includes(FOLDER_ID)) {
      res.status(403).json({ error: "Access denied" });
      return;
    }

    const response = await drive.files.get(
      { fileId: id, alt: "media", supportsAllDrives: true },
      { responseType: "stream" },
    );

    res.setHeader("Content-Type", meta.data.mimeType || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");

    (response.data as NodeJS.ReadableStream).pipe(res);
  } catch (err) {
    console.error("Image proxy error:", err);
    res.status(500).json({ error: "Erro ao buscar imagem" });
  }
}
