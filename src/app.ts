import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import { handleErrorExeptions } from './middlewares/handleErrorExeptions'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
    this.initializeErrorHandling()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    const { MONGOD_URL, MONGOD_PORT, MONGOD_DB_NAME } = process.env

    mongoose.connect(`${MONGOD_URL}:${MONGOD_PORT}/${MONGOD_DB_NAME}`, () => {
      console.info('Connection in mongoose success...')
    })
  }

  private routes (): void {
    this.express.use(routes)
  }

  private initializeErrorHandling (): void {
    this.express.use(handleErrorExeptions)
  }
}

export default new App().express
