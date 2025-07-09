import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estatistica-card',
  templateUrl: './estatistica-card.component.html',
  styleUrls: ['./estatistica-card.component.scss'],
      standalone: false,
})
export class EstatisticaCardComponent {
  @Input() icone!: string;
  @Input() titulo!: string;
  @Input() valor!: string;
  @Input() periodo!: string;
}