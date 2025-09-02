import { Client, Databases, Query } from "appwrite";
import bcrypt from "bcryptjs";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("nyc-6894f72500027a221b95");

const databases = new Databases(client);
const databaseId = "6894f81e000deafdca19"; // ID do banco
const collectionId = "68a389a300023b76f04d"; // ID da collection transportadores

// Função para cadastrar transportador
export async function cadastrarTransportador(email, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);

  return await databases.createDocument(databaseId, collectionId, "unique()", {
    email,
    senha_hash: senhaHash,
    role: "transportador",
    createdAt: new Date().toISOString(),
  });
}

// Função para login de transportador
export async function loginTransportador(email, senha) {
  const result = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("email", email),
  ]);

  if (result.total === 0) {
    throw new Error("Transportador não encontrado");
  }

  const transportador = result.documents[0];
  const senhaValida = await bcrypt.compare(senha, transportador.senha_hash);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  return transportador;
}
