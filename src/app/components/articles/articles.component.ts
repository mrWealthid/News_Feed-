import { Component, OnInit, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { IArticles, IArticlesState } from './models/articles-model';
import { ArticlesService } from './services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  title: string = 'News Feed';
  sources = new BehaviorSubject<string>('abc-news');

  //Services
  private articleService = inject(ArticlesService);

  articles$: Observable<IArticlesState> = this.sources.pipe(
    distinctUntilChanged(),
    switchMap((sources) => this.articleService.getArticles(sources))
  );

  bookmarks: IArticles[];
  viewedArticles: string[];

  ngOnInit(): void {
    this.bookmarks = this.articleService.getBookmarks() || [];
    this.viewedArticles = this.articleService.getViewedArticles() || [];
  }

  toggleView(text: string) {
    this.title = text;
  }
  toggleSources(val: string) {
    this.sources.next(val);
  }

  addBoomark(article: IArticles) {
    this.bookmarks.push(article);
    this.updateLocalStorage('bookmarks', this.bookmarks);
  }
  removeBookmark(articleId: string) {
    this.bookmarks = this.bookmarks.filter(
      (bookmark: IArticles) => bookmark.url !== articleId
    );
    this.updateLocalStorage('bookmarks', this.bookmarks);
  }

  addToSeen(articleId: string) {
    console.log(articleId);
    this.viewedArticles.push(articleId);
    this.updateLocalStorage('viewedArticles', [
      ...new Set(this.viewedArticles),
    ]);
  }

  updateLocalStorage(key: string, val: IArticles[] | string[]) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  isBookmarked(article: IArticles) {
    return this.bookmarks.some(
      (bookmark: IArticles) => bookmark.url === article.url
    );
  }
  isViewed(article: IArticles) {
    return this.viewedArticles.some((viewed: string) => viewed === article.url);
  }
}
