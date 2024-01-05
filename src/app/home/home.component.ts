import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsService } from "../shared/data-access/posts.service";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./ui/post/post.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  postsService = inject(PostsService);

}
