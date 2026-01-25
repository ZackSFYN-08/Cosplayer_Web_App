const mongoose = require('mongoose');
const Product = require('./models/Product');

// We are hardcoding the connection URI here for simplicity
const MONGO_URI = "mongodb://localhost:27017/cosplayer_wardrobe";

const products = [
    {
        name: "Bungo Stray Dog",
        series: "Bungo Stray Dog",
        price: 100000,
        rating: 4.8,
        imageUrl: ["/images/bungo-stray-dog.png"],
        description: "Kostum ini sangat nyaman dipakai karena menggunakan bahan yang lembut dan tidak mudah luntur. Tersedia juga aksesoris tambahan.",
    },
    {
        name: "Mitsuha",
        series: "Your Name",
        price: 150000,
        rating: 4.8,
        imageUrl: ["/images/mitsuha.png"],
        description: "Kostum Mitsuha dari film fenomenal 'Your Name'. Bahan berkualitas tinggi dan detail yang akurat.",
    },
    {
        name: "Yor Forger",
        series: "Spy X Family",
        price: 200000,
        rating: 4.8,
         imageUrl: [
            "/images/yor-forger-2.png",
            "/images/yor-forger.png",
        ],
        description: "Kostum 'Thorn Princess' Yor Forger. Sangat elegan dan nyaman untuk berbagai acara cosplay.",
    },
    {
        name: "Tifa",
        series: "Final Fantasy",
        price: 250000,
        rating: 4.8,
        imageUrl: ["/images/tifa.png"],
        description: "Kostum Tifa Lockhart dari Final Fantasy VII. Dibuat dengan detail untuk para penggemar sejati.",
    },
    {
        name: "Redblood Cell",
        series: "Cells at Work!",
        price: 300000,
        rating: 4.8,
        imageUrl: ["/images/redblood-cell.png"],
        description: "Jadilah sel darah merah yang energik dengan kostum ini! Cocok untuk acara yang ramai.",
    },
    {
        name: "MC LnD",
        series: "Original",
        price: 350000,
        rating: 4.8,
        imageUrl: ["/images/mc-lnd.png"],
        description: "Kostum original MC LnD yang gagah dan penuh wibawa. Termasuk semua aksesoris yang terlihat.",
    },
    {
        name: "Mikasa",
        series: "Attack on Titan",
        price: 400000,
        rating: 4.8,
        imageUrl: ["/images/mikasa.png"],
        description: "Kostum Survey Corps Mikasa Ackerman. Siap untuk bertarung melawan para Titan.",
    },
    {
        name: "Hinata",
        series: "Naruto",
        price: 450000,
        rating: 4.8,
        imageUrl: ["/images/hinata.png"],
        description: "Kostum Hinata Hyuga lengkap dengan wig. Tunjukkan semangat ninja Konoha-mu!",
    },
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

importData();