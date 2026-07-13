import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StateContext = createContext();

const initialProducts = [
  { id: "PROD001", name: "KEI FR PVC Copper Wire 1.5 Sqmm - Blue", category: "Wires & Cables", brand: "KEI", sku: "KEI-1.5-BL", price: 1420.00, stock: 120, unit: "Coil (90m)", rating: 4.8 },
  { id: "PROD002", name: "KEI FR PVC Copper Wire 2.5 Sqmm - Red", category: "Wires & Cables", brand: "KEI", sku: "KEI-2.5-RD", price: 2450.00, stock: 85, unit: "Coil (90m)", rating: 4.9 },
  { id: "PROD003", name: "Polycab Flexible Wire 1 Sqmm - Yellow", category: "Wires & Cables", brand: "Polycab", sku: "POL-1.0-YL", price: 1210.00, stock: 240, unit: "Coil (100m)", rating: 4.7 },
  { id: "PROD004", name: "Polycab Flexible Wire 1.5 Sqmm - Green", category: "Wires & Cables", brand: "Polycab", sku: "POL-1.5-GR", price: 1760.00, stock: 150, unit: "Coil (100m)", rating: 4.8 },
  
  { id: "PROD005", name: "Crompton 1200mm Ceiling Fan - Brown", category: "Electrical & Fans", brand: "Crompton", sku: "CRO-1200-BR", price: 2090.00, stock: 45, unit: "Pc", rating: 4.6 },
  { id: "PROD006", name: "Havells Oro 6A Socket - White", category: "Electrical & Fans", brand: "Havells", sku: "HAV-ORO-SKT", price: 110.00, stock: 500, unit: "Pc", rating: 4.5 },
  
  { id: "PROD007", name: "Kirloskar 1HP Monoblock Pump", category: "Pumps & Motors", brand: "Kirloskar", sku: "KIR-1HP-MONO", price: 6750.00, stock: 18, unit: "Pc", rating: 4.9 },
  { id: "PROD008", name: "Crompton Water Pump - 0.5HP", category: "Pumps & Motors", brand: "Crompton", sku: "CRO-0.5HP-PMP", price: 3890.00, stock: 22, unit: "Pc", rating: 4.7 },
  
  { id: "PROD009", name: "UTL 330W Solar Panel", category: "Solar Solutions", brand: "UTL", sku: "UTL-330W-SOL", price: 8990.00, stock: 12, unit: "Pc", rating: 5.0 },
  { id: "PROD010", name: "Luminous Solar Inverter 1100VA", category: "Solar Solutions", brand: "Luminous", sku: "LUM-1100-INV", price: 7490.00, stock: 15, unit: "Pc", rating: 4.8 },
  
  { id: "PROD011", name: "Havells MCB 16A Single Pole", category: "Switchgears", brand: "Havells", sku: "HAV-MCB-16A-SP", price: 210.00, stock: 350, unit: "Pc", rating: 4.9 },
  { id: "PROD012", name: "L&T Tripper MCB 32A Double Pole", category: "Switchgears", brand: "L&T", sku: "LNT-MCB-32A-DP", price: 680.00, stock: 110, unit: "Pc", rating: 4.8 }
];

const initialOrders = [
  {
    id: "JTCORD2405132",
    customer: "Sharma Electricals",
    customerCode: "JTCDE0245",
    date: "12 May 2024 | 09:30 AM",
    amount: 25430.00,
    status: "Confirmed",
    paymentStatus: "Paid",
    items: [
      { productId: "PROD001", name: "KEI FR PVC Copper Wire 1.5 Sqmm - Blue", qty: 10, price: 1420.00 },
      { productId: "PROD005", name: "Crompton 1200mm Ceiling Fan - Brown", qty: 4, price: 2090.00 },
      { productId: "PROD011", name: "Havells MCB 16A Single Pole", qty: 14, price: 210.00 }
    ],
    timeline: [
      { title: "Order Placed", time: "12 May 2024, 09:30 AM", desc: "Order booked successfully via Customer App." },
      { title: "Order Confirmed", time: "12 May 2024, 11:15 AM", desc: "Stock verification and credit check cleared by ERP." }
    ],
    remarks: "Deliver at warehouse back door."
  },
  {
    id: "JTCORD2405108",
    customer: "Sharma Electricals",
    customerCode: "JTCDE0245",
    date: "10 May 2024 | 04:15 PM",
    amount: 18750.00,
    status: "Packed",
    paymentStatus: "Paid",
    items: [
      { productId: "PROD002", name: "KEI FR PVC Copper Wire 2.5 Sqmm - Red", qty: 5, price: 2450.00 },
      { productId: "PROD008", name: "Crompton Water Pump - 0.5HP", qty: 1, price: 3890.00 },
      { productId: "PROD011", name: "Havells MCB 16A Single Pole", qty: 12, price: 210.00 }
    ],
    timeline: [
      { title: "Order Placed", time: "10 May 2024, 04:15 PM", desc: "Order submitted via Collection Agent App." },
      { title: "Order Confirmed", time: "10 May 2024, 05:45 PM", desc: "Confirmed by accounts department." },
      { title: "Order Packed", time: "11 May 2024, 10:30 AM", desc: "Ready for dispatch at warehouse Bay 4." }
    ],
    remarks: "Urgently needed for project site."
  }
];

