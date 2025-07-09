import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  instructor: string;
  positions: Position[];
  rolls: Roll[];
  duration: string;
  caloriesBurned: number;
  totalRolls: number;
  positionsLearned: number;
  positionsApplied: number;
}

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.page.html',
  styleUrls: ['./training-details.page.scss'],
  standalone: false,
})
export class TrainingDetailsPage implements OnInit {
  trainingData: TrainingData | null = null;
  isLoading = true;
  trainingId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.trainingId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTrainingData();
  }

  loadTrainingData() {
    // Simular carregamento dos dados do treino
    setTimeout(() => {
      const mockTraining: TrainingData = {
        id: this.trainingId,
        date: '2024-01-15',
        startTime: '19:00',
        endTime: '20:30',
        instructor: 'Professor João Silva',
        duration: '1h 30min',
        caloriesBurned: 450,
        totalRolls: 5,
        positionsLearned: 3,
        positionsApplied: 8,
        positions: [
          {
            name: 'Guarda Fechada',
            description: 'Posição básica de defesa no solo',
          },
          { name: 'Mount', description: 'Posição de controle superior' },
          { name: 'Side Control', description: 'Controle lateral do oponente' },
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
          {
            rollTime: 4,
            techniquesApplied: 1,
            sweeps: 2,
            takedowns: 0,
            guardPasses: 0,
          },
          {
            rollTime: 7,
            techniquesApplied: 2,
            sweeps: 1,
            takedowns: 1,
            guardPasses: 1,
          },
          {
            rollTime: 5,
            techniquesApplied: 0,
            sweeps: 0,
            takedowns: 0,
            guardPasses: 2,
          },
        ],
      };

      this.trainingData = mockTraining;
      this.isLoading = false;
    }, 1000);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  getTotalTechniques(): number {
    if (!this.trainingData) return 0;
    return this.trainingData.rolls.reduce(
      (sum, roll) => sum + roll.techniquesApplied,
      0
    );
  }

  getTotalSweeps(): number {
    if (!this.trainingData) return 0;
    return this.trainingData.rolls.reduce((sum, roll) => sum + roll.sweeps, 0);
  }

  getTotalTakedowns(): number {
    if (!this.trainingData) return 0;
    return this.trainingData.rolls.reduce(
      (sum, roll) => sum + roll.takedowns,
      0
    );
  }

  getTotalGuardPasses(): number {
    if (!this.trainingData) return 0;
    return this.trainingData.rolls.reduce(
      (sum, roll) => sum + roll.guardPasses,
      0
    );
  }

  goBack() {
    this.router.navigate(['/tabs/treinos']);
  }
}
