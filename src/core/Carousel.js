import React from "react";
import { Carousel, Container } from "react-bootstrap";

const ControlledCarousel = () => {

  return (
    <Container>
      <Carousel variant="dark">
      <Carousel.Item>
        <img
        style={{maxWidth: '100%', maxHeight: 600, border: 'none'}}
          className="img-fluid d-block w-100"
          src="https://storage.googleapis.com/shopdunk-images/tintucshopdunknew/2019/08/560ea4fc-iphone-va-macbook.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="text-xs-center text-lg-center">
        <img
        style={{maxWidth: '100%', maxHeight: 600, border: 'none'}}
          className="img-thumbnail"
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/graphicstock-mix-of-office-supplies-and-gadgets-on-a-wooden-desk-background-view-from-above_S0XWNH6bZ_SB_PM.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{maxWidth: '100%', maxHeight: 600, border: 'none'}}
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/1808558.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}

export default ControlledCarousel;