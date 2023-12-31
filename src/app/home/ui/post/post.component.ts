import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { IPost } from "../../../shared/interfaces/post";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, OnChanges {

  @Input({required: true}) post!: IPost;
  @Input() isActive: boolean = false;
  @Output() setCurrentPost: EventEmitter<void> = new EventEmitter<void>();
  postInfoOrder: string[] = ['title', 'userId', 'id', 'body'];
  defaultInfoOrder: string[] = [...this.postInfoOrder];
  titleOnDisplay!: string;
  valueOnDisplay!: string | number;

  ngOnInit() {
    this.titleOnDisplay = this.postInfoOrder[0];
    this.valueOnDisplay = this.post[this.postInfoOrder[0] as keyof IPost];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['isActive']) {
      if(changes['isActive'].previousValue && !changes['isActive'].currentValue) {
        this.setDefaultInfoOrder();
      }
    }
  }

  togglePostInfo(e: MouseEvent) {
    e.preventDefault();
    const shifted: string = this.postInfoOrder.shift()!;
    this.postInfoOrder.push(shifted);
    const keyToDisplay = this.postInfoOrder[0];
    this.titleOnDisplay = keyToDisplay;
    this.valueOnDisplay = this.post[keyToDisplay as keyof IPost];
    this.setCurrentPost.emit();
  }

  setDefaultInfoOrder(){
    this.postInfoOrder = [...this.defaultInfoOrder];
    this.titleOnDisplay = this.postInfoOrder[0];
    this.valueOnDisplay = this.post[this.postInfoOrder[0] as keyof IPost];
  }
}
