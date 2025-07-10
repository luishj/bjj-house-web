import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

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
  selector: 'app-athlete-registration',
  templateUrl: './athlete-registration.component.html',
  styleUrls: ['./athlete-registration.component.scss'],
    standalone: false,
})
export class AthleteRegistrationComponent implements OnInit {

  athleteData: AthleteData = {
    name: '',
    birthDate: '',
    city: '',
    belt: '',
    degree: 0,
    trainingSchedules: []
  };

  newSchedule: TrainingSchedule = {
    dayOfWeek: '',
    time: '',
    withGi: true
  };

  bjjBelts = [
    { value: 'branca', label: 'Branca', color: 'belt-white' },
    { value: 'azul', label: 'Azul', color: 'belt-blue' },
    { value: 'roxa', label: 'Roxa', color: 'belt-purple' },
    { value: 'marrom', label: 'Marrom', color: 'belt-brown' },
    { value: 'preta', label: 'Preta', color: 'belt-black' },
    { value: 'coral', label: 'Coral', color: 'belt-coral' },
    { value: 'vermelha', label: 'Vermelha', color: 'belt-red' }
  ];

  daysOfWeek = [
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  getMaxDegrees(belt: string): number {
    switch (belt) {
      case 'branca':
      case 'azul':
      case 'roxa':
      case 'marrom':
        return 4;
      case 'preta':
        return 10;
      case 'coral':
      case 'vermelha':
        return 0;
      default:
        return 0;
    }
  }

  onBeltChange() {
    this.athleteData.degree = 0; // Reset degree when belt changes
  }

  incrementDegree() {
    const maxDegrees = this.getMaxDegrees(this.athleteData.belt);
    if (this.athleteData.degree < maxDegrees) {
      this.athleteData.degree++;
    }
  }

  decrementDegree() {
    if (this.athleteData.degree > 0) {
      this.athleteData.degree--;
    }
  }

  async addTrainingSchedule() {
    if (!this.newSchedule.dayOfWeek || !this.newSchedule.time) {
      this.showToast('Por favor, preencha o dia da semana e horário', 'warning');
      return;
    }

    // Verificar se já existe treino neste dia
    const existingSchedule = this.athleteData.trainingSchedules.find(
      schedule => schedule.dayOfWeek === this.newSchedule.dayOfWeek
    );

    if (existingSchedule) {
      this.showToast('Já existe um treino cadastrado para este dia da semana', 'warning');
      return;
    }

    this.athleteData.trainingSchedules.push({ ...this.newSchedule });
    
    this.newSchedule = {
      dayOfWeek: '',
      time: '',
      withGi: true
    };

    this.showToast('Horário adicionado com sucesso!', 'success');
  }

  removeTrainingSchedule(index: number) {
    this.athleteData.trainingSchedules.splice(index, 1);
    this.showToast('Horário removido', 'medium');
  }

  async saveAthlete() {
    if (!this.validateForm()) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja criar sua conta de atleta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Criar Conta',
          handler: () => {
            this.performSave();
          }
        }
      ]
    });

    await alert.present();
  }

  private validateForm(): boolean {
    if (!this.athleteData.name.trim()) {
      this.showToast('Por favor, informe seu nome', 'danger');
      return false;
    }

    if (!this.athleteData.birthDate) {
      this.showToast('Por favor, informe sua data de nascimento', 'danger');
      return false;
    }

    if (!this.athleteData.city.trim()) {
      this.showToast('Por favor, informe a cidade onde treina', 'danger');
      return false;
    }

    if (!this.athleteData.belt) {
      this.showToast('Por favor, selecione sua faixa', 'danger');
      return false;
    }

    if (this.athleteData.trainingSchedules.length === 0) {
      this.showToast('Por favor, adicione pelo menos um horário de treino', 'danger');
      return false;
    }

    return true;
  }

  private async performSave() {
    const loading = await this.loadingController.create({
      message: 'Criando conta de atleta...',
      duration: 2000
    });
    
    await loading.present();

    // Simular salvamento
    setTimeout(async () => {
      await loading.dismiss();
      this.showToast('Conta de atleta criada com sucesso!', 'success');
      this.goBack();
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  getDayLabel(dayValue: string): string {
    return this.daysOfWeek.find(day => day.value === dayValue)?.label || dayValue;
  }

  getBeltColor(belt: string): string {
    return this.bjjBelts.find(b => b.value === belt)?.color || 'belt-default';
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}