import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IPost } from "../shared/interfaces/post";
import { PostsService } from "../shared/data-access/posts.service";
import { of } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postsService: PostsService;

  const mockPost: IPost = {
    userId: 1,
    id: 2,
    title: 'mock title',
    body: 'mock body'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [{
        provide: PostsService,
        useValue: {
          currentPost$: of(undefined),
          posts$: of([mockPost]),
          setCurrentPost: jest.fn()
        }
      }]
    })
      .compileComponents();

    postsService = TestBed.inject(PostsService);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('current post section', () => {
    let currentPostIndicatorEl: DebugElement;

    it('should display dash if no post has been initially clicked', () => {
      fixture.detectChanges();
      currentPostIndicatorEl = fixture.debugElement.query(By.css('[data-testid="current-post"]'));

      expect(currentPostIndicatorEl.nativeElement.textContent).toBe(' – ');
    });

    it('should display id of the currentPost$', () => {
      postsService.currentPost$ = of(mockPost);

      fixture.detectChanges();
      currentPostIndicatorEl = fixture.debugElement.query(By.css('[data-testid="current-post"]'));

      expect(currentPostIndicatorEl.nativeElement.textContent).toBe(' 2 ');
    });
  });

  describe('posts section', () => {
    it('should display fallback message if no posts are available', () => {
      postsService.posts$ = of([]);

      fixture.detectChanges();
      const noPostsAlertEl = fixture.debugElement.query(By.css('[data-testid="no-posts-alert"]'));

      expect(noPostsAlertEl).toBeTruthy();
    });

    it('should NOT display fallback message if posts are available', () => {
      fixture.detectChanges();
      const noPostsAlertEl = fixture.debugElement.query(By.css('[data-testid="no-posts-alert"]'));

      expect(noPostsAlertEl).toBeFalsy();
    });

    it('should render posts when posts$ is populated', () => {
      fixture.detectChanges();
      const postEl = fixture.debugElement.query(By.css('app-post'));

      expect(postEl).toBeTruthy();
    });

    it('should NOT render posts when posts$ is empty', () => {
      postsService.posts$ = of([]);

      fixture.detectChanges();
      const postEl = fixture.debugElement.query(By.css('app-post'));

      expect(postEl).toBeFalsy();
    });

    it('should render a post for each item in posts$', (done) => {
      postsService.posts$ = of([mockPost, mockPost, mockPost]);

      fixture.detectChanges();
      const postEls = fixture.debugElement.queryAll(By.css('app-post'));

      postsService.posts$.subscribe(posts => {
        expect(postEls.length).toEqual(posts.length);
        done();
      });
    });
  });
});
