import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { IArticles, IArticlesState } from './models/articles-model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  title: 'News Feed' | 'Bookmarks' = 'News Feed';

  private articleService = inject(ArticlesService);
  articles$: Observable<IArticlesState> = this.articleService.getArticles();
  bookmarks: IArticles[];

  ngOnInit(): void {
    this.bookmarks = this.articleService.getBookmarks() || [];
  }

  toggleView(text: 'News Feed' | 'Bookmarks') {
    this.title = text;
  }

  addBoomark(article: IArticles) {
    this.bookmarks.push(article);
    this.updateLocalStorage();
  }
  removeBookmark(articleId: string) {
    this.bookmarks = this.bookmarks.filter(
      (bookmark: IArticles) => bookmark.url !== articleId
    );
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  isBookmarked(article: IArticles) {
    return this.bookmarks.some(
      (bookmark: IArticles) => bookmark.url === article.url
    );
  }
}
