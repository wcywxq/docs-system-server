export type QueryUserDto = Partial<{
  userName: string;
  email: string;
  phone: string;
  isActive: string; // 需手动parse为boolean
  createBeginTime: Date;
  createEndTime: Date;
}>;

export type CreateUserDto = {
  userName: string;
  password: string;
};

export type UpdateUserDto = {};
