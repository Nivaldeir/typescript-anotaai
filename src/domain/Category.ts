import { ObjectId } from 'mongodb';

type ICategory = {
  _id: string
  title: string
  ownerId: string;
  description: string
}

export default class Category {
  _id: string
  title: string
  ownerId: string;
  description: string
  constructor(params: ICategory) {
    this._id = params._id
    this.title = params.title
    this.ownerId = params.ownerId
    this.description = params.description
  }
  static create(params: Omit<ICategory, "_id">) {
    return new Category({ ...params, _id: new ObjectId().toString() })
  }
}