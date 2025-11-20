import { Alert, AlertLevel, Department, LogisticAsset, Message, Rank, RegionData, User } from './types';

export const CURRENT_USER: User = {
  id: 'u-001',
  name: 'Cmdr. Almaz Bekele',
  rank: Rank.HIGH,
  department: Department.CENTRAL,
  avatarUrl: 'https://picsum.photos/seed/commander/64/64'
};

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a-1',
    title: 'Heavy Rainfall Warning',
    department: Department.DISASTER,
    level: AlertLevel.HIGH,
    timestamp: '10:42 AM',
    description: 'Sustained heavy rainfall detected in Highlands region. Flood risk elevating.',
    location: 'Northern Region'
  },
  {
    id: 'a-2',
    title: 'Port Logistics Delay',
    department: Department.NAVY,
    level: AlertLevel.MEDIUM,
    timestamp: '09:15 AM',
    description: 'Container processing backlog due to crane maintenance at Dry Port.',
    location: 'Modjo Dry Port'
  },
  {
    id: 'a-3',
    title: 'Network Anomaly Detected',
    department: Department.CYBER,
    level: AlertLevel.LOW,
    timestamp: '11:00 AM',
    description: 'Unusual traffic spike from external endpoint. Firewall auto-mitigated.',
    location: 'Central Server Node 4'
  },
  {
    id: 'a-4',
    title: 'Supply Convoy Dispatch',
    department: Department.ARMY,
    level: AlertLevel.SAFE,
    timestamp: '08:30 AM',
    description: 'Routine medical supply convoy departed for Eastern depots.',
    location: 'Addis Ababa -> Harar'
  }
];

export const MOCK_ASSETS: LogisticAsset[] = [
  { id: 'v-101', name: 'Heavy Hauler A-1', type: 'VEHICLE', status: 'TRANSIT', location: 'Route 4', capacity: 85 },
  { id: 'v-102', name: 'Heavy Hauler A-2', type: 'VEHICLE', status: 'ACTIVE', location: 'Depot Central', capacity: 100 },
  { id: 'ac-301', name: 'Cargo Wing C-1', type: 'AIRCRAFT', status: 'MAINTENANCE', location: 'Bole Hangar', capacity: 0 },
  { id: 'ac-302', name: 'Drone Scout D-9', type: 'AIRCRAFT', status: 'ACTIVE', location: 'Sector North', capacity: 100 },
  { id: 'dp-500', name: 'Central Med Depot', type: 'SUPPLY_DEPOT', status: 'ACTIVE', location: 'Addis Ababa', capacity: 92 },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm-1', sender: 'Logistics Chief', content: 'Convoy A-1 passing checkpoint Delta. Status nominal.', timestamp: '10:55', isEncrypted: true, channel: 'Logistics' },
  { id: 'm-2', sender: 'Weather Station', content: 'Storm front moving East. Visibility dropping to 2km.', timestamp: '11:02', isEncrypted: false, channel: 'General' },
  { id: 'm-3', sender: 'Port Authority', content: 'Clearance granted for incoming aid shipment.', timestamp: '11:10', isEncrypted: true, channel: 'Logistics' },
];

export const REGIONAL_DATA: RegionData[] = [
  { id: 'r-1', name: 'Addis Ababa', riskScore: 12, weatherCondition: 'Cloudy', activeIncidents: 0 },
  { id: 'r-2', name: 'Amhara', riskScore: 45, weatherCondition: 'Rainy', activeIncidents: 2 },
  { id: 'r-3', name: 'Oromia', riskScore: 25, weatherCondition: 'Sunny', activeIncidents: 1 },
  { id: 'r-4', name: 'Somali', riskScore: 30, weatherCondition: 'Sunny', activeIncidents: 0 },
  { id: 'r-5', name: 'Tigray', riskScore: 35, weatherCondition: 'Cloudy', activeIncidents: 1 },
  { id: 'r-6', name: 'Sidama', riskScore: 15, weatherCondition: 'Rainy', activeIncidents: 0 },
  { id: 'r-7', name: 'Afar', riskScore: 55, weatherCondition: 'Storm', activeIncidents: 3 },
];
