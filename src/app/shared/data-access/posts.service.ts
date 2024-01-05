import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged, map,
  Observable, of, shareReplay, switchMap
} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPost } from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpClient);

  API_BASE_URI = 'https://jsonplaceholder.typicode.com';

  private _postsFetch = new BehaviorSubject<null | void>(null)
  posts$ = this._postsFetch.pipe(
    catchError((err) => of(err)),
    switchMap(() => this.getPosts()),
    map((data: IPost[]) => data),
    shareReplay(1)
  )
  private _currentPost: BehaviorSubject<IPost | undefined> = new BehaviorSubject<IPost | undefined>(undefined);
  currentPost$: Observable<IPost | undefined> = this._currentPost.asObservable().pipe(distinctUntilChanged());

  // TODO implement error handling
  // TODO implement loading state

  setCurrentPost(post: IPost){
    this._currentPost.next(post);
  }

  getPosts() {
    return this.http.get<IPost[]>(`${this.API_BASE_URI}/posts`).pipe(
      catchError((err) => of(err))
    );
  }

  reFetchPosts(){
    this._postsFetch.next();
  }
}
