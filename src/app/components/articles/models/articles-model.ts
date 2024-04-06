export interface IArticles {
  title: string;
  description: string;
  author: string;
  content: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  source: {
    id: string;
    name: string;
  };
}

export interface IArticlesState {
  loading: boolean;
  data: IArticles[];
  error: string | null;
}
