import { StrictMode } from "react";
import Header from "./components/header";
import Sobre from "./components/sobre";
import Footer from "./components/Footer";
import Contato from "./components/contato";
import Form from "./components/form";
import Banner from "./components/banner";

function App() {
  return (
    <>
      <StrictMode>
        <Header />
        <Sobre />
        <Banner />
        <Contato />
        <Form />
        <Footer />
      </StrictMode>
    </>
  );
}

export default App;
