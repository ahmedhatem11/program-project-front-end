export interface User {
  id?: number;
  username?: string;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  deleted?: boolean;
  role?: string;
  groupNames?: [];
}
