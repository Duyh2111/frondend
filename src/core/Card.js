import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Card, Row, Col, Button } from "react-bootstrap";
const CardProduct = ({
  product,
  seeDetail = true,
  quantity = false,
  RemoveButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const seeDetailButton = (seeDetail) => {
    return (
      seeDetail && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <Button variant="outline-secondary" style={{ borderRadius: "5px" }}>
            See detail
          </Button>
        </Link>
      )
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

  const showAddToCart = ( countInStock) => {
    return (
      countInStock > 0 ? (
        <Button
          onClick={addToCart}
          style={{ borderRadius: "5px" }}
          variant="outline-warning"
        >
          Add to cart
        </Button>
      ) : (
        <div></div>
      )
    );
  };

  const showStock = (countInStock) => {
    return countInStock > 0 ? (
      <h6 className="font-weight-bold text-warning">In Stock </h6>
    ) : (
      <h6 className="font-weight-bold text-danger">Out of Stock </h6>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); 
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const Quantity = (quantity) => {
    return (
      quantity && (
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
  const showRemoveButton = (RemoveButton) => {
    return (
      RemoveButton && (
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
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: "100% " }}
          >
            {product.description}
          </span>
          <Row>
            <Col xs={6}>{showStock(product.countInStock)}</Col>
            <Col xs={6} className="text-right">
              <h6 className="font-italic">${product.price} </h6>
            </Col>
          </Row>
         
        </Card.Text>
        <Row>
          <Col xs={6}>{seeDetailButton(seeDetail)}</Col>
          <Col xs={6} className="text-right">
            {showAddToCart(product.countInStock)}
          </Col>
        </Row>
        {showRemoveButton(RemoveButton)}
        {Quantity(quantity)}
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
