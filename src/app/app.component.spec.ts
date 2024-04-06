import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TabButtonComponent } from './components/shared/button/tab-button.component';
import { ArticleLoaderComponent } from './components/article/article-loader.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppRoutingModule, HttpClientModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        ArticlesComponent,
        TabButtonComponent,
        ArticleLoaderComponent,
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render page layout', () => {
    fixture.detectChanges();
    const bookmark = el.query(By.css('main'));
    expect(bookmark).not.toBeNull();
  });
});
