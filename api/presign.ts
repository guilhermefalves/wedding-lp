import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, BUCKET, setCors } from "./_s3";

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

  const { filename, contentType } = req.body || {};

  if (!filename || !contentType) {
    res.status(400).json({ error: "Missing filename or contentType" });
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "video/mp4",
    "video/quicktime",
  ];

  if (!allowedTypes.includes(contentType)) {
    res.status(415).json({ error: "Tipo de arquivo não permitido" });
    return;
  }

  try {
    const key = `wedding/${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.status(200).json({ url });
  } catch (err) {
    console.error("Presign error:", err);
    res.status(500).json({ error: "Erro ao gerar URL de upload" });
  }
}
