import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: false },
    createTime: { type: Date, default: Date.now() },
  });

  return mongoose.model('User', UserSchema);
};
