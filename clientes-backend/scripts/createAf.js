/* scripts/createAf.js */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Client, Databases, ID, Query } = require('node-appwrite');

(async () => {
  const email = 'afl@exemplo.com';
  const senha = '123';

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);
  const dbId = process.env.APPWRITE_DB_ID;
  const colId = process.env.APPWRITE_AF_COLLECTION_ID;

  try {
    const existing = await db.listDocuments(dbId, colId, [Query.equal('email', email)]);
    if (existing.total > 0) {
      console.log('Afiliado já existe:', existing.documents[0].$id);
      process.exit(0);
    }
    const senha_hash = await bcrypt.hash(senha, 10);
    const doc = await db.createDocument(dbId, colId, ID.unique(), { email, senha_hash, nome: 'Afiliado Teste' });
    console.log('Afiliado criado:', doc.$id);
  } catch (err) {
    console.error('Erro ao criar afiliado:', err.message);
    process.exit(1);
  }
})();
