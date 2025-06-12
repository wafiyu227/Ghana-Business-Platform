import Header from "../../components/common/Header";
import Hero from "./Hero";
import SearchComponent from "../../components/common/SearchComponent";
import Footer from "../../components/common/Footer";
import React from "react";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SearchComponent />
      <Footer />
    </>
  );
}
export default Home;
