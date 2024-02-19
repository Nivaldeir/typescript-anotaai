import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";
import DatabaseConnection from "./DatabaseConnection";

export class MongoDBAdapter implements DatabaseConnection {
  private client: MongoClient | null = null
  async connect(uri: string): Promise<any> {
    this.client = new MongoClient(uri);
    await this.client.connect()
  }
  async query(params: InputQuery): Promise<Collection> {
    if (!this.client) throw new Error("Database not connected")

    return this.client.db(process.env.DATABASE_NAME!).collection(params.collectionName)
  }
  async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  }
}

type InputConfig = {
  uri: string
}

type InputQuery = {
  collectionName: string
}