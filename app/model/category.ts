import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const CategorySchema = new Schema({
    category_id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    createTime: { type: Date, default: Date.now() },
  });
  return mongoose.model('Category', CategorySchema);
};
