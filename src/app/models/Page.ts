export interface Paragraph {
  id?: number;
  text?: string;
  html_text?: string;
  path_preview?: string;
  page_learning_object?: number;
}

export interface Video {
  id?: number;
  text?: string;
  html_text?: string;
  page_learning_object?: number;
  attributes?: Attribute[];
  tags_adapted?: TagsAdapted;
  adapting?: boolean;
}

export interface Attribute {
  id?: number;
  attribute?: string;
  type?: string;
  path_preview?: string;
  source?: string;
  tag_page_learning_object?: number;
}

export interface TagsAdapted {
  id?: number;
  text?: string;
  html_text?: string;
  type?: string;
  path_preview?: string;
  tag_page_learning_object?: number;
  id_ref?: string;
  transcript?: Transcript[];
}

export interface Transcript {
  id?: number;
  type?: string;
  srclang?: string;
  label?: string;
  source?: string;
  path_preview?: string;
}
