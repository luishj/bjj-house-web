import { Component, Input } from '@angular/core';
interface Stripe {
  class: string;
}

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
      standalone: false,
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() subtitle: string = '';
  @Input() percentage: string = '';
  @Input() icon: string = '';
  @Input() iconColor: string = '';
  @Input() iconBgColor: string = '';
}