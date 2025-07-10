import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
      standalone: false,
})
export class LoginModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

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
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController
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
        this.closeModal.emit();
        this.loginSuccess.emit();
        
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
    this.closeModal.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}