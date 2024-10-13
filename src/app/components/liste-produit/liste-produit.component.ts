// liste-produit.component.ts

import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../models/Produit.model';
import { LignePanier } from '../../../models/lignepanier.model';
import { ProduitService } from '../../services/produit.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {

  detailsPanier: LignePanier[] = [];
  displayPanier: boolean = false;
  displayHome: boolean = true;
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  errorMessage: string = '';
  
  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.getAllProducts().subscribe(
      (response: any) => {
        this.produits = response.products;
        this.produitsFiltres = [...this.produits];
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des produits.';
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  get totalItemsInCart(): number {
    return this.detailsPanier.reduce((acc, item) => acc + item.qte, 0);
  }

  onProductAdded($event: Produit) {
    const existingProduct = this.detailsPanier.find(i => i.produit.id === $event.id);
    if (existingProduct) {
      existingProduct.qte++;
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = $event;
      newLignePanier.qte = 1;
      this.detailsPanier.push(newLignePanier);
    }
    console.log(this.detailsPanier);
  }

  showPanier($event: boolean) {
    this.displayPanier = $event;
    this.displayHome = !this.displayPanier;
  }

  showHome($event: boolean) {
    this.displayHome = $event;
    this.displayPanier = !this.displayHome;
    this.produitsFiltres = [...this.produits];
  }

  showHomeAfterShopping() {
    this.displayPanier = false;
    this.displayHome = true;
    this.produitsFiltres = [...this.produits];
  }

  searchProduct(p: string) {
    this.produitService.searchProduct(p).subscribe(
      (response: any) => {
        this.produitsFiltres = response.products; // Met à jour les produits filtrés avec les résultats de la recherche
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la recherche des produits.';
        console.error('Erreur lors de la recherche des produits', error);
      }
    );
  }

  onCategorySelected(category: string) {
    this.produitsFiltres = this.produits.filter(produit => produit.category === category);
  }
}
