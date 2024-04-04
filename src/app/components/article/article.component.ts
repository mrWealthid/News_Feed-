import { Component, Input } from '@angular/core';
import { IArticles } from '../articles/models/articles-model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input({ required: true }) article: IArticles;
}
