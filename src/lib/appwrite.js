import { Client, Databases, Query, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("6894f72500027a221b95");

export const databases = new Databases(client);
export const account = new Account(client);
export { Query };

