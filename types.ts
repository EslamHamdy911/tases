export interface StartupData {
  companyName: string;
  industry: string;
  country: string;
  foundersCount: number;
  capital: string;
  description: string;
}

export interface LicenseResponse {
  markdown: string;
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
}

export enum AppState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export type Language = 'ar' | 'en';