import { BaseEntity } from '../../../types';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface PersonalSettings extends BaseEntity {
  userId: string;
  theme: 'light' | 'dark';
  language: string;
  defaultBatchSize: number;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  sessionReminders: boolean;
}

export interface AISettings extends BaseEntity {
  userId: string;
  aiEnabled: boolean;
  privacyLevel: 'strict' | 'moderate' | 'relaxed';
  dataSharing: boolean;
}

export interface UserRights {
  userId: string;
  role: 'user' | 'admin';
  permissions: string[];
}
