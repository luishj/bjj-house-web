import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

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
  id?: string;
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
  selector: 'app-training-edit',
  templateUrl: './training-edit.page.html',
  styleUrls: ['./training-edit.page.scss'],
  standalone: false,
})
export class TrainingEditPage implements OnInit {
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
    guardPasses: 0,
  };

  newPosition: Position = {
    name: '',
    description: '',
  };

  isLoading = true;
  trainingId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.trainingId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTrainingData();
  }

  loadTrainingData() {
    // Simular carregamento dos dados do treino
    setTimeout(() => {
      const mockTraining: TrainingData = {
        id: this.trainingId,
        date: '2024-01-15T00:00:00.000Z',
        startTime: '2024-01-15T19:00:00.000Z',
        endTime: '2024-01-15T20:30:00.000Z',
        instructor: 'Professor João',
        positions: [
          { name: 'Guarda Fechada', description: 'Posição básica de defesa' },
          { name: 'Mount', description: 'Posição de controle superior' },
        ],
        rolls: [
          {
            rollTime: 5,
            techniquesApplied: 2,
            sweeps: 1,
            takedowns: 0,
            guardPasses: 1,
          },
          {
            rollTime: 6,
            techniquesApplied: 3,
            sweeps: 0,
            takedowns: 1,
            guardPasses: 2,
          },
        ],
        rollTime: 0,
        techniquesApplied: 0,
        sweeps: 0,
        takedowns: 0,
        guardPasses: 0,
      };

      this.trainingData = mockTraining;
      this.isLoading = false;
    }, 1000);
  }

  addPosition() {
    if (this.newPosition.name.trim()) {
      this.trainingData.positions.push({
        name: this.newPosition.name.trim(),
        description: this.newPosition.description?.trim(),
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
    if (
      typeof this.trainingData[field] === 'number' &&
      (this.trainingData[field] as number) > 0
    ) {
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
        guardPasses: this.trainingData.guardPasses,
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
      message: 'Deseja salvar as alterações deste treino?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: () => {
            this.performSave();
          },
        },
      ],
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

  private async performSave() {
    const loading = await this.loadingController.create({
      message: 'Salvando alterações...',
      duration: 1500,
    });

    await loading.present();

    // Simular salvamento
    setTimeout(async () => {
      await loading.dismiss();
      this.showToast('Treino atualizado com sucesso!', 'success');
      this.goBack();
    }, 1500);
  }

  goBack() {
    this.router.navigate(['/tabs/treinos']);
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
