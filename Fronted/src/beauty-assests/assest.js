import Perfume from './Perfume.jpg'; 
import BodyCare from './BodyCare.jpg';
import Hair from './Hair.jpg';
import Nail from './Nail.jpg';
import Makeup from './Makeup.jpg';
import Blush from './Blush.png';
import Eyeliner from './Eyeliner.png';
import Cleanser from './Cleanser.png';
import compact from './compact.png';
import lipgloss from './lipGloss.jpg'; 
import lipstickBestSeller from './LipstickBestSeller.avif'; 
import compactpowder from './compactpowder.png'; 
import eyelashes from './Eyelashes.png';
import contour from './contour.png';
import eyeshadow from './eyeshadow.png';
import nailPolish from './Nailpolish.png'; 
import perfumes1 from './perfumes1.png';
import serum from './serum.png';
import shampoo from './shamphoo.png';
import beautyPic from './beautyPic.png'


export const assets = {
  beautyPic,
  Perfume,
  BodyCare,
  Hair,
  Nail,
  Makeup,
  Blush,
  Eyeliner,
  Cleanser,
  compact,
  lipgloss,
  lipstickBestSeller,
  compactpowder,
  eyelashes,
  contour,
  eyeshadow,
  nailPolish,
  perfumes1,
  serum,
  shampoo,
  beautyCategories
};

export const dummyProducts = [
  {
    _id: "p01",
    name: "Blush",
    category: "cosmetics",
    price: 25,
    offerPrice: 20,
    image: Blush,
    description: [
      "Fresh and organic",
      "Rich in carbohydrates",
      "Ideal for curries and fries",
    ],
    inStock: true,
  },
  {
    _id: "p02",
    name: "Eyeliner",
    category: "cosmetics",
    price: 40,
    offerPrice: 35,
    image: Eyeliner,
    description: [
      "Juicy and ripe",
      "Rich in Vitamin C",
      "Perfect for salads and sauces",
      "Farm fresh quality",
    ],
    inStock: true,
  },
  {
    _id: "p03",
    name: "Eyelashes",
    category: "cosmetics",
    price: 30,
    offerPrice: 28,
    image: eyelashes,
    description: [
      "Sweet and crunchy",
      "Good for eyesight",
      "Ideal for juices and salads",
    ],
    inStock: true,
  },
  {
    _id: "p04",
    name: "Compact Powder",
    category: "cosmetics",
    price: 18,
    offerPrice: 15,
    image: compactpowder,
    description: [
      "Rich in iron",
      "High in vitamins",
      "Perfect for soups and salads",
    ],
    inStock: true,
  },
  {
    _id: "p05",
    name: "Lip Gloss",
    category: "cosmetics",
    price: 22,
    offerPrice: 19,
    image: lipgloss,
    description: [
      "Fresh and pungent",
      "Perfect for cooking",
      "A kitchen staple",
    ],
    inStock: true,
  },
  {
    _id: "p06",
    name: "Compact",
    category: "cosmetics",
    price: 120,
    offerPrice: 110,
    image: compact,
    description: [
      "Crisp and juicy",
      "Rich in fiber",
      "Boosts immunity",
      "Perfect for snacking and desserts",
      "Organic and farm fresh",
    ],
    inStock: true,
  },
  {
    _id: "p07",
    name: "Contour",
    category: "cosmetics",
    price: 120,
    offerPrice: 110,
    image: contour,
    description: [
      "Crisp and juicy",
      "Rich in fiber",
      "Boosts immunity",
      "Perfect for snacking and desserts",
      "Organic and farm fresh",
    ],
    inStock: true,
  },
  {
    _id: "p08",
    name: "Perfumes",
    category: "perfume",
    price: 80,
    offerPrice: 75,
    image: perfumes1,
    description: [
      "Juicy and sweet",
      "Rich in Vitamin C",
      "Perfect for juices and salads",
    ],
    inStock: true,
  },
  {
    _id: "p09",
    name: "Cleanser",
    category: "skincare",
    price: 60,
    offerPrice: 55,
    image: Cleanser,
    description: [
      "Pure and fresh",
      "Rich in calcium",
      "Ideal for tea, coffee, and desserts",
      "Trusted brand quality",
    ],
    inStock: true,
  },
  {
    _id: "p10",
    name: "Shampoo",
    category: "haircare",
    price: 80,
    offerPrice: 75,
    image: shampoo,
    description: [
      "Refreshing and fizzy",
      "Perfect for parties and gatherings",
      "Best served chilled",
    ],
    inStock: true,
  },
  {
    _id: "p11",
    name: "Nail Polish",
    category: "nailcare",
    price: 550,
    offerPrice: 520,
    image: nailPolish,
    description: [
      "Long grain and aromatic",
      "Perfect for biryani and pulao",
      "Premium quality",
    ],
    inStock: true,
  },
];


 const beautyCategories = [
      {
            title: "Build with Passion, Ship with Pride",
            image: Perfume,
            category:"Perfumes",
            path:"perfumes"
        },
        
        {
            title: "Build with Passion, Ship with Pride",
            image:BodyCare,
            category:"Hair Care",
            path:"haircare"
        },
        {
            title: "Think Big, Code Smart",
            image: Hair,
            category:"Cosmetics",
            path:"cosmetics"
        },
        {
            title: "Think Big, Code Smart",
            image: Nail,
            category:"Nail Care",
            path:"nailcare"
        },
         {
            title: "Think Big, Code Smart",
            image: Makeup,
            category:"Body Care",
            path:"bodycare"
        },
    ];

