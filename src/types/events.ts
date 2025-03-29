export interface Option {
  title: string;
  option_img_link: string;
  consequence: string;
  consequence_img_link: string;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  options: Option[];
}

export type Events = Event[];
