import express, { Request, Response, Router } from "express";
import { CategoryRepository } from "../../../application/repositories/CategoryRepository";
import Category from "../../../domain/Category";

class CategoryRouter {
  private router: Router
  constructor(private readonly _repos: CategoryRepository) {
    this.router = express.Router()
    this.setup()
  }
  private setup() {
    this.router.post("/category", async (req: Request, res: Response) => {
      const category = Category.create(req.body)
      await this._repos.save(category)
      res.status(200).json(category)
    })
    this.router.get("/category/:id", async (req: Request, res: Response) => {
      const product = await this._repos.find(req.params.id)
      res.status(200).json(product)
    })
    this.router.put("/category/:id", async (req: Request, res: Response) => {
      const product = await this._repos.update(req.params.id, req.body)
      res.status(200).json(product)
    })
    this.router.delete("/category/:id", async (req: Request, res: Response) => {
      await this._repos.delete(req.params.id)
      res.status(200).json()
    })
  }
  getRouter(): Router {
    return this.router
  }
}

export default CategoryRouter