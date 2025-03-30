export interface Option {
  title: string;
  img: string;
  consequence: string;
  consequence_img_link: string;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  description: string;
  options: Option[];
  isDone?: boolean;
}

export type Events = Event[];
