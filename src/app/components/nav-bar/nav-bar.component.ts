// nav-bar.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter<boolean>();

  @Input() productItms!: boolean;
  @Output() homeSelected = new EventEmitter<boolean>();

  @Output() search = new EventEmitter<string>(); // Événement pour la recherche
  @Output() categorySelected = new EventEmitter<string>();
  @Input() totalItemsInCart: number = 0;

  searchTerm: string = ''; // Initialiser le terme de recherche
  categories: string[] = []; // Tableau pour stocker les catégories
  
  constructor(private produitService: ProduitService) {}
  ngOnInit(): void {
      this.produitService.getAllCategories().subscribe(
        (response: string[]) => {
          this.categories = response;
        },
        (error) => {
          console.error('Erreue lors de la recuperation des catégories',error);
        }
      )
  }

  searchProduct() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm); // Émettre l'événement avec le terme de recherche
      this.searchTerm = ''; // Réinitialiser le champ de recherche
    }
  }

  filtrerParCategorie(categorie: string) {
    this.categorySelected.emit(categorie); // Émet un événement avec la catégorie sélectionnée
  }

  afficherPanier() {
    this.panierSelected.emit(true);
    this.homeSelected.emit(false);
  }

  afficherHome() {
    this.panierSelected.emit(false);
    this.homeSelected.emit(true);
  }

  getTotalItems() {
    return this.totalItemsInCart;
  }
}
