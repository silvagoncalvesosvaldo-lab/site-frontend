// scripts/createClient.js
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { Client, Databases, Query } = require('node-appwrite');

async function main() {
  try {
    // -------- Args --------
    const [,, email, senha, roleArg, nomeArg] = process.argv;
    if (!email || !senha) {
      console.error('Uso: node scripts/createClient.js <email> <senha> [role] [nome]');
      process.exit(1);
    }
    const role = (roleArg || 'cliente').toLowerCase(); // cliente (default) ou transportador
    const nome = nomeArg || null;

    // -------- Variáveis do .env --------
    const {
      APPWRITE_ENDPOINT,
      APPWRITE_PROJECT_ID,
      APPWRITE_API_KEY,
      APPWRITE_DB_ID,
      APPWRITE_CLIENTS_COLLECTION_ID,
      APPWRITE_TRANSPORTERS_COLLECTION_ID, // precisa estar no .env
    } = process.env;

    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY || !APPWRITE_DB_ID) {
      console.error('Erro: Variáveis de ambiente do Appwrite ausentes.');
      process.exit(1);
    }

    // escolhe a collection pelo papel
    const collectionId =
      role === 'transportador'
        ? APPWRITE_TRANSPORTERS_COLLECTION_ID
        : APPWRITE_CLIENTS_COLLECTION_ID;

    if (!collectionId) {
      console.error(`Erro: Collection ID ausente para a role "${role}". Verifique seu .env.`);
      process.exit(1);
    }

    // -------- Conexão Appwrite --------
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .setKey(APPWRITE_API_KEY);

    const db = new Databases(client);

    // -------- Hash da senha --------
    const senhaHash = await bcrypt.hash(senha, 10);

    // -------- Verifica se já existe --------
    const existing = await db.listDocuments(
      APPWRITE_DB_ID,
      collectionId,
      [Query.equal('email', email)]
    );

    if (existing.total > 0) {
      const doc = existing.documents[0];
      const updateData = { senha_hash: senhaHash, role };
      if (nome) updateData.nome = nome;

      const updated = await db.updateDocument(
        APPWRITE_DB_ID,
        collectionId,
        doc.$id,
        updateData
      );
      console.log(`Usuário atualizado (${role}): ${updated.$id}`);
    } else {
      const newData = { email, senha_hash: senhaHash, role };
      if (nome) newData.nome = nome;

      const created = await db.createDocument(
        APPWRITE_DB_ID,
        collectionId,
        'unique()', // ID automático
        newData
      );
      console.log(`Usuário criado (${role}): ${created.$id}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar/atualizar usuário:', err?.message || err);
    process.exit(1);
  }
}

main();
