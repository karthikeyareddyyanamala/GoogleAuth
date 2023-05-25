import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../ContextApi/authLogin";
import { auth } from "../ContextApi/authLogin";
import { loadStripe } from '@stripe/stripe-js';
import cryptoRandomString from 'crypto-random-string';
function PaymentGateway() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const currentUser = auth.currentUser;
  

  
  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuerySnapshot = await getDocs(
        query(collection(db, "products"), where("active", "==", true))
      );

      const productList = await Promise.all(
        productsQuerySnapshot.docs.map(async (doc) => {
          console.log(doc.id, " => ", doc.data());
          const pricesQuerySnapshot = await getDocs(collection(doc.ref, "prices"));
          let priceData = null;
          pricesQuerySnapshot.forEach((priceDoc) => {
            console.log(priceDoc.id, " => ", priceDoc.data());
            priceData = { ...priceDoc.data(), id: priceDoc.id };
          });

          // Return the product data along with the id and price data
          return { ...doc.data(), id: doc.id, price: priceData };
        })
      );

      setProducts(productList);

      console.log(productList); // Check the fetched data here
    };

    fetchProducts();
  }, []);

  console.log(products);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    console.log(e.target.value);
  };

  const renderProductData = () => {
    if (selectedProduct) {
      const selectedProductData = products.find(
        (product) => product.name === selectedProduct
      );

      
      const loadCheckout = async (priceId) => {
        const docRef = await addDoc(
          collection(db, "customers", currentUser.uid, "checkout_sessions"),
          {
            mode: "payment",
            price: priceId, // One-time price created in Stripe
            payment_method_types: ["card"],
            currency: "INR", // Currency of the price, e.g., USD, EUR, GBP, etc.
            success_url: window.location.origin,
            cancel_url: window.location.origin,
          }
        );
     
      
      
        
        const docId = docRef.id;



// Listen for changes to the checkout session document
onSnapshot(doc(db, "customers", currentUser.uid, "checkout_sessions", docId), (doc) => {
  const checkoutSession = doc.data();
  if (checkoutSession.sessionId) {
    loadStripe('pk_live_51MwQZkSJKJSknqiQsLQVNtfs2cWOdeUH7RPGtX2cX4MGE5x8sf5sTNWXD2xknJZjRzu8SL6kRU2e9LZJXHBEOW0J00KhQdgfNj').then((stripe) => {
      stripe.redirectToCheckout({ sessionId: checkoutSession.sessionId })
     
      
    });
  }
});


      };
      

      return (
        <>
          <h2>Product Name: {selectedProductData.name}</h2>
          <h2>
            Price: {selectedProductData.price.unit_amount / 100}{" "}
            {/* Divide by 100 to convert from cents to dollars */}

          </h2>
         
          <button onClick={()=>loadCheckout(selectedProductData.price.id)}>Checkout</button>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div>
        <h1>Select a Product:</h1>
        <select onChange={handleProductChange}>
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        {renderProductData()}
      </div>
    </>
  );
}

export default PaymentGateway;
