export type Query = {
  [key: string]: string | undefined | string[];
  sort?: string;
  page?: string;
};

export type ReturnQuery = {
  sort: string;
  page: number;
  filter: { [key: string]: string | string[] | undefined };
};
