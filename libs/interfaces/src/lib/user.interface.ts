export enum UserRole {
  Vendor= 'Vendor',
  Customer = 'Customer',
  Admin = 'Admin'
}
export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
