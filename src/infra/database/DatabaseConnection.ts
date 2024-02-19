import { Collection } from "mongodb"

export default interface DatabaseConnection{
  connect(opts: any): Promise<Collection>
  query(params: any): any
  close(): Promise<void>
}