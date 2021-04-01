export type QueryUserDto = Partial<{
  username: string;
  email: string;
  phone: string;
  isActive: string; // 需手动parse为boolean
  createBeginTime: Date;
  createEndTime: Date;
}>;

export type CreateUserDto = {
  username: string;
  password: string;
};

export type UpdateUserDto = {};
