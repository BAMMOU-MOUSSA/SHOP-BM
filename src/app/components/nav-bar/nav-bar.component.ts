import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter<boolean>();

  @Input() productItms!: boolean;
  @Output() homeSelected = new EventEmitter<boolean>();

  @Output() categorySelected = new EventEmitter<string>(); // Événement pour sélectionner une catégorie

  @Input() totalItemsInCart: number = 0; // Input to receive total items in cart

  @Input() category!: String;
  @Input() categories: string[] = []; // Déclaration de la liste des catégories
  @Output() searchSelected = new EventEmitter<string>();
  

  afficherPanier() {
    this.panierSelected.emit(true);  // On affiche le panier
    this.homeSelected.emit(false);   // On cache les produits
  }

  afficherHome() {
    this.panierSelected.emit(false);  // On cache le panier
    this.homeSelected.emit(true);     // On affiche les produits
  }

  filtrerParCategorie(categorie: string) {
    this.categorySelected.emit(categorie); // Émet un événement avec la catégorie sélectionnée
  }

  getTotalItems() {
    return this.totalItemsInCart; // Returns the total number of items in the cart
  }

  searchProduit(term: string) {
    this.searchSelected.emit(term); // Émet un événement avec le terme de recherche
  }
}
