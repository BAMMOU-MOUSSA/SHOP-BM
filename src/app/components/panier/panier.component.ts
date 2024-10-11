import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LignePanier } from '../../../models/lignepanier.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  @Input() detailPanier!: LignePanier[];

  @Output() continueShopping = new EventEmitter<void>();

  get totalPrice(): number {
    return this.detailPanier.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);
  }

  continuerAchats() {
    this.continueShopping.emit();
  }
}
