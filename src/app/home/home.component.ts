import { Component, inject } from '@angular/core';
import { PostsService } from "../shared/data-access/posts.service";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./ui/post/post.component";
import { IPost } from "../shared/interfaces/post";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  postsService = inject(PostsService);

  setCurrentPost(post: IPost){
    this.postsService.setCurrentPost(post);
  }

}
