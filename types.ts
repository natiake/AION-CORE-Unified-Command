export enum Rank {
  HIGH = 'HIGH_COMMAND',
  MID = 'OPERATIONAL_COMMAND',
  LOW = 'FIELD_UNIT'
}

export enum Department {
  CENTRAL = 'Central Gov Ops',
  ARMY = 'Logistics Command',
  NAVY = 'Port Authority',
  AIR = 'Airspace Control',
  CYBER = 'Cybersecurity Div',
  DISASTER = 'Disaster Response'
}

export enum AlertLevel {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  SAFE = 'SAFE'
}

export interface User {
  id: string;
  name: string;
  rank: Rank;
  department: Department;
  avatarUrl: string;
}

export interface Alert {
  id: string;
  title: string;
  department: Department;
  level: AlertLevel;
  timestamp: string;
  description: string;
  location?: string;
}

export interface LogisticAsset {
  id: string;
  name: string;
  type: 'VEHICLE' | 'AIRCRAFT' | 'VESSEL' | 'SUPPLY_DEPOT';
  status: 'ACTIVE' | 'MAINTENANCE' | 'TRANSIT' | 'OFFLINE';
  location: string;
  capacity: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isEncrypted: boolean;
  channel: string;
}

export interface RegionData {
  id: string;
  name: string;
  riskScore: number; // 0-100
  weatherCondition: 'Sunny' | 'Rainy' | 'Storm' | 'Cloudy';
  activeIncidents: number;
}
