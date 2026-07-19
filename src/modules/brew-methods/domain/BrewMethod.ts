import { BaseEntity } from '../../../types';

export interface ProcessStepParameter {
  naam: string;
  waarde: string | number;
  eenheid?: string;
}

export interface MeetpuntDefinitie {
  type: 'SG' | 'TEMPERATUUR' | 'VOLUME' | 'VRIJ';
  eenheid: string;
  verplicht: boolean;
  toelichting?: string;
}

export interface ChecklistItem {
  id: string;
  omschrijving: string;
  volgorde: number;
  verplicht: boolean;
  parameterRef?: string;
  ingrediëntRef?: string;
  meetpuntDefinitieRef?: string;
}

export interface ProcessStap extends BaseEntity {
  naam: string;
  volgorde: number;
  beschrijving?: string;
  instructie: string;
  parameters: ProcessStepParameter[];
  ingrediënten: string[]; // ingredient IDs
  checklist: ChecklistItem[];
  meetpuntDefinities: MeetpuntDefinitie[];
  receptnotities: string;
  verwachtResultaat?: string;
}

export interface BrewMethod extends BaseEntity {
  naam: string;
  beschrijving?: string;
  processtappen: ProcessStap[];
  actief: boolean;
  userId: string;
}