const initialInvoices = [
  {
    invoiceNo: "INV245089",
    orderId: "JTCORD2405089",
    customer: "Sharma Electricals",
    customerCode: "JTCDE0245",
    date: "13 May 2024",
    amount: 42860.00,
    status: "Unpaid"
  },
  {
    invoiceNo: "INV245088",
    orderId: "JTCORD2405132",
    customer: "Sharma Electricals",
    customerCode: "JTCDE0245",
    date: "13 May 2024",
    amount: 25430.00,
    status: "Paid"
  }
];

export const StateProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [cart, setCart] = useState([]);
  
  const [user, setUser] = useState({
    code: "JTCDE0245",
    name: "Sharma Electricals",
    owner: "Dev Sharma",
    phone: "9876543210",
    email: "sharma@example.com",
    address: "123 Main St, Industrial Area, Kanpur, UP",
    gstin: "09ABCDE1234F1Z5",
    creditLimit: 500000.00,
    outstanding: 124560.00,
    city: "Kanpur"
  });

  const loadData = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('jtc_products');
      const storedOrders = await AsyncStorage.getItem('jtc_orders');
      const storedInvoices = await AsyncStorage.getItem('jtc_invoices');
      const storedUser = await AsyncStorage.getItem('jtc_user');

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedInvoices) setInvoices(JSON.parse(storedInvoices));
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) {
      console.warn("AsyncStorage loading failed:", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveToStorage = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("AsyncStorage save failed:", e);
    }
  };

  const addToCart = (product, qty) => {
    const existing = cart.find(i => i.productId === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(i => i.productId === product.id ? { ...i, qty: i.qty + qty } : i);
    } else {
      newCart = [...cart, { productId: product.id, name: product.name, qty, price: product.price }];
    }
    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(i => i.productId !== productId);
    setCart(newCart);
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(i => i.productId === productId ? { ...i, qty } : i);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (remarks = "") => {
    const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const newOrder = {
      id: `JTCORD${Date.now().toString().slice(-6)}`,
      customer: user.name,
      customerCode: user.code,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' | ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: totalAmount,
      status: "Pending",
      paymentStatus: "Unpaid",
      items: [...cart],
      timeline: [
        { title: "Order Booked", time: new Date().toLocaleTimeString(), desc: "Order booked successfully via Native Mobile App." }
      ],
      remarks: remarks
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    saveToStorage('jtc_orders', newOrders);

    // Update outstanding balance
    const updatedUser = { ...user, outstanding: user.outstanding + totalAmount };
    setUser(updatedUser);
    saveToStorage('jtc_user', updatedUser);

    // Create corresponding Invoice
    const newInvoice = {
      invoiceNo: `INV${Date.now().toString().slice(-6)}`,
      orderId: newOrder.id,
      customer: user.name,
      customerCode: user.code,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: totalAmount,
      status: "Unpaid"
    };
    const newInvoices = [newInvoice, ...invoices];
    setInvoices(newInvoices);
    saveToStorage('jtc_invoices', newInvoices);

    clearCart();
    return newOrder;
  };

  const payInvoice = (invoiceNo) => {
    const updatedInvoices = invoices.map(inv => {
      if (inv.invoiceNo === invoiceNo) {
        // deduct outstanding
        const updatedUser = { ...user, outstanding: Math.max(0, user.outstanding - inv.amount) };
        setUser(updatedUser);
        saveToStorage('jtc_user', updatedUser);
        return { ...inv, status: "Paid" };
      }
      return inv;
    });
    setInvoices(updatedInvoices);
    saveToStorage('jtc_invoices', updatedInvoices);
  };

  const resetDatabase = async () => {
    await AsyncStorage.removeItem('jtc_products');
    await AsyncStorage.removeItem('jtc_orders');
    await AsyncStorage.removeItem('jtc_invoices');
    await AsyncStorage.removeItem('jtc_user');
    setProducts(initialProducts);
    setOrders(initialOrders);
    setInvoices(initialInvoices);
    setCart([]);
    setUser({
      code: "JTCDE0245",
      name: "Sharma Electricals",
      owner: "Dev Sharma",
      phone: "9876543210",
      email: "sharma@example.com",
      address: "123 Main St, Industrial Area, Kanpur, UP",
      gstin: "09ABCDE1234F1Z5",
      creditLimit: 500000.00,
      outstanding: 124560.00,
      city: "Kanpur"
    });
  };

  return (
    <StateContext.Provider value={{
      products,
      orders,
      invoices,
      cart,
      user,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      placeOrder,
      payInvoice,
      resetDatabase,
      setUser
    }}>
      {children}
    </StateContext.Provider>
  );
};
