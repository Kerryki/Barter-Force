export interface Licence {
  service: string;
  name: string | null;
  number: string | null;
  regulator: string | null;
}

export interface BrokerInfo {
  siteUrl: string;
  businessName: string;
  brokerName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  openingHours: string | null;
  calendarUrl: string | null;
  privacyOfficer: string | null;
  licences: Licence[];
}

export const broker: BrokerInfo = {
  siteUrl: 'https://barterforce.com',
  businessName: 'Barter Force',
  brokerName: null,
  email: null,
  phone: null,
  address: null,
  openingHours: null,
  calendarUrl: null,
  privacyOfficer: null,
  licences: [
    { service: 'mortgages', name: null, number: null, regulator: null },
    { service: 'savings-investing', name: null, number: null, regulator: null },
    { service: 'credit-health', name: null, number: null, regulator: null },
    { service: 'protection', name: null, number: null, regulator: null },
  ],
};
