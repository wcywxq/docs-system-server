import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const ArticleSchema = new Schema({
    article_id: { type: Schema.Types.ObjectId },
    title: { type: String, required: true },
    author: { type: String, required: true },
    keywords: { type: [ String ], required: true },
    thumbUrl: { type: String, required: true },
    tag_id: { type: [ Schema.Types.ObjectId ], ref: 'Tag' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    releaseStatus: { type: Number, enum: [ 0, 1 ], required: true },
    source: { type: Number, enum: [ 0, 1 ], required: true },
    createTime: { type: Date, default: Date.now() },
  });
  return mongoose.model('Article', ArticleSchema);
};
