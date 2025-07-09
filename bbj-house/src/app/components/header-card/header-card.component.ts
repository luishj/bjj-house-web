import { Component, Input } from '@angular/core';
interface Stripe {
  class: string;
}

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss'],
      standalone: false,
})
export class HeaderCardComponent {
  @Input() greeting: string = '';
  @Input() userName: string = '';
  @Input() subtitle: string = '';
}