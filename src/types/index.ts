// Global type definitions for BrouwApp

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncStatus {
  status: 'pending' | 'synced' | 'failed';
  lastSyncAt?: Date;
  error?: string;
}
