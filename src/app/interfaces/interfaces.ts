export interface SubStandard {
  key: string;
  name: string;
  maxLength: number;
  minLength: number;
  conditionMax: string;
  conditionMin: string;
  shape: string[];
}

export interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: SubStandard[];
}

export interface FormData {
  name: string;
  standard: string;
  uploadedFile?: File;
  note?: string;
  price?: number;
  samplingPoint?: string[];
  samplingDate?: Date;
}

export interface Errors {
  nameError: boolean;
  standardError: boolean;
}

export interface InspectionData {
  inspectionID: string;
  name: string;
  createDate: string;
  standardID: string;
  note?: string;
  samplingPoint?: string[];
  samplingDate?: string;
  price?: number;
  standardName: string;
  standardData: [Standard];
}
