import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionsAndAnswers from "./components/QuestionsAndAnswers/QuestionsAndAnswers";
import Overview from "./components/Overview";
import ReviewsRatings from "./components/Reviews-Ratings";
import { List } from "./components/Related/List";
import initial from "./PlaceHolderData.js";
import Navbar from "./components/NavbarFooter/Navbar";
import Footer from "./components/NavbarFooter/Footer";
import Confetti from "react-confetti";
import { OutfitList } from "./components/Related/OutfitList";

function App() {
  /*
  ===== STATES AND STATE CHANGERS =====
  */
  // states passed to multiple components
  const [product, setProduct] = useState(initial.product);
  const [reviewsMeta, setReviewsMeta] = useState(initial.reviewsMeta);
  const [confetti, setConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const updProduct = async (id) => {
    const newProduct = await axios.get(`/products/${id}`);
    return newProduct;
  };

  const updReviewsMeta = async () => {
    // const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}
    const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}`);
    return newReviewsMeta;
  };

  /*
  ====== FUNCTIONALITY =====
  */

  // update reviewsMeta every time product changes
  useEffect(() => {
    updReviewsMeta()
      .then((reviewsMetaUpd) => setReviewsMeta(reviewsMetaUpd.data))
      .catch((err) => console.error(err));
  }, [product]);

  // does what the name implies
  const handleWindowResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.onresize = () => handleWindowResize();

  // search bar
  const changeSearch = (productId) => {
    updProduct(productId).then((results) => setProduct(results.data));

    document.getElementById("nav-search-bar").value = "";
  };

  window.onresize = () => handleWindowResize();
  // set confetti to run for a specified time
  useEffect(() => {
    confetti &&
      setTimeout(() => {
        setConfetti(false);
      }, 8000);
  }, [confetti]);

  /*
  TODOS:
  - onSearchProduct fn that updates product
  */

  // TESTING TESTING
  // useEffect(() => {
  //   console.log({
  //     "reviews meta data": reviewsMeta,
  //     "current product": product,
  //   });
  // }, [reviewsMeta]);

  const [numInCart, setNumInCart] = useState(0);

  // changed order of components
  if (reviewsMeta) {
    return (
      <div id="the-main-app-container">
        {confetti ? (
          <Confetti width={windowSize.width} height={windowSize.height} />
        ) : null}
        <Navbar changeSearch={changeSearch} numInCart={numInCart} />
        {/* <Overview
          product={product}
          reviewsMeta={reviewsMeta}
          setConfetti={setConfetti}
          setNumInCart={setNumInCart}
          windowSize={windowSize}
        />
        <List
          currentProduct={product}
          updateCurrentProduct={updProduct}
          setCurrentProduct={setProduct}
        />
        <QuestionsAndAnswers
          currProductId={product.id}
          currProductName={product.name}
        /> */}
        <ReviewsRatings
          reviewsMeta={reviewsMeta}
          currProductId={product.id}
          currProductName={product.name}
          initReviews={initial.reviews}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
