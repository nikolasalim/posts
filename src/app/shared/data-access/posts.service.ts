import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IPost } from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpClient);

  posts$: Observable<IPost[]> = this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
}
