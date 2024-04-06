import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input()
  errorMessage: string = 'Oh no! Something went wrong!';
}
