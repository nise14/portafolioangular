import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
    public productosServices: ProductosService) { }
  n
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.productosServices.buscarProducto(params["termino"])
    });
  }

}
