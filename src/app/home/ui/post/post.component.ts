import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from "../../../shared/interfaces/post";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input({required: true}) post!: IPost;
  @Output() setCurrentPost: EventEmitter<void> = new EventEmitter<void>();

  displayOrder = ['title', 'userId', 'id', 'body'];

  togglePostInfo(e: Event) {
    e.preventDefault();
    const shifted: string = this.displayOrder.shift()!;
    this.displayOrder.push(shifted);
    this.setCurrentPost.emit();
  }
}
