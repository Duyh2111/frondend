import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, Redirect } from "react-router-dom";
import { read, listRelated } from "./apiCore";
import CardProduct from "./Card";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";
import { Card, Row, Col, Container, Button } from "react-bootstrap";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

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

  const showStock = (countInStock) => {
    return countInStock > 0 ? (
      <p className="font-weight-bold text-warning">In Stock </p>
    ) : (
      <p className="font-weight-bold text-danger">Out of Stock </p>
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (countInStock) => {
    return countInStock > 0 ? (
      <Button
        onClick={addToCart}
        style={{ borderRadius: "5px" }}
        variant="outline-warning"
      >
        Add to cart
      </Button>
    ) : (
      <div></div>
    );
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout>
      <Card style={{ marginBottom: "2rem", border: "none" }}>
        <Container
          className="row"
          style={{ paddingTop: 30, paddingBottom: 30 }}
        >
          <Row className="col-4">
            <ShowImage item={product} url="product" />
          </Row>
          <Row className="col-5 pr-20" style={{ paddingRight: 70 }}>
            <Card.Text>
              <h4 className="font-weight-bold">{product.name}</h4>
              <h5>Category: {product.category && product.category.name}</h5>
              <p>{product.description}</p>
              <span className="font-italic font-weight-light">
            Added on {moment(product.createdAt).fromNow()}
          </span>
            </Card.Text>
          </Row>
          <Row className="col-3" style={{ paddingRight: 40, marginBottom: 40 }}>
            <Card>
              <Card.Title
                className="text-center mt-3 font-weight-bold"
                style={{ paddingBottom: 15 }}
              >
                {product.name}
              </Card.Title>
              <Card.Text>
                <Row className="text-xs-center text-lg-center">
                  <Col xs={6}>Price:</Col>
                  <Col xs={6}>
                    <h5>${product.price} </h5>
                  </Col>
                </Row>
                <hr />
                <Row className="text-xs-center text-lg-center">
                  <Col xs={6}>Status: </Col>
                  <Col xs={6}>
                    <h5>{showStock(product.countInStock)}</h5>
                  </Col>
                </Row>
                {shouldRedirect(redirect)}
                <h1 className="text-center">
                  {showAddToCart(product.countInStock)}
                </h1>
              </Card.Text>
            </Card>
          </Row>
        </Container>
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
