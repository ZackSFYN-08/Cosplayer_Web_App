export type Product = {
  _id: string; 
  name: string;
  series: string;
  price: number;
  rating: number;
  imageUrl: string[];
  description: string;
  reviews?: { name: string; rating: number; comment: string }[];
};

export const products: Product[] = [
  {
    _id: "1",
    name: "Bungo Stray Dog",
    series: "Bungo Stray Dog",
    price: 100000,
    rating: 4.8,
    imageUrl: ["/images/bungo-stray-dog.png"],
    description: "Kostum ini sangat nyaman dipakai karena menggunakan bahan yang lembut dan tidak mudah luntur. Tersedia juga aksesoris tambahan.",
    reviews: [],
  },
  {
    _id: "2",
    name: "Mitsuha",
    series: "Your Name",
    price: 150000,
    rating: 4.8,
    imageUrl: ["/images/mitsuha.png"],
    description: "Kostum Mitsuha dari film fenomenal 'Your Name'. Bahan berkualitas tinggi dan detail yang akurat.",
    reviews: [],
  },
  {
    _id: "3",
    name: "Yor Forger",
    series: "Spy X Family",
    price: 200000,
    rating: 4.8,
    imageUrl: [
      "yor-forger.png",
      "yor-forger-2.png"
    ],
    description: "Kostum 'Thorn Princess' Yor Forger. Sangat elegan dan nyaman untuk berbagai acara cosplay.",
    reviews: [
      { name: 'Nala', rating: 4.0, comment: 'Kostumnya bagus, nyaman dipakai' },
      { name: 'Budi', rating: 5.0, comment: 'Kualitas premium, persis seperti di animenya!' },
      { name: 'Cinta', rating: 4.5, comment: 'Sangat puas dengan detail aksesorisnya.' },
    ],
  },
    {
    _id: "4",
    name: "Tifa",
    series: "Final Fantasy",
    price: 250000,
    rating: 4.8,
    imageUrl: ["/images/tifa.png"],
    description: "Kostum Tifa Lockhart dari Final Fantasy VII. Dibuat dengan detail untuk para penggemar sejati.",
    reviews: [],
  },
  {
    _id: "5",
    name: "Redblood Cell",
    series: "Cells at Work!",
    price: 300000,
    rating: 4.8,
    imageUrl: ["/images/redblood-cell.png"],
    description: "Jadilah sel darah merah yang energik dengan kostum ini! Cocok untuk acara yang ramai.",
    reviews: [],
  },
  {
    _id: "6",
    name: "MC LnD",
    series: "Original",
    price: 350000,
    rating: 4.8,
    imageUrl: ["/images/mc-lnd.png"],
    description: "Kostum original MC LnD yang gagah dan penuh wibawa. Termasuk semua aksesoris yang terlihat.",
    reviews: [],
  },
  {
    _id: "7",
    name: "Mikasa",
    series: "Attack on Titan",
    price: 400000,
    rating: 4.8,
    imageUrl: ["/images/mikasa.png"],
    description: "Kostum Survey Corps Mikasa Ackerman. Siap untuk bertarung melawan para Titan.",
    reviews: [],
  },
  {
    _id: "8",
    name: "Hinata",
    series: "Naruto",
    price: 450000,
    rating: 4.8,
    imageUrl: ["/images/hinata.png"],
    description: "Kostum Hinata Hyuga lengkap dengan wig. Tunjukkan semangat ninja Konoha-mu!",
    reviews: [],
  },
];