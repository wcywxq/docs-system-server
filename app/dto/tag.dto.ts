export type QueryTagDto = Partial<{
  name: string;
  createBeginTime: Date;
  createEndTime: Date;
}>;

export type CreateTagDto = {
  name: string;
};

export type UpdateTagDto = CreateTagDto;
