import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';
import { infoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: infoPagina = {};
  equipo: infoEquipo[] = [];
  cargada: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.httpClient.get("assets/data/data-pagina.json")
      .subscribe((resp: infoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.httpClient.get("https://angular-html-e153a.firebaseio.com/equipo.json")
      .subscribe((r: infoEquipo[]) => {
        this.equipo = r;
        console.log(this.equipo);
      });
  }
}
