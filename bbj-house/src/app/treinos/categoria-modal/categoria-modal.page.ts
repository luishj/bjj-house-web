import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-treino',
  templateUrl: './categoria-modal.page.html',
  styleUrls: ['./categoria-modal.page.scss'],
      standalone: false,
})
export class CategoriaModalPage {
  categorias: {id: number, nome: string}[] = [];
  filtro: string = '';
  novaCategoriaNome: string = '';

  constructor(private modalCtrl: ModalController) {}

  categoriasFiltradas() {
    const filtroMinusculo = this.filtro.toLowerCase();
    return this.categorias.filter(cat => cat.nome.toLowerCase().includes(filtroMinusculo));
  }

  selecionar(cat: {id: number, nome: string}) {
    this.modalCtrl.dismiss(cat);
  }

  adicionarNovaCategoria() {
    if (!this.novaCategoriaNome.trim()) return;

    const novaCat = {
      id: Date.now(),  // id único baseado no timestamp
      nome: this.novaCategoriaNome.trim()
    };

    this.modalCtrl.dismiss(novaCat);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}