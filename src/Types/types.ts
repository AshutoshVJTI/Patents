export interface patent {
  patent_date: string;
  cpcs: { cpc_section_id: any }[];
}

export interface organization {
  organization: string;
}

export interface PatentData {
  count: number;
  patents: patent[];
  total_patent_count: number;
}

export interface ChartLabel {
  label: string;
  count: number;
}

export interface AutocompleteProps {
  label: string;
  data: organization[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export interface ChartProps {
  data: PatentData;
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}
