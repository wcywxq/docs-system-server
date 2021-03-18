// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportCategory from '../../../app/model/category';
import ExportTag from '../../../app/model/tag';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Category: ReturnType<typeof ExportCategory>;
    Tag: ReturnType<typeof ExportTag>;
  }
}
