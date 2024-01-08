import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsService } from "../shared/data-access/posts.service";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./ui/post/post.component";
import { LoadingSpinnerComponent } from "../shared/ui/loading-spinner/loading-spinner.component";
import { ErrorMessageComponent } from "../shared/ui/error-message/error-message.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostComponent, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  postsService = inject(PostsService);

  currentPost = this.postsService.currentPost;

  // TODO consider moving isLoading and hasError to this smart component instead

}
