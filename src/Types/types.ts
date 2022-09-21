export interface patent {
  patent_date: string;
  cpcs: { cpc_section_id: string }[];
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

export interface SelectProps {
  options: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export interface ChartProps {
  data: PatentData;
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}
