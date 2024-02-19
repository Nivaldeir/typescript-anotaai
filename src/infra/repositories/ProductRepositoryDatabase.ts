import DatabaseConnection from "../database/DatabaseConnection";
import { ObjectId } from "mongodb";
import Product from "../../domain/Product";
import { ProductRepository } from "../../application/repositories/ProductRepository";
import { Sns } from "../aws/Sns";
import CategoryRepositoryDatabase from "./CategoryRepositoryDatabase";

export default class ProductRepositoryDatabase implements ProductRepository {
  private collectionName = "product"
  constructor(private readonly _db: DatabaseConnection, private readonly snsAws: Sns, private readonly categoryRepository: CategoryRepositoryDatabase) {
  }

  async delete(id: string): Promise<any> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    await collection.deleteOne({ _id: new ObjectId(id) })
  }
  async update(id: string, data: any): Promise<any> {
    if (!await this.find(id)) throw new Error("Product not found")
    const collection = await this._db.query({ collectionName: this.collectionName })
    await collection.updateOne(
      { _id: id },
      { $set: data }
    )
    await this.snsAws.publish({
      message: JSON.stringify(data)
    })
  }
  async save(data: any): Promise<any> {
    let category = await this.categoryRepository.find(data.category)
    if (!category) throw new Error("Not found category")
    const collection = await this._db.query({ collectionName: this.collectionName })
    await collection.insertOne(data)
    await this.snsAws.publish({
      message: JSON.stringify(data)
    })
  }

  async find(id: string): Promise<Product> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    const output = await collection.findOne({ _id: id })
    let category = await this.categoryRepository.find(output.category)
    if (!category) throw new Error("Not found category")
    return new Product({
      _id: output._id.toString(),
      title: output["title"],
      categoryId: category._id,
      price: output["price"],
      description: output["description"]
    })
  }
}