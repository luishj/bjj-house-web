import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

interface Training {
  id: string;
  date: string;
  instructor: string;
  duration: string;
  positions: number;
  rolls: number;
  techniques: number;
}

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
      standalone: false,
})
export class TreinosPage implements OnInit {

  showLoginModal = false;
  isAuthenticated$: Observable<boolean>;

  trainings: Training[] = [
    {
      id: '1',
      date: '2024-01-15',
      instructor: 'Professor João',
      duration: '1h 30min',
      positions: 3,
      rolls: 5,
      techniques: 8
    },
    {
      id: '2',
      date: '2024-01-12',
      instructor: 'Professor Maria',
      duration: '2h 00min',
      positions: 4,
      rolls: 6,
      techniques: 12
    },
    {
      id: '3',
      date: '2024-01-10',
      instructor: 'Professor Carlos',
      duration: '1h 45min',
      positions: 2,
      rolls: 4,
      techniques: 6
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private toastController: ToastController,
     private modalController:ModalController
  ) {
    this.isAuthenticated$ = new Observable(observer => {
      this.authService.user$.subscribe(user => {
        observer.next(!!user);
      });
    });
  }

  ngOnInit() {
  }

  addTraining() {
    if (!this.authService.isAuthenticated) {
   
  this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/training-registration']);
  }

  viewTraining(training: Training) {
    if (!this.authService.isAuthenticated) {
  this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/training-details', training.id]);
  }

  async editTraining(training: Training) {
    if (!this.authService.isAuthenticated) {
     this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/training-edit', training.id]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }


   openLoginModal() {

  this.router.navigate(['/login']);
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  async onLoginSuccess() {
    this.closeLoginModal();
    const toast = await this.toastController.create({
      message: 'Login realizado com sucesso!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}