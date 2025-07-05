import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
    standalone: false,
})
export class TreinosPage implements OnInit {

  treinos = [
    { nome: 'Treino de passada', data: '05/07/2025' },
    { nome: 'Treino de raspagem', data: '06/07/2025' },
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  abrirCadastro() {
    this.navCtrl.navigateForward('/cadastro-treino');
  }

}
