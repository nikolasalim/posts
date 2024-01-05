import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { IPost } from "../../../shared/interfaces/post";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockPost: IPost = {
    userId: 1,
    id: 2,
    title: 'mock title',
    body: 'mock body'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => component.ngOnInit());
    it('should set initial keyOnDisplay to "title"', () => {
      const initialKey = component.postInfoOrder[0];

      expect(component.keyOnDisplay).toEqual(initialKey);
      expect(component.keyOnDisplay).toEqual('title');
    });

    it('should set initial valueOnDisplay to title of the post', () => {
      expect(component.valueOnDisplay).toEqual(mockPost.title);
    });
  });

});
