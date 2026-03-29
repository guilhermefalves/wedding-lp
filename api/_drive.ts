import type { VercelResponse } from "@vercel/node";
import { config } from "dotenv";
import { google } from "googleapis";

config({ path: ".env.local" });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

export async function getDriveClient() {
  const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oauth2.setCredentials({ refresh_token: REFRESH_TOKEN });

  return google.drive({ version: "v3", auth: oauth2 });
}

export const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

export function setCors(res: VercelResponse) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://noemyeguilherme.com.br",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
