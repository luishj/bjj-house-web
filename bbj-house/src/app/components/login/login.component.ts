import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

interface TrainingSchedule {
  dayOfWeek: string;
  time: string;
  withGi: boolean;
}

interface AthleteData {
  name: string;
  birthDate: string;
  city: string;
  belt: string;
  degree: number;
  trainingSchedules: TrainingSchedule[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    standalone: false,
})
export class LoginComponent   {
 @Input() isOpen: boolean = false;


  isLogin = true;
  showPassword = false;
  formData = {
    name: '',
    email: '',
    password: ''
  };
  error = '';
  isLoading = false;

  constructor(
    private router: Router,
     private navController: NavController,
    private authService: AuthService,
    private toastController: ToastController,
    
  ) {}


  async onSubmit() {
    this.error = '';

    if (!this.formData.email || !this.formData.password) {
      this.error = 'Por favor, preencha todos os campos';
      return;
    }

    if (!this.isLogin && !this.formData.name) {
      this.error = 'Por favor, preencha seu nome';
      return;
    }

    try {
      this.isLoading = true;
      let success = false;
      
      if (this.isLogin) {
        success = await this.authService.login(this.formData.email, this.formData.password);
        if (!success) {
          this.error = 'Email ou senha incorretos';
        }
      } else {
        success = await this.authService.register(this.formData.name, this.formData.email, this.formData.password);
      }

      if (success) {
        this.formData = { name: '', email: '', password: '' };
     
        this.navController.back();
   
        
        const toast = await this.toastController.create({
          message: this.isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
      }
    } catch (err) {
      this.error = 'Erro ao processar solicitação';
    } finally {
      this.isLoading = false;
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.formData = { name: '', email: '', password: '' };
  }

  close() {
this.navController.back();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}