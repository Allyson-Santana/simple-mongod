import 'dotenv/config'
import 'express-async-error'

import app from './app'

const { SERVER_PORT, SERVER_HOST } = process.env

app.listen(Number(SERVER_PORT) ?? 4000, SERVER_HOST || 'localhost', () => {
  console.info(`Server runnig on ${SERVER_HOST}:${SERVER_PORT}`)
})
