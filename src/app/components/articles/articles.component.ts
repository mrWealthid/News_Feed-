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
  title: any = 'News';

  private articleService = inject(ArticlesService);
  articles$: Observable<IArticles[]> = this.articleService.getArticles();

  error$: Observable<boolean> = this.articles$.pipe(
    map(() => false), // no error, return false
    catchError((error) => {
      // On error, log it and switch to an Observable that emits true
      console.error('Error fetching articles:', error);
      return of(true);
    })
  );

  ngOnInit(): void {
    // this.articles = this.articleService.getArticles();
  }
}
