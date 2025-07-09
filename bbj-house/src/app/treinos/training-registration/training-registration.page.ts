import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

interface Position {
  name: string;
  description?: string;
}

interface Roll {
  rollTime: number;
  techniquesApplied: number;
  sweeps: number;
  takedowns: number;
  guardPasses: number;
}

interface TrainingData {
  date: string;
  startTime: string;
  endTime: string;
  instructor: string;
  positions: Position[];
  rolls: Roll[];
  rollTime: number;
  techniquesApplied: number;
  sweeps: number;
  takedowns: number;
  guardPasses: number;
}

@Component({
  selector: 'app-training-registration',
  templateUrl: './training-registration.page.html',
  styleUrls: ['./training-registration.page.scss'],
      standalone: false,
})
export class TrainingRegistrationPage implements OnInit {

  trainingData: TrainingData = {
    date: new Date().toISOString(),
    startTime: '',
    endTime: '',
    instructor: '',
    positions: [],
    rolls: [],
    rollTime: 0,
    techniquesApplied: 0,
    sweeps: 0,
    takedowns: 0,
    guardPasses: 0
  };

  newPosition: Position = {
    name: '',
    description: ''
  };

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Definir horários padrão
    const now = new Date();
    this.trainingData.startTime = now.toISOString();
    
    const endTime = new Date(now.getTime() + 90 * 60000); // +90 minutos
    this.trainingData.endTime = endTime.toISOString();
  }

  addPosition() {
    if (this.newPosition.name.trim()) {
      this.trainingData.positions.push({
        name: this.newPosition.name.trim(),
        description: this.newPosition.description?.trim()
      });
      
      this.newPosition = { name: '', description: '' };
      this.showToast('Posição adicionada com sucesso!', 'success');
    } else {
      this.showToast('Por favor, insira o nome da posição', 'warning');
    }
  }

  removePosition(index: number) {
    this.trainingData.positions.splice(index, 1);
    this.showToast('Posição removida', 'medium');
  }

  incrementCounter(field: keyof TrainingData) {
    if (typeof this.trainingData[field] === 'number') {
      (this.trainingData[field] as number)++;
    }
  }

  decrementCounter(field: keyof TrainingData) {
    if (typeof this.trainingData[field] === 'number' && (this.trainingData[field] as number) > 0) {
      (this.trainingData[field] as number)--;
    }
  }

  addRoll() {
    if (this.trainingData.rollTime > 0) {
      const roll: Roll = {
        rollTime: this.trainingData.rollTime,
        techniquesApplied: this.trainingData.techniquesApplied,
        sweeps: this.trainingData.sweeps,
        takedowns: this.trainingData.takedowns,
        guardPasses: this.trainingData.guardPasses
      };
      
      this.trainingData.rolls.push(roll);
      
      // Reset counters
      this.trainingData.rollTime = 0;
      this.trainingData.techniquesApplied = 0;
      this.trainingData.sweeps = 0;
      this.trainingData.takedowns = 0;
      this.trainingData.guardPasses = 0;
      
      this.showToast('Rolada adicionada com sucesso!', 'success');
    } else {
      this.showToast('Por favor, defina o tempo da rolada', 'warning');
    }
  }

  removeRoll(index: number) {
    this.trainingData.rolls.splice(index, 1);
    this.showToast('Rolada removida', 'medium');
  }

  async saveTraining() {
    if (!this.validateTraining()) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja salvar este treino?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: () => {
            this.performSave();
          }
        }
      ]
    });

    await alert.present();
  }

  private validateTraining(): boolean {
    if (!this.trainingData.date) {
      this.showToast('Por favor, selecione a data do treino', 'danger');
      return false;
    }

    if (!this.trainingData.startTime) {
      this.showToast('Por favor, defina o horário de início', 'danger');
      return false;
    }

    if (!this.trainingData.endTime) {
      this.showToast('Por favor, defina o horário de fim', 'danger');
      return false;
    }

    if (!this.trainingData.instructor.trim()) {
      this.showToast('Por favor, informe o instrutor', 'danger');
      return false;
    }

    return true;
  }

  private performSave() {
    // Aqui você implementaria a lógica para salvar no backend/storage
    console.log('Salvando treino:', this.trainingData);
    
    // Simular salvamento
    setTimeout(() => {
      this.showToast('Treino salvo com sucesso!', 'success');
      this.resetForm();
    }, 1000);
  }

  private resetForm() {
    this.trainingData = {
      date: new Date().toISOString(),
      startTime: '',
      endTime: '',
      instructor: '',
      positions: [],
      rolls: [],
      rollTime: 0,
      techniquesApplied: 0,
      sweeps: 0,
      takedowns: 0,
      guardPasses: 0
    };
    
    this.newPosition = { name: '', description: '' };
    
    const now = new Date();
    this.trainingData.startTime = now.toISOString();
    
    const endTime = new Date(now.getTime() + 90 * 60000);
    this.trainingData.endTime = endTime.toISOString();
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