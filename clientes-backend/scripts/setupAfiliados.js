// scripts/setupAfiliados.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
  Client, Databases, ID, Permission, Role
} = require('node-appwrite');

const {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DB_ID,
} = process.env;

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY || !APPWRITE_DB_ID) {
  console.error('Faltam variáveis no .env (APPWRITE_*).');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const db = new Databases(client);

(async () => {
  // 1) Se já existir uma coleção com o nome "afiliados", usa ela; senão cria.
  const list = await db.listCollections(APPWRITE_DB_ID);
  let col = list.collections.find(c => c.name === 'afiliados');

  if (!col) {
    col = await db.createCollection(
      APPWRITE_DB_ID,
      ID.unique(),
      'afiliados',
      [
        Permission.read(Role.any()),          // leitura pública (ajuste depois se quiser)
        Permission.create(Role.any()),        // ajuste depois se quiser
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]
    );
    // atributos: email (obrigatório), senha_hash (obrigatório), nome (opcional)
    await db.createStringAttribute(APPWRITE_DB_ID, col.$id, 'email', 255, true);
    await db.createStringAttribute(APPWRITE_DB_ID, col.$id, 'senha_hash', 255, true);
    await db.createStringAttribute(APPWRITE_DB_ID, col.$id, 'nome', 255, false);

    // índice único em email
    await db.createIndex(APPWRITE_DB_ID, col.$id, 'idx_email_unique', 'unique', ['email'], []);
  }

  console.log('OK: coleção afiliados', col.$id);
  console.log('Copie este ID para o seu .env como APPWRITE_AF_COLLECTION_ID=' + col.$id);
})();
