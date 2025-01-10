import {
    LayoutDashboard,  // Icon for the Dashboard
    Shapes,  // Icon for Collections
    ShoppingBag,  // Icon for Orders
    Tag, // Icon for Products
    UsersRound, // Icon for Customers
  } from "lucide-react";
  
  export const navLinks = [  // List of navigation links

    {
      url: "/", // Link to the Dashboard page
      icon: <LayoutDashboard />, // Dashboard icon
      label: "Dashboard", // Label for the Dashboard link
    },
    {
      url: "/collections",  // Link to the Collections page
      icon: <Shapes />, // Collections icon
      label: "Collections", // Label for the Collections link
    },
    {
      url: "/products", // Link to the Products page
      icon: <Tag />, // Products icon
      label: "Products", // Label for the Products link
    },
    {
      url: "/orders", // Link to the Orders page
      icon: <ShoppingBag />, // Orders icon
      label: "Orders", // Label for the Orders link
    },
    {
      url: "/customers", // Link to the Customers page
      icon: <UsersRound />, // Customers icon
      label: "Customers", // Label for the Customers link
    },
  ];
  