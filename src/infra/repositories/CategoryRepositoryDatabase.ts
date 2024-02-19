import { CategoryRepository } from "../../application/repositories/CategoryRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import { ObjectId } from "mongodb";
import Category from "../../domain/Category";
import { Sns } from "../aws/Sns";

export default class CategoryRepositoryDatabase implements CategoryRepository {
  private collectionName = "category"
  constructor(private readonly _db: DatabaseConnection, private readonly sns: Sns) {
  }

  async delete(id: string): Promise<any> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    await collection.deleteOne({ _id: new ObjectId(id) })
  }
  async update(id: string, data: any): Promise<any> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    let save = {
      title: data.title,
      owner: data.owner,
      description: data.description
    }
    await collection.updateOne(
      { _id: id },
      { $set: save }
    )
    await this.sns.publish({
      message: JSON.stringify(data)
    })
  }
  async save(data: Category): Promise<any> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    await collection.insertOne(data)
    await this.sns.publish({
      message: JSON.stringify(data)
    })
    return data
  }

  async find(id: string): Promise<Category | null> {
    const collection = await this._db.query({ collectionName: this.collectionName })
    const output = await collection.findOne({ _id: id })
    if (output) {
      return new Category({
        _id: output._id.toString(),
        description: output.description,
        ownerId: output.ownerId,
        title: output.title
      })
    }
    return null
  }
}