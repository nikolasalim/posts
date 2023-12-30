import { Component, inject } from '@angular/core';
import { PostsService } from "../shared/data-access/posts.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  postsService = inject(PostsService);

}
