import logo from "./logo.svg";
import Cosmetic from './beautyPic.png'
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";

import add_address_iamge from "./add_address_image.svg";
import beautyLogo from './beautyLogo.png'
import Pic5 from './Pic5.jpg'
import Perfume from './Perfume.jpg'; 
import BodyCare from './BodyCare.jpg';
import Makeup from './Makeup.jpg';
import Hair from './Hair.jpg';
import Nail from './Nail.jpg';
import CosmeticPic from './CosmeticsPic.png'
import SkinCare from './SkinCare-category.png'
import AllMakeup from './AllMakeup.png.png'
import Pic2 from './Pic2.jpg'
import Pic3 from './Pic3.jpg'
import Pic4 from './Pic4.jpg'
import Pic5 from './pic5.jpg'


export const assets = {
  AllMakeup,
  Pic2,
  Pic3,
  Pic4,
  Perfume,
  SkinCare,
  CosmeticPic,
  BodyCare,
  Makeup,
  Hair,
  Nail,
  Pic5,
  beautyLogo,
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  Cosmetic,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
 box_icon,
  add_address_iamge,
 
};

export const categories = [
  {
    text: "Cosmetics",
    path: "Cosmetics",
    image: CosmeticPic,
    bgColor: "#FEF6DA",
  },
  {
    text: "BodyCare",
    path: "BodyCare",
    image: BodyCare,
    bgColor: "#FEE0E0",
  },
  {
    text: "SkinCare",
    path: "SkinCare",
    image: SkinCare,
    bgColor: "#FEE0E0",
  },
   {
    text: "Perfumes",
    path: "Perfumes",
    image: Perfume,
    bgColor: "#FEE0E0",
  },
  {
    text: "Nail",
    path: "NailCare",
    image: Nail,
    bgColor: "#F0F5DE",
  },
  {
    text: "HairCare",
    path: "HairCare",
    image: Hair,
    bgColor: "#E1F5EC",
  },
  
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];

export const dummyProducts = [
  {
    _id: "beauty1",
    name: "Matte Lipstick",
    category: "Cosmetics",
    price: 299,
    offerPrice: 249,
    image: [Makeup],
    description: [
      "Long-lasting matte finish",
      "Smudge-proof and lightweight",
      "Perfect for everyday wear",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
  {
    _id: "beauty2",
    name: "Aloe Vera Face Gel",
    category: "SkinCare",
    price: 199,
    offerPrice: 159,
    image: [SkinCare],
    description: [
      "Soothes and hydrates skin",
      "Suitable for all skin types",
      "Enriched with pure aloe vera",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
  {
    _id: "beauty3",
    name: "Hair Serum with Argan Oil",
    category: "HairCare",
    price: 499,
    offerPrice: 449,
    image: [Hair],
    description: [
      "Reduces frizz instantly",
      "Makes hair shiny and soft",
      "Contains natural argan oil",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
  {
    _id: "beauty4",
    name: "Nail Paint - Cherry Red",
    category: "NailCare",
    price: 120,
    offerPrice: 99,
    image: [Nail],
    description: [
      "Glossy finish",
      "Quick drying formula",
      "Long-lasting color",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
  {
    _id: "beauty5",
    name: "Hydrating Body Lotion",
    category: "BodyCare",
    price: 350,
    offerPrice: 299,
    image: [BodyCare],
    description: [
      "Deep hydration for 24 hours",
      "Enriched with shea butter",
      "Non-sticky, absorbs fast",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
  {
    _id: "beauty6",
    name: "Luxury Perfume - Blossom",
    category: "Perfumes",
    price: 999,
    offerPrice: 799,
    image: [Perfume],
    description: [
      "Floral fragrance that lasts all day",
      "Elegant and bold",
      "Perfect for special occasions",
    ],
    inStock: true,
    createdAt: "2025-07-07T12:00:00.000Z",
    updatedAt: "2025-07-07T12:00:00.000Z",
  },
];


export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
