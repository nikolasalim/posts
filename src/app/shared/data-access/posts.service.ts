import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPost } from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpClient);

  posts$: Observable<IPost[]> = this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');

  private _currentPost: BehaviorSubject<IPost | undefined> = new BehaviorSubject<IPost | undefined>(undefined);
  currentPost$: Observable<IPost | undefined> = this._currentPost.asObservable().pipe(distinctUntilChanged());

  setCurrentPost(post: IPost){
    this._currentPost.next(post);
  }
}
