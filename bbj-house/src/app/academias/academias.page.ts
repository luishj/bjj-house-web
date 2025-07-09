import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


declare const google: any;
@Component({
  selector: 'app-academias',
  templateUrl: './academias.page.html',
  styleUrls: ['./academias.page.scss'],
    standalone: false,
})
export class AcademiasPage {
filtroNome: string = '';

academiasFiltradas:any = [];
userLocation:any;
academiasOriginais = [
  {
    nome: 'Gracie Barra São Miguel',
    lat: -26.724185,
    lng: -53.519260,
    telefone: '(49) 98888-1111'
  },
  {
    nome: 'Alliance BJJ Oeste',
    lat: -26.727921,
    lng: -53.515122,
    telefone: '(49) 98888-2222'
  },
  {
    nome: 'Checkmat São Miguel',
    lat: -26.729110,
    lng: -53.518370,
    telefone: '(49) 98888-3333'
  }
];
map: any;



  async ngAfterViewInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    const userLat = coordinates.coords.latitude;
    const userLng = coordinates.coords.longitude;

    const mapEl = document.getElementById('map');

this.map = new google.maps.Map(mapEl, {
  center: { lat: -26.726, lng: -53.517 }, // Centro da cidade
  zoom: 15
});
    // Pin do usuário
    new google.maps.Marker({
      position: { lat: userLat, lng: userLng },
      map: this.map,
      title: 'Você está aqui',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#D32F2F',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#fff'
      }
    });




// Salvar para usar depois
this.userLocation = { lat: userLat, lng: userLng };

this.filtrarAcademias(); // Aplica o filtro inicial
  }
  

getDistanciaKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Raio da Terra em km
  const dLat = this.toRad(lat2 - lat1);
  const dLng = this.toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) *
      Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

toRad(valor: number): number {
  return (valor * Math.PI) / 180;
}

filtrarAcademias() {
  const nomeFiltro = this.filtroNome.toLowerCase();

  this.academiasFiltradas = this.academiasOriginais.filter(ac => {
    const nomeCond = ac.nome.toLowerCase().includes(nomeFiltro);
    const dist = this.getDistanciaKm(
      this.userLocation.lat,
      this.userLocation.lng,
      ac.lat,
      ac.lng
    );

    return nomeCond;
  });

  this.recarregarMapa();
}


recarregarMapa() {
  // Apaga e recria o mapa (ou limpa e adiciona novos markers)
  const mapEl = document.getElementById('map');

  this.map = new google.maps.Map(mapEl, {
    center: this.userLocation,
    zoom: 15,
  });

  // Pin do usuário
  new google.maps.Marker({
    position: this.userLocation,
    map: this.map,
    title: 'Você está aqui',
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: '#D32F2F',
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#fff'
    }
  });

 this.academiasFiltradas.forEach((ac:any) => {
  const marker = new google.maps.Marker({
    position: { lat: ac.lat, lng: ac.lng },
    map: this.map,
    title: ac.nome
  });

const info = new google.maps.InfoWindow({
  content: `
    <div style="font-family: sans-serif; padding: 8px; border-radius: 8px; max-width: 200px;">
      <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px; color: #D32F2F;">
        ${ac.nome}
      </div>
      <div style="font-size: 14px; color: #333;">
        📞 <a href="tel:${ac.telefone.replace(/\D/g, '')}" style="text-decoration: none; color: #333;">
          ${ac.telefone}
        </a>
      </div>
    </div>
  `
});

  marker.addListener('click', () => {
    info.open(this.map, marker);
  });
});
}
}
