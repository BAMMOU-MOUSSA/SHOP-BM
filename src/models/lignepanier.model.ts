// src/app/models/lignepanier.model.ts

import { Produit } from "./Produit.model";


export class LignePanier {
  produit!: Produit;
  qte!: number;
}
