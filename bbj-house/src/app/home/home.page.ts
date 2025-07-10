import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  showLoginModal = false;
  isAuthenticated$: Observable<boolean>;

  headerData = {
    greeting: 'Boa tarde',
    userName: 'João Silva!',
    subtitle: 'Continue seu progresso nos treinos hoje',
  };

  graduationData = {
    title: 'Graduação Atual',
    beltLevel: 'Faixa Azul 2º Grau',
    beltColor: 'azul',
    degree: 2,
  };

  statsData = [
    {
      title: 'Treinos Realizados',
      value: '5',
      subtitle: 'nos últimos 7 dias',
      percentage: '+25%',
      icon: 'pulse',
      iconColor: 'text-blue',
      iconBgColor: 'bg-blue',
    },
    {
      title: 'Tempo Total',
      value: '8h 30min',
      subtitle: 'esta semana',
      percentage: '+15%',
      icon: 'time',
      iconColor: 'text-green',
      iconBgColor: 'bg-green',
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.isAuthenticated$ = new Observable((observer) => {
      this.authService.user$.subscribe((user) => {
        observer.next(!!user);
      });
    });
  }

  ngOnInit() {}

  openLoginModal() {
    
    this.isAuthenticated$.subscribe((valor) => {
      if (!valor) {
        this.router.navigate(['/login']);
      }
    });
  }

  createAthleteAccount() {
    this.router.navigate(['/athlete-registration']);
  }
}
