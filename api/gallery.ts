import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
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

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const all = req.query.all === "true";
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: "wedding/",
      MaxKeys: all ? 200 : 4,
    });

    const data = await s3.send(command);
    const region = process.env.AWS_REGION || "sa-east-1";

    const files = (data.Contents || [])
      .filter((obj) => obj.Key && !obj.Key.endsWith("/"))
      .map((obj) => ({
        url: `https://${BUCKET}.s3.${region}.amazonaws.com/${obj.Key}`,
      }));

    res.setHeader("Cache-Control", "public, s-maxage=30");
    res.status(200).json({ files });
  } catch (err) {
    console.error("Gallery error:", err);
    res.status(500).json({ error: "Erro ao buscar galeria" });
  }
}
