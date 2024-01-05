import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged, map,
  Observable, of, shareReplay, switchMap, tap
} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IPost } from "../interfaces/post";

const API_BASE_URI = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpClient);

  private _postsFetch = new BehaviorSubject<null | void>(null);
  posts$: Observable<IPost[]> = this._postsFetch.pipe(
    switchMap(() => this.getPosts()),
    map((posts: IPost[]) => posts),
    shareReplay(1)
  );

  private _currentPost: BehaviorSubject<IPost | undefined> = new BehaviorSubject<IPost | undefined>(undefined);
  currentPost$: Observable<IPost | undefined> = this._currentPost.asObservable().pipe(distinctUntilChanged());

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this._isLoading.asObservable().pipe(distinctUntilChanged());

  private _hasError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasError$: Observable<boolean> = this._hasError.asObservable().pipe(distinctUntilChanged());

  setCurrentPost(post: IPost): void {
    this._currentPost.next(post);
  }

  getPosts(): Observable<IPost[]> {
    this._isLoading.next(true);
    this._hasError.next(false);
    return this.http.get<IPost[]>(`${API_BASE_URI}/posts`).pipe(
      catchError((err) => this.handleError(err)),
      tap(() => this._isLoading.next(false))
    );
  }

  reFetchPosts(): void {
    this._postsFetch.next();
  }

  handleError(error: HttpErrorResponse): Observable<any>{
    this._hasError.next(true);
    return of(error);
  }

}
