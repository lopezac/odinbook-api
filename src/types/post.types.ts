export type PostType = {
  created_at: Date;
  photos: Object[];
  videos: Object[];
  text: string;
  user: string;
};

export type PostUpdate = {
  created_at?: Date;
  photos?: Object[];
  videos?: Object[];
  text?: string;
};
