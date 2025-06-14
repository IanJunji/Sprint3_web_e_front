import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Sobre from "./components/sobre";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Contato from "./components/Contato";
import Form from "./components/Form";

function MainLayout() {
  return (
    <>
      <Header />
      <Sobre />
      <Banner />
      <Contato />
      <Form />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
