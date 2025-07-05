import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CategoriaModalPage } from '../categoria-modal/categoria-modal.page';

@Component({
  selector: 'app-cadastro-treino',
  templateUrl: './cadastro-treino.page.html',
  styleUrls: ['./cadastro-treino.page.scss'],
  standalone: false,
})
export class CadastroTreinoPage {
  treino = {
    nome: '',
    data: this.getDataHoje(),
    posicoes: [] as any[],
  };

  categorias = [
    { id: 12, nome: 'Americana' },
    { id: 10, nome: 'Controle lateral (side control)' },
    { id: 20, nome: 'Controle de costas' },
    { id: 4, nome: 'Queda' },
    { id: 8, nome: 'Meia-guarda' },
    { id: 7, nome: 'Guarda aberta' },
    { id: 6, nome: 'Guarda fechada' },
    { id: 18, nome: 'Defesa de queda' },
    { id: 3, nome: 'Raspagem' },
    { id: 15, nome: 'Chave de braço' },
    { id: 16, nome: 'Chave de perna' },
    { id: 1, nome: 'Finalização das costas' },
    { id: 2, nome: 'Finalização do 100kg' },
    { id: 13, nome: 'Mata-leão' },
    { id: 19, nome: 'Passagem em pé' },
    { id: 5, nome: 'Passagem de guarda' },
    { id: 9, nome: 'Montada' },
    { id: 14, nome: 'Estrangulamento' },
    { id: 17, nome: 'Sweep (variações de raspagem)' },
    { id: 11, nome: 'Kimura' },
  ];

  posicaoAtual = { nome: '', categoria: this.categorias[0].id, observacao: '' };

  indexEditando: number | null = null; // controla edição

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  getDataHoje(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  adicionarPosicao() {
    if (!this.posicaoAtual.nome || !this.posicaoAtual.categoria) {
      alert('Preencha o nome e a categoria da posição.');
      return;
    }

    if (this.indexEditando !== null) {
      // Atualiza posição existente
      this.treino.posicoes[this.indexEditando] = { ...this.posicaoAtual };
      this.indexEditando = null;
    } else {
      // Adiciona nova posição
      this.treino.posicoes.push({ ...this.posicaoAtual });
    }

    this.posicaoAtual = { nome: '', categoria: this.categorias[0].id, observacao: '' };
  }

  editarPosicao(index: number) {
    this.indexEditando = index;
    this.posicaoAtual = { ...this.treino.posicoes[index] };
  }

  excluirPosicao(index: number) {
    this.treino.posicoes.splice(index, 1);
    if (this.indexEditando === index) {
      this.indexEditando = null;
      this.posicaoAtual = { nome: '', categoria: this.categorias[0].id, observacao: '' };
    }
  }

  salvarTreino() {
    if (!this.validarData(this.treino.data)) {
      alert('Data inválida. Use o formato dd/mm/yyyy.');
      return;
    }

    console.log('Treino salvo:', this.treino);
    alert('Treino salvo com sucesso!');
    this.navCtrl.back();
  }

  validarData(data: string): boolean {
    const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(data);
  }

  getNomeCategoria(id: number): string {
    const cat = this.categorias.find((c) => c.id === id);
    return cat ? cat.nome : 'Categoria não encontrada';
  }
  async abrirModalCategoria() {
    const modal = await this.modalCtrl.create({
      component: CategoriaModalPage,
      componentProps: { categorias: this.categorias },
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        // Verifica se a categoria já existe, senão adiciona
        const existe = this.categorias.some((c) => c.id === data.id);
        if (!existe) this.categorias.push(data);
        this.posicaoAtual.categoria = data.id;
      }
    });

    return await modal.present();
  }
}
