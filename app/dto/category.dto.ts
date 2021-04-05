export type QueryCategoryDto = Partial<{
  name: string;
  createBeginTime: Date;
  createEndTime: Date;
}>;

export type CreateCategoryDto = {
  name: string;
};

export type UpdateCategoryDto = CreateCategoryDto;
