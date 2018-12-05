import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductosIdx } from '../interfaces/info-productos-idx';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: InfoProductosIdx[] = [];
  productosFiltrado: InfoProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get("https://angular-html-e153a.firebaseio.com/productos_idx.json")
        .subscribe((resp: InfoProductosIdx[]) => {
          this.productos = resp;
          this.cargando = false;
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-e153a.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      if (prod.categoria.indexOf(termino) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
