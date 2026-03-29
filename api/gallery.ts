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

  try {
    const drive = await getDriveClient();
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`,
      orderBy: "createdTime desc",
      pageSize: 5,
      fields: "files(id,name,thumbnailLink)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    const files = (response.data.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      thumbnail: f.thumbnailLink,
    }));

    res.status(200).json({ files });
  } catch (err) {
    console.error("Drive list error:", err);
    res.status(500).json({ error: "Erro ao buscar galeria" });
  }
}
