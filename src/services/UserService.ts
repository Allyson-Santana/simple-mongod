import User from '../schemas/User'
import { IUser } from '../interfaces/user'
import bcrypt from 'bcrypt'

class UserService {
  async index () {
    const users = await User.find()
    return users
  }

  async findById (id: string) {
    const user = await User.findById(id)
    return user
  }

  async findByEmail (email: string) {
    const user = await User.findOne({ email })
    return user
  }

  async store (user: IUser) {
    const hashPassowrd = await bcrypt.hash(user.password, 8)
    const newUser = await User.create({ ...user, passowrd: hashPassowrd })
    return newUser
  }

  async update (id: string, userUpdate: IUser) {
    return await User.updateOne({
      _id: id
    }, {
      $set: {
        ...userUpdate
      }
    })
  }

  async destroy (id: string) {
    return await User.deleteOne({
      _id: id
    })
  }
}

export default new UserService()
