import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/', (req, res) => res.json({ status: 200, msg: 'OK' }))
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.find)
routes.post('/users', UserController.store)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

export default routes
