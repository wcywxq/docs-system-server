import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const CategorySchema = new Schema({
    name: { type: String, required: true },
    createTime: { type: Date, default: Date.now() },
  });
  return mongoose.model('Category', CategorySchema);
};
