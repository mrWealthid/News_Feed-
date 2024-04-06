import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getArticle } from '../articles/common/setup-test-data';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent],
    });
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should have a title', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const title = el.query(By.css('.title'));
    expect(title.nativeElement.textContent).toContain(component.article.title);
    expect(title).not.toBeNull();
  });
  it('should should have a time', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const time = el.query(By.css('time'));
    expect(time.nativeElement.textContent).not.toBeNull();
    expect(time).not.toBeNull();
  });
  it('should should have a source', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const source = el.query(By.css('.source'));
    expect(source.nativeElement.textContent).toContain(
      component.article.source.name
    );
    expect(source).not.toBeNull();
  });
  it('should should have a description', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const description = el.query(By.css('.description'));
    expect(description.nativeElement.textContent).toContain(
      component.article.description
    );
    expect(description).not.toBeNull();
  });

  it('should should have an author', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const author = el.query(By.css('.author'));
    expect(author.nativeElement.textContent).toContain(
      component.article.author
    );
    expect(author).not.toBeNull();
  });

  it('should should have a bookmark feature', () => {
    component.article = getArticle();
    fixture.detectChanges();
    const bookmark = el.query(By.css('.bookmark'));
    expect(bookmark).not.toBeNull();
  });
});
