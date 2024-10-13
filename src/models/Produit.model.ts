// src/app/models/produit.model.ts
export class Produit {
  constructor(
    public id: number,
    public name: string,
    public images: string[],
    public title: string,
    public price: number,
    public category: string,
    public description: string,
    public stock: number
  ) {}
}