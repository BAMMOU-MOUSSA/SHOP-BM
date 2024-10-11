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
  produitsFiltres: Produit[] = []; // Liste des produits filtrés à afficher
  categories: string[] = []; // Liste des catégories de produits

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response; // Récupère toutes les catégories
        this.getProductsByCategory('All'); // Charge tous les produits par défaut
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    );
  }

  // Récupérer les produits par catégorie
  getProductsByCategory(category: string) {
    if (category === 'All') {
      this.produitService.getAllProducts().subscribe(
        (response: any) => {
          this.produits = response.products;
          this.produitsFiltres = [...this.produits]; // Duplique tous les produits dans produitsFiltres
        },
        (error) => {
          console.error('Erreur lors de la récupération des produits:', error);
        }
      );
    } else {
      this.produitService.getProductByCategory(category).subscribe(
        (response: any) => {
          this.produits = response.products;
          this.produitsFiltres = [...this.produits]; // Duplique les produits de la catégorie sélectionnée
        },
        (error) => {
          console.error(`Erreur lors de la récupération des produits pour la catégorie ${category}:`, error);
        }
      );
    }
  }

  // Méthode pour filtrer les produits par catégorie depuis la barre de navigation
  onCategorySelected(categorie: string) {
    this.getProductsByCategory(categorie);
  }

  // Recherche de produit
  onSearchSelected(term: string) {
    if (term) {
      this.produitService.searchProduct(term).subscribe(
        (response: any) => {
          this.produitsFiltres = response.products;
        },
        (error) => {
          console.error('Erreur lors de la recherche de produit:', error);
        }
      );
    }
  }

  // Méthodes du panier
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
  }

  // Affichage du panier
  showPanier($event: boolean) {
    this.displayPanier = $event;
    this.displayHome = !this.displayPanier;
  }

  // Affichage de la page des produits
  showHome($event: boolean) {
    this.displayHome = $event;
    this.displayPanier = !this.displayHome;
    this.produitsFiltres = [...this.produits]; // Réinitialise la liste des produits
  }

  // Retour à la page d'accueil après avoir visualisé le panier
  showHomeAfterShopping() {
    this.displayPanier = false;
    this.displayHome = true;
    this.produitsFiltres = [...this.produits]; // Réinitialise la liste des produits
  }
}
