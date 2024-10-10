import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { LignePanier } from '../../../models/lignepanier.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {

@Input() detailPanier! : LignePanier[];

@Output() continueShopping = new EventEmitter<void>;  // Émission d'un événement pour continuer les achats

/*
get totalPrice(): number {
  let total = 0; // Initialiser le total à 0

  // Parcourir tous les articles du panier
  for (let i of this.detailPanier) {
      total += i.qte * i.produit.price; // Ajouter le prix de chaque article au total
  }
  return total; // Retourner le prix total
}
or : 
return this.detailsPanier.reduce(function(acc, item) {
    return acc + (item.qte * item.produit.prix);
}, 0);

*/

get totalPrice(): number {
  return this.detailPanier.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);
}
continuerAchats() {
  this.continueShopping.emit();  // Émettre un événement quand l'utilisateur clique sur "Continuer vos achats"
}
  
}