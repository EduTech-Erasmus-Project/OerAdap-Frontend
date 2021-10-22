export interface LearningObject {
  id?: number;
  oa_detail?: OaDetail;
  user_ref?: string;
  created_at?: Date;
  expires_at?: Date;
  preview_origin?: string;
  preview_adapted?: string;
  file_detail?: FileDetail;
  config_adaptability?: ConfigAdaptability;
  pages?: Page[];
  file_adapted?: null;
}

export interface ConfigAdaptability {
  id?: number;
  method?: string;
  areas?: string[];
}

export interface FileDetail {
  pages?: number;
  images?: number;
  paragraphs?: number;
  videos?: number;
  audios?: number;
}

export interface OaDetail {
  title?: string;
  author?: string;
  version?: string;
  license?: string;
}

export interface Page {
  id?: number;
  title?: string;
  preview_path?: string;
}
