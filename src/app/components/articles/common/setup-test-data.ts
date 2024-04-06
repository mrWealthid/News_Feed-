import { ARTICLES } from '../../../../../test-data/db-data';
import { IArticles } from '../models/articles-model';

export function setupArticles(): IArticles[] {
  return ARTICLES;
}

export function getArticle(): IArticles {
  return ARTICLES[0];
}
