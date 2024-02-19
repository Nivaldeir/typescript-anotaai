import express, { Router } from "express"
export class ExpressHTTP {
  app: any
  constructor(private readonly routes: Router[]) {
    this.app = express()
    this.app.use(express.json())
    this.app.use(routes)
  }
  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`app listening on port ${port}`)
    })
  }
}