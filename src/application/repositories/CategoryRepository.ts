export interface CategoryRepository {
  save(data: SaveCategory): Promise<any>
  find(id: string): Promise<any>
  delete(id: string): Promise<any>
  update(id: string, data: any): Promise<any>
}

type SaveCategory = {
  title: string
  ownerId: string
  description: string
}