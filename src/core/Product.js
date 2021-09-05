import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import CardProduct from "./Card";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";
import { Card, ListGroup, Row, Col, Container } from "react-bootstrap";
// import { Container, Carousel, Col,Row, Button } from "react-bootstrap";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <p className="font-weight-bold text-warning">In Stock </p>
    ) : (
      <p className="font-weight-bold text-danger">Out of Stock </p>
    );
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout>
      <Card style={{ marginBottom: "2rem", border: "none" }}>
        <div className="row" style={{ marginTop: 40 }}>
          <div className="col-4">
            <ShowImage item={product} url="product" />
          </div>
          <div className="col-5 pr-20" style={{ paddingRight: 70 }}>
            <h4 className="font-weight-bold">{product.name}</h4>
            <h5>Category: {product.category && product.category.name}</h5>
            <p>{product.description}</p>
          </div>
          <div className="col-3" style={{ paddingRight: 40 }}>
            <Card>
              <Container>
                <Card.Header className="text-center mt-3 font-weight-bold">
                  {product.name}
                </Card.Header>
                <Card.Body variant="flush">
                  <Card.Text>
                    <Row>
                      <Col xs={6}>Price:</Col>
                      <Col xs={6}>
                        <h5>${product.price} </h5>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <Col xs={6}>Status: </Col>
                      <Col xs={6}>
                        <h5>{showStock(product.quantity)}</h5>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Container>
            </Card>
          </div>
        </div>
      </Card>

      <Card style={{ border: "none" }}>
        <Container>
          <h4 style={{ marginTop: 20, marginBottom: 20 }}>Related products</h4>
          <div className="row">
            {relatedProduct.map((p, i) => (
              <div key={i} className="col-3 mb-3">
                <CardProduct product={p} />
              </div>
            ))}
          </div>
        </Container>
      </Card>
    </Layout>
  );
};

export default Product;
