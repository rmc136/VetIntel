import { DiagnosisRecord } from '../types/diagnosis';

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Diagnose: undefined;
  DiagnosisDetails: {
    diagnosis: DiagnosisRecord;
  };
}; 