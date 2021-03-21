import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const ArticleSchema = new Schema({
    author: { type: String, required: true }, // ❌
    title: { type: String, required: true }, // ✅
    content: { type: String, required: true }, // ✅
    desc: { type: String },
    keywords: [{ type: String }], // ❌
    thumbUrl: { type: String, required: true }, // ✅
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // ✅
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // ✅
    releaseStatus: { type: Number, enum: [ 0, 1 ], default: 0 }, // ❗️
    source: { type: Number, enum: [ 0, 1 ], default: 0 }, // ❗️
    createTime: { type: Date, default: Date.now() }, // ✅
  });
  return mongoose.model('Article', ArticleSchema);
};
