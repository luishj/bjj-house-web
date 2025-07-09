import { Component, Input } from '@angular/core';
interface Stripe {
  class: string;
}

@Component({
  selector: 'app-graduacao-card',
  templateUrl: './graduacao-card.component.html',
  styleUrls: ['./graduacao-card.component.scss'],
      standalone: false,
})
export class GraduacaoCardComponent {
@Input() title: string = '';
  @Input() artName: string = '';
  @Input() beltLevel: string = '';
  @Input() beltColor: string = '';
  @Input() degree: number = 0;

  getBeltColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'branca': 'belt-white',
      'azul': 'belt-blue',
      'roxa': 'belt-purple',
      'marrom': 'belt-brown',
      'preta': 'belt-black',
      'coral': 'belt-coral',
      'vermelha': 'belt-red'
    };
    return colorMap[color.toLowerCase()] || 'belt-default';
  }

  getStripes(): Stripe[] {
    const stripes: Stripe[] = [];
    const beltColor = this.beltColor.toLowerCase();
    
    // Para faixas coloridas (branca, azul, roxa, marrom)
    if (['branca', 'azul', 'roxa', 'marrom'].includes(beltColor)) {
      for (let i = 0; i < this.degree && i < 4; i++) {
        stripes.push({ class: 'stripe-white' });
      }
    }
    
    // Para faixa preta
    else if (beltColor === 'preta') {
      for (let i = 0; i < this.degree && i < 10; i++) {
        if (i < 6) {
          stripes.push({ class: 'stripe-white' });
        } else {
          stripes.push({ class: 'stripe-red' });
        }
      }
    }
    
    // Para faixa coral (7º e 8º grau)
    else if (beltColor === 'coral') {
      // Faixa coral tem listras pretas e vermelhas alternadas
      for (let i = 0; i < 8; i++) {
        stripes.push({ 
          class: i % 2 === 0 ? 'stripe-black' : 'stripe-red' 
        });
      }
    }
    
    // Para faixa vermelha (9º e 10º grau)
    else if (beltColor === 'vermelha') {
      // Faixa vermelha sólida, sem listras
    }
    
    return stripes;
  }
}