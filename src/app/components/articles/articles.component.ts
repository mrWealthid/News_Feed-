import { Component, OnInit, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { IArticles } from './models/articles-model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  title: any = 'News Feed';

  private articleService = inject(ArticlesService);
  articles$: Observable<IArticles[]> = this.articleService.getArticles();
  bookmarks: IArticles[] = [];

  error$: Observable<boolean> = this.articles$.pipe(
    map(() => false), // no error, return false
    catchError((error) => {
      // On error, log it and switch to an Observable that emits true
      console.error('Error fetching articles:', error);
      return of(true);
    })
  );

  ngOnInit(): void {
    this.bookmarks = this.articleService.getBookmarks() || [];
    console.log(this.bookmarks);
    // this.articles = this.articleService.getArticles();
  }

  toggleView(text: string) {
    this.title = text;
    // this.bookmarks = this.articleService.getBookmarks();
  }

  addBoomark(article: IArticles) {
    this.bookmarks.push(article);
    this.updateLocalStorage();
    // localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  updateLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  removeBookmark(articleId: string) {
    this.bookmarks = this.bookmarks.filter(
      (bookmark: IArticles) => bookmark.url !== articleId
    );
    this.updateLocalStorage();
  }

  isBookmarked(article: IArticles) {
    return this.bookmarks.some(
      (bookmark: IArticles) => bookmark.url === article.url
    );
  }
}
