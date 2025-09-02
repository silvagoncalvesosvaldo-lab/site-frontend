import { Client, Databases, Query } from "appwrite";
import bcrypt from "bcryptjs";

// Configuração do cliente Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("nyc-6894f72500027a221b95");

const databases = new Databases(client);
const databaseId = "6894f81e000deafdca19";
const collectionId = "68a4ff71002c0f3a325f"; // admins

// Função para cadastro de admin (usado só por você)
export async function cadastrarAdmin(email, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);

  return await databases.createDocument(databaseId, collectionId, "unique()", {
    email,
    senha_hash: senhaHash,
    role: "admin",
    createdAt: new Date().toISOString(),
  });
}

// Função para login de admin
export async function loginAdmin(email, senha) {
  const result = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("email", email),
  ]);

  if (result.total === 0) {
    throw new Error("Admin não encontrado");
  }

  const admin = result.documents[0];
  const senhaValida = await bcrypt.compare(senha, admin.senha_hash);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  return admin;
}
