export type CommentData = {
  text: string;
  created_at: string;
  user: string;
  post: string;
};

export type CommentUpdate = {
  text?: string;
  created_at?: string;
};
