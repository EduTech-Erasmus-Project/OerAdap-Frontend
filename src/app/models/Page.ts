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
}

export interface Attribute {
  id?: number;
  attribute?: string;
  type?: string;
  path_preview?: string;
  source?: string;
  tag_page_learning_object?: number;
}
