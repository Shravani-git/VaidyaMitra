import React from "react";
import Header from "../componenets/Header/Header";
import Footer from "../componenets/Footer/Footer";

import Routers from "../routes/Routers";
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
