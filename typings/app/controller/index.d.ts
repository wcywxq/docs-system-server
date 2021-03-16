// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportCategory from '../../../app/controller/category';
import ExportReview from '../../../app/controller/review';
import ExportTag from '../../../app/controller/tag';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    category: ExportCategory;
    review: ExportReview;
    tag: ExportTag;
    user: ExportUser;
  }
}
