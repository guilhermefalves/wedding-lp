/**
 * Script para obter o refresh token do Google OAuth2.
 *
 * Uso:
 *   npx tsx scripts/get-token.ts
 *
 * Pré-requisitos:
 *   1. Criar credenciais OAuth2 no Google Cloud Console
 *   2. Preencher GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no .env.local
 */

import { config } from "dotenv";
import { google } from "googleapis";
import http from "http";

config({ path: ".env.local" });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Erro: GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET devem estar no .env.local",
  );
  process.exit(1);
}

const REDIRECT_URI = "http://localhost:3000/callback";

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/drive.file"],
});

console.log("\n1. Abra este link no navegador:\n");
console.log(authUrl);
console.log("\n2. Autorize o acesso e aguarde o redirecionamento...\n");

const server = http.createServer(async (req, res) => {
  const parsed = new URL(req.url || "", "http://localhost:3000");

  if (parsed.pathname === "/callback") {
    const code = parsed.searchParams.get("code");

    if (!code) {
      res.writeHead(400);
      res.end("Erro: código não encontrado");
      return;
    }

    try {
      const { tokens } = await oauth2.getToken(code);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<h1>Pronto!</h1><p>Refresh token obtido. Pode fechar esta aba.</p>",
      );

      console.log("Refresh token obtido com sucesso!\n");
      console.log("Adicione esta linha ao seu .env.local:\n");
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);

      server.close();
      process.exit(0);
    } catch (err) {
      res.writeHead(500);
      res.end("Erro ao trocar código por token");
      console.error("Erro:", err);
      server.close();
      process.exit(1);
    }
  }
});

server.listen(3000, () => {
  console.log("Servidor aguardando callback em http://localhost:3000...");
});
