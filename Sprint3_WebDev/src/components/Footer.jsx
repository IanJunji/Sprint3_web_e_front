import { Container, Row, Col } from "react-bootstrap";
import scroll from "./scrollToSection";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          {/* First Column - STOCAM */}
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h3>STOCAM</h3>
            <p>Transformando o futuro do controle de estoque</p>
          </Col>

          {/* Second Column - Links Úteis */}
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h4>Links Úteis</h4>
            <div className="links-container">
              <a
                href="#sobre"
                onClick={(e) => scroll.scrollToSection(e, "sobre")}
              >
                Sobre
              </a>
              <a
                href="#banner"
                onClick={(e) => scroll.scrollToSection(e, "banner")}
              >
                Benefícios
              </a>
              <a
                href="#contato"
                onClick={(e) => scroll.scrollToSection(e, "contato")}
              >
                Contato
              </a>
            </div>
          </Col>

          {/* Third Column - Contato */}
          <Col md={4} className="footer-section">
            <h4>Contato</h4>
            <p>
              <i className="bi bi-envelope me-2"></i>contato@stocam.com
            </p>
            <p>
              <i className="bi bi-telephone me-2"></i>(11) 1234-5678
            </p>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} STOCAM. Todos os direitos
              reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
