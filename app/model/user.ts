import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const UserSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    createTime: { type: Date, default: Date.now() },
  });

  return mongoose.model('User', UserSchema);
};
