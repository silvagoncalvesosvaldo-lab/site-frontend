// scripts/createTransp.js
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { Client, Databases, Query } = require('node-appwrite');

async function main() {
  try {
    const [,, email, senha] = process.argv;
    if (!email || !senha) {
      console.error('Uso: node scripts/createTransp.js <email> <senha>');
      process.exit(1);
    }

    const {
      APPWRITE_ENDPOINT,
      APPWRITE_PROJECT_ID,
      APPWRITE_API_KEY,
      APPWRITE_DB_ID,
      APPWRITE_TRANSPORTERS_COLLECTION_ID,
    } = process.env;

    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY || !APPWRITE_DB_ID || !APPWRITE_TRANSPORTERS_COLLECTION_ID) {
      console.error('Erro: Variáveis de ambiente do Appwrite não configuradas.');
      process.exit(1);
    }

    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .setKey(APPWRITE_API_KEY);

    const db = new Databases(client);

    const senhaHash = await bcrypt.hash(senha, 10);

    const existing = await db.listDocuments(
      APPWRITE_DB_ID,
      APPWRITE_TRANSPORTERS_COLLECTION_ID,
      [Query.equal('email', email)]
    );

    if (existing.total > 0) {
      const doc = existing.documents[0];
      const updated = await db.updateDocument(
        APPWRITE_DB_ID,
        APPWRITE_TRANSPORTERS_COLLECTION_ID,
        doc.$id,
        { senha_hash: senhaHash, role: 'transportador' }
      );
      console.log(`Transportador atualizado: ${updated.$id}`);
    } else {
      const created = await db.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_TRANSPORTERS_COLLECTION_ID,
        'unique()',
        { email, senha_hash: senhaHash, role: 'transportador' }
      );
      console.log(`Transportador criado: ${created.$id}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar/atualizar transportador:', err?.message || err);
    process.exit(1);
  }
}

main();
