import { Client, Databases, Query } from "appwrite";
import bcrypt from "bcryptjs";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Troque se usar outro endpoint
  .setProject("6894f72500027a221b95"); // ID do seu projeto Appwrite

const databases = new Databases(client);
const databaseId = "6894f81e000deafdc19"; // ID do banco
const collectionId = "68a3682b0039dd3d9ca8"; // ID da tabela clientes

// Função para cadastrar cliente
export async function cadastrarCliente(email, senha) {
  const senhaHash = await bcrypt.hash(senha, 10);

  return await databases.createDocument(databaseId, collectionId, "unique()", {
    email,
    senha_hash: senhaHash,
    role: "cliente",
    createdAt: new Date().toISOString(),
  });
}

// Função para login do cliente
export async function loginCliente(email, senha) {
  const result = await databases.listDocuments(databaseId, collectionId, [
    Query.equal("email", email),
  ]);

  if (result.total === 0) {
    throw new Error("Cliente não encontrado");
  }

  const cliente = result.documents[0];
  const senhaValida = await bcrypt.compare(senha, cliente.senha_hash);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  return cliente;
}
