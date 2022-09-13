export interface MetadataInfo {
  learning_object?: number;
  audio?: number;
  image?: number;
  paragraphs?: number;
  video?: number;
  countries?: Country[];
}

export interface Country {
  country?: string;
  total?: number;
}
