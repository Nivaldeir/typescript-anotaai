import { MongoDBAdapter } from "./infra/database/MongoAdapter";
import { ExpressHTTP } from "./infra/http/Express";
import { Sns } from "./infra/aws/Sns";
const sns = new Sns()
import CategoryRouter from "./infra/http/routes/categoryRoute";
import ProductRouter from "./infra/http/routes/productRoute";
import CategoryRepositoryDatabase from "./infra/repositories/CategoryRepositoryDatabase";
import ProductRepositoryDatabase from "./infra/repositories/ProductRepositoryDatabase";
const mongodb = new MongoDBAdapter()
mongodb.connect(process.env.DATABASE_URI!)
const categoryRepository = new CategoryRepositoryDatabase(mongodb, sns)
const productRepository = new ProductRepositoryDatabase(mongodb, sns, categoryRepository)
const productController = new ProductRouter(productRepository).getRouter()
const categoryController = new CategoryRouter(categoryRepository).getRouter()
const express = new ExpressHTTP([productController, categoryController])
express.listen(3000)

