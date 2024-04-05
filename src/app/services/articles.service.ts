import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import {
  IArticles,
  IArticlesState,
} from '../components/articles/models/articles-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${environment.API_KEY}`;

  private http = inject(HttpClient);
  constructor() {}

  getArticles(): Observable<IArticlesState> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => ({
        loading: false,
        data: data.articles,
        error: null,
      })),
      startWith({ loading: true, data: [], error: null }),
      catchError(({ error }) =>
        of({
          loading: false,
          error: error.message,
          data: [],
        })
      )
    );
  }

  //   .pipe(
  //     map((data: any) => {
  //       return data.articles;
  //     })
  //   );
  // }

  getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')!);
  }
}
