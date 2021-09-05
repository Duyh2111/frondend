import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Card, Row, Col, Button } from "react-bootstrap";
const CardProduct = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <Button variant="outline-secondary" style={{ borderRadius: "5px" }}>
            See detail
          </Button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          onClick={addToCart}
          style={{ borderRadius: "5px" }}
          variant="outline-warning"
        >
          Add to cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <p className="font-weight-bold text-warning">In Stock </p>
    ) : (
      <p className="font-weight-bold text-danger">Out of Stock </p>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <Card
      className="shadow p-3 bg-white"
      style={{ border: "none", borderRadius: "8px" }}
    >
      <Card.Body>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <Card.Title className="font-weight-bold">{product.name}</Card.Title>
        <Card.Text>
          Category: {product.category && product.category.name}
          <br />
          <p className="d-inline-block text-truncate" style={{ maxWidth: '100% '}}>
            {product.description}
          </p>
          <Row>
            <Col xs={6}>{showStock(product.quantity)}</Col>
            <Col xs={6} className="text-right">
              <h5>${product.price} </h5>
            </Col>
          </Row>
          <p className="font-italic font-weight-light">
            Added on {moment(product.createdAt).fromNow()}
          </p>
        </Card.Text>
        <Row>
          <Col xs={6}>{showViewButton(showViewProductButton)}</Col>
          <Col xs={6} className="text-right">
            {showAddToCartBtn(showAddToCartButton)}
          </Col>
        </Row>

        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
