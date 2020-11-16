export type CargoDetailsValue = {
  id: string;
  description: string;
};

export type CargoGroup = {
  container_type?: string;
  packaging_type?: string;
  volume?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  total_wm?: string;
  frozen?: string;
  dangerous?: boolean;
  weight_measurement?: string;
  length_measurement?: string;
  description?: string;
  id?: string;
};

export type ChoiceType = {
  id: number;
  code?: string;
  title: string;
};

export type DescriptionStepType = {
  cargo_groups: CargoGroup[];
  release_type?: number;
  number_of_documents?: number;
};
