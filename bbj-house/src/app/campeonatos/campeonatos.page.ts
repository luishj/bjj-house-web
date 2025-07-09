import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Championship {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'finished';
}

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
      standalone: false,
})
export class CampeonatosPage implements OnInit {

  championships: Championship[] = [
    {
      id: '1',
      title: 'Campeonato Brasileiro de Jiu-Jitsu',
      date: '2024-03-15',
      location: 'São Paulo, SP',
      image: 'https://images.pexels.com/photos/7045717/pexels-photo-7045717.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Copa Regional de Karatê',
      date: '2024-02-28',
      location: 'Rio de Janeiro, RJ',
      image: 'https://images.pexels.com/photos/7045718/pexels-photo-7045718.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'ongoing'
    },
    {
      id: '3',
      title: 'Torneio Estadual de Taekwondo',
      date: '2024-02-10',
      location: 'Belo Horizonte, MG',
      image: 'https://images.pexels.com/photos/7045664/pexels-photo-7045664.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'finished'
    },
    {
      id: '4',
      title: 'Open Internacional de MMA',
      date: '2024-04-20',
      location: 'Brasília, DF',
      image: 'https://images.pexels.com/photos/7045665/pexels-photo-7045665.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Campeonato Nacional de Muay Thai',
      date: '2024-01-25',
      location: 'Salvador, BA',
      image: 'https://images.pexels.com/photos/7045719/pexels-photo-7045719.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'finished'
    },
    {
      id: '6',
      title: 'Copa Sul-Americana de Boxe',
      date: '2024-05-10',
      location: 'Porto Alegre, RS',
      image: 'https://images.pexels.com/photos/7045720/pexels-photo-7045720.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'upcoming'
    }
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'status-upcoming';
      case 'ongoing':
        return 'status-ongoing';
      case 'finished':
        return 'status-finished';
      default:
        return 'status-finished';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'Próximo';
      case 'ongoing':
        return 'Em andamento';
      case 'finished':
        return 'Finalizado';
      default:
        return 'Desconhecido';
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://images.pexels.com/photos/7045717/pexels-photo-7045717.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  async addChampionship() {
    const alert = await this.alertController.create({
      header: 'Cadastrar Campeonato',
      message: 'Funcionalidade em desenvolvimento',
      buttons: ['OK']
    });
    await alert.present();
  }
}