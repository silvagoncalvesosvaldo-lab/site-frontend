import { Client, Databases, Query } from "appwrite";
import bcrypt from "bcryptjs";

// Configuração do cliente Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("nyc-6894f72500027a221b95");

const databases = new Databases(client);
const databaseId = "6894f81e000deafdca19";
const collectionId = "68a47741002c0f3a325e"; // afiliados

// Função para cadastro de afiliado
export async function cadastrarAfiliado(email, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);

  return await databases.createDocument(databaseId, collectionId, "unique()", {
    email,
    senha_hash: senhaHash,
    nome: "afiliado",
    createdAt: new Date().toISOString(),
  });
}

// Função para login de afiliado
export async function loginAfiliado(email, senha) {
  const result = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("email", email),
  ]);

  if (result.total === 0) {
    throw new Error("Afiliado não encontrado");
  }

  const afiliado = result.documents[0];
  const senhaValida = await bcrypt.compare(senha, afiliado.senha_hash);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  return afiliado;
}
