import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produit } from '../../../models/Produit.model';

@Component({
  selector: 'app-produc-items',
  templateUrl: './produc-items.component.html',
  styleUrl: './produc-items.component.css'
})
export class ProducItemsComponent {

  @Input() product! : Produit;
  @Output() selectedProduct = new EventEmitter<Produit>();

  addToPanier() {
    this.product.stock--;
    this.selectedProduct.emit(this.product)
    }

  getState(stock : number) : String {
    return stock > 0 ? "en stock" : " en rupture de stock";
  }

  getColor(stock: number): String {
    return stock > 0 ? "green" : "red";
}

}
