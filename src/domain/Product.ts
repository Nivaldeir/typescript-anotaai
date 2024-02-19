import { ObjectId } from "mongodb";

type IProduct = {
  _id: string
  title: string;
  categoryId: string;
  price: number;
  description: string
}

export default class Product {
  _id: string
  title: string;
  categoryId: string;
  price: number;
  description: string
  constructor(params: IProduct) {
    this._id = params._id
    this.title = params.title
    this.categoryId = params.categoryId
    this.price = params.price
    this.description = params.description
  }
  static create(params: Omit<IProduct, "_id">) {
    return new Product({ ...params, _id: new ObjectId().toString() })
  }
}