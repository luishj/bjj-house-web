import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth.service';
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
  @Input() greeting: string = 'Boa tarde';
  @Input() subtitle: string = 'Continue seu progresso nos treinos hoje';

  user$: Observable<User | null>;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
    this.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onAuthAction() {
    if (this.isAuthenticated) {
      this.authService.logout();
    }
    // Para login, será tratado pelo componente pai
  }
}