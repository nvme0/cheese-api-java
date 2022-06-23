import { Cheese } from "@api/generated";

export const organicFeta: Cheese = {
  id: 1,
  name: "Organic Feta",
  imageUrl: "https://cheese.com/media/img/cheese/Feta_.jpg",
  color: "white",
  pricePerKilo: 549,
};

export const somersetBrie: Cheese = {
  id: 2,
  name: "Somerset Brie",
  imageUrl: "https://cheese.com/media/img/cheese/brie.jpg",
  color: "white",
  pricePerKilo: 325,
};

export const mascarpone: Cheese = {
  id: 3,
  name: "Mascarpone (Australian)",
  imageUrl: "https://cheese.com/media/img/cheese/1186-mascarpone_australian.jpg",
  color: "ivory",
  pricePerKilo: 199,
};

export const cottageCheese: Cheese = {
  id: 4,
  name: "Cottage Cheese (Australian)",
  imageUrl: "https://cheese.com/media/img/cheese/Cottagecheese.jpg",
  color: "white",
  pricePerKilo: 399,
};

export const dryJack: Cheese = {
  id: 5,
  name: "Dry Jack",
  imageUrl: "https://cheese.com/media/img/cheese/427px-Sonoma_Dry_Jack.jpg",
  color: "pale yellow",
  pricePerKilo: 249,
};

export default [organicFeta, somersetBrie, mascarpone, cottageCheese, dryJack];
