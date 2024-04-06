import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tab-button',
  templateUrl: './tab-button.component.html',
})
export class TabButtonComponent {
  @Input({ required: true })
  sourceId: string;

  @Input({ required: true })
  isActive: boolean = false;

  @Input()
  type: string;

  @Input({ required: true })
  btnText: string;

  @Output()
  selected: EventEmitter<string> = new EventEmitter();

  toggle() {
    this.selected.emit(this.sourceId);
  }
}
