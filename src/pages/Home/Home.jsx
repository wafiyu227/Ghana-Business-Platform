import Header from "../../components/common/Header";
import Hero from "./Hero";
import SearchComponent from "../../components/common/SearchComponent";
import Footer from "../../components/common/Footer";
import React from "react";
import FeaturedBusinesses from "./FeaturedBusinesses";
import BrowseByCategory from './BrowseByCategory'

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SearchComponent />
      <FeaturedBusinesses />
      <BrowseByCategory />
      <Footer />
    </>
  );
}
export default Home;
