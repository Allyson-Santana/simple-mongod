import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { ApiError } from '../helpers/ApiError'
import UserService from '../services/UserService'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { IPayloadJWT } from '../interfaces/jwt'

class AuthenticateController {
  public async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
      })

      const isValidSchema = await schema.isValid({ email, password })
      if (!isValidSchema) throw new ApiError(400, 'E-mail and password is required')

      const userAlreadyExists = await UserService.findByEmail(email)
      if (!userAlreadyExists) throw new ApiError(400, 'E-mail or password incorrect')

      const verifyPassword = await bcrypt.compare(password, userAlreadyExists.password ?? '')
      if (!verifyPassword) throw new ApiError(400, 'E-mail or password incorrect')

      const token = JWT.sign({ id: userAlreadyExists._id }, process.env.JWT_SECRET ?? '', {
        subject: userAlreadyExists._id,
        expiresIn: '1h'
      })

      const { password: _, ...user } = userAlreadyExists

      return res.status(200).json({ user, token })
    } catch (error) {
      next(error)
    }
  }

  async getProfile (req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers

      if (!authorization) throw new ApiError(401, ' Token unauthorized')

      const [, token] = authorization.split(' ')
      const { id } = JWT.verify(token, process.env.JWT_SECRET ?? '') as IPayloadJWT

      const userInfo = await UserService.findById(id)
      if (!userInfo) throw new ApiError(404, 'User not exists')

      const { password, ...user } = userInfo

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthenticateController()
