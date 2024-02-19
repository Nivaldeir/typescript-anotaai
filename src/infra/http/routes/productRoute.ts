import express, { Request, Response, Router } from "express";
import { ProductRepository } from "../../../application/repositories/ProductRepository";
import Product from "../../../domain/Product";

class ProductRouter {
  private router: Router
  constructor(private readonly _repos: ProductRepository) {
    this.router = express.Router()
    this.setup()
  }
  private setup() {
    this.router.post("/product", async (req: Request, res: Response) => {
      const product = Product.create(req.body)
      await this._repos.save(product)
      res.status(200).json(product)
    })
    this.router.get("/product/:id", async (req: Request, res: Response) => {
      const product = await this._repos.find(req.params.id)
      res.status(200).json(product)
    })
    this.router.put("/product/:id", async (req: Request, res: Response) => {
      const product = await this._repos.update(req.params.id, req.body)
      res.status(200).json(product)
    })
    this.router.delete("/product/:id", async (req: Request, res: Response) => {
      await this._repos.delete(req.params.id)
      res.status(200).json()
    })
  }
  getRouter(): Router {
    return this.router
  }
}

export default ProductRouter