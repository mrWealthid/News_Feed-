import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  waitForAsync,
} from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { ArticlesService } from './services/articles.service';
import { of } from 'rxjs';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TabButtonComponent } from '../shared/button/tab-button.component';
import { ArticleLoaderComponent } from '../article/article-loader.component';
import { ErrorComponent } from '../shared/error/error.component';
import { setupArticles } from './common/setup-test-data';
import { ArticleComponent } from '../article/article.component';
import { click } from './common/test-utils';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let mockArticleService: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const mockArticleServiceSpy = jasmine.createSpyObj('ArticlesService', [
      'getArticles',
      'getBookmarks',
      'getViewedArticles',
    ]);
    TestBed.configureTestingModule({
      declarations: [
        ArticlesComponent,
        TabButtonComponent,
        ArticleLoaderComponent,
        ErrorComponent,
        ArticleComponent,
      ],
      providers: [
        { provide: ArticlesService, useValue: mockArticleServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArticlesComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        mockArticleService = TestBed.inject(ArticlesService);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle the loading state', () => {
    mockArticleService.getArticles.and.returnValue(
      of({ loading: true, data: [], error: null })
    );
    fixture.detectChanges();

    expect(el.query(By.css('.article-loaders'))).not.toBeNull();
    expect(el.query(By.css('.error-component'))).toBeNull();
    expect(el.query(By.css('.emptyState'))).toBeNull();
  });

  it('should handle the error state', () => {
    mockArticleService.getArticles.and.returnValue(
      of({ loading: false, data: [], error: 'An Error Occured' })
    );
    fixture.detectChanges();

    expect(el.query(By.css('.error-component'))).not.toBeNull();
    expect(el.query(By.css('.article-loaders'))).toBeNull();
    expect(el.query(By.css('.emptyState'))).toBeNull();
  });

  it('should handle the empty state', () => {
    mockArticleService.getArticles.and.returnValue(
      of({ loading: false, data: [], error: null })
    );
    fixture.detectChanges();
    const selector = el.query(By.css('.emptyState'));

    expect(selector.nativeElement.textContent).toContain(
      'There is no data to display, kindly check other new sources!!!'
    );
  });

  it('should display news feeds', () => {
    mockArticleService.getArticles.and.returnValue(
      of({ loading: false, data: setupArticles(), error: null })
    );
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.card'));
    expect(component.title).toEqual('News Feed');
    expect(cards.length).toBe(10, 'Unexpected number of tabs found');
  });

  it('should display both buttons', () => {
    fixture.detectChanges();
    const buttonParent = fixture.debugElement.query(By.css('.view-buttons'));
    const buttons = buttonParent.queryAll(By.css('button'));
    expect(buttons[0].nativeElement.textContent).toContain('All');
    expect(buttons[1].nativeElement.textContent).toContain('Bookmark');
    expect(buttons.length).toBe(2, 'Unexpected number of tabs found');
  });

  it('should display sources button when All button is clicked', () => {
    fixture.detectChanges();
    const buttonParent = fixture.debugElement.query(By.css('.view-buttons'));

    const sourcesButtons = el.queryAll(By.css('.sources-buttons'));
    const buttons = buttonParent.queryAll(By.css('button'));

    click(buttons[0]);

    fixture.detectChanges();

    expect(component.title).toBe('News Feed');

    expect(sourcesButtons).not.toBeNull();
  });

  it('should not display sources button when All button is clicked', () => {
    fixture.detectChanges();
    const buttonParent = fixture.debugElement.query(By.css('.view-buttons'));

    const buttons = buttonParent.queryAll(By.css('button'));

    click(buttons[1]);

    fixture.detectChanges();

    const sourcesButtons = el.query(By.css('.sources-buttons'));

    expect(component.title).toBe('Bookmarks');

    expect(sourcesButtons).toBeNull();
  });
});
