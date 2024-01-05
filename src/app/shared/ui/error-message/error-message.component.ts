import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  template: `
    <div class="text-center m-8">
      <p>An error has occurred.</p>
      <button class="py-1 px-2 my-2 border-2 border-black rounded bg-transparent hover:border-[#ff3600] hover:text-[#ff3600]" (click)="retry.emit()">Try again</button>
    </div>
  `,
  styles: ``
})
export class ErrorMessageComponent {

  @Output() retry: EventEmitter<void> = new EventEmitter<void>();

}
