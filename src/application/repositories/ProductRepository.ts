export interface ProductRepository {
  save(data: SaveProduct): Promise<any>
  find(id: string): Promise<any>
  delete(id:string):Promise<any>
  update(id:string, data:any):Promise<any>
}

export type SaveProduct = {
  title: string
  ownerId: string
  description: string
}