import { BaseEntity } from '../../../types';

export interface User extends BaseEntity {
  email: string;
  username: string;
  role: 'user' | 'admin';
  isActive: boolean;
}
