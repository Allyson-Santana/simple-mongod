import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
}

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
}, {
  timestamps: true
})

export default model<IUser>('User', UserSchema)
