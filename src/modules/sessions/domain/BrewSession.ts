import { BaseEntity } from '../../../types';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export interface MeasurementRegistration {
  id: string;
  meetpuntDefinitieId?: string;
  waarde: string | number;
  datumTijd: Date;
  notitie?: string;
}

export interface ProcessStepExecution {
  processStapId: string;
  status: 'pending' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  measurements: MeasurementRegistration[];
  opmerkingen?: string;
}

export interface BrewSession extends BaseEntity {
  receptVersieId: string;
  receptId: string;
  status: SessionStatus;
  startDatum: Date;
  eindDatum?: Date;
  processStepExecutions: ProcessStepExecution[];
  meetpuntregistraties: MeasurementRegistration[];
  opmerkingen?: string;
  userId: string;
}
