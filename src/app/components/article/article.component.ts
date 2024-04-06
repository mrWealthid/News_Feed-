import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticles } from '../articles/models/articles-model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input({ required: true }) article: IArticles;

  @Input({ required: true }) isBookmarked: boolean;

  @Input({ required: true }) isViewed: boolean;

  @Output()
  addToBookmark = new EventEmitter();

  @Output()
  removeBookmark = new EventEmitter();

  @Output()
  addToSeen = new EventEmitter();

  handleAddBookmark(article: IArticles) {
    this.addToBookmark.emit(article);
  }
  handleRemoveBookmark(articleId: string) {
    this.removeBookmark.emit(articleId);
  }
  handleAddSeen(articleId: string) {
    this.addToSeen.emit(articleId);
  }
}
