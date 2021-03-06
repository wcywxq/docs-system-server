// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportCategory from '../../../app/service/category';
import ExportReview from '../../../app/service/review';
import ExportTag from '../../../app/service/tag';
import ExportUser from '../../../app/service/user';
import ExportUtil from '../../../app/service/util';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    category: AutoInstanceType<typeof ExportCategory>;
    review: AutoInstanceType<typeof ExportReview>;
    tag: AutoInstanceType<typeof ExportTag>;
    user: AutoInstanceType<typeof ExportUser>;
    util: AutoInstanceType<typeof ExportUtil>;
  }
}
