import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IArticles } from '../components/articles/models/articles-model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiUrl =
    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=36524571b10a41338dd9ba92462b5818';

  private http = inject(HttpClient);
  constructor() {}

  getArticles(): Observable<IArticles[]> {
    return this.http.get<IArticles[]>(this.apiUrl).pipe(
      map((data: any) => {
        return data.articles;
      })
    );
  }

  getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')!);
  }
}
