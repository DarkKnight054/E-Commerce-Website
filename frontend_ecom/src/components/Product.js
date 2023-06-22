import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
// import '../index.css'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded bg-white border border-success'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body >
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' style={{color: 'rgb(23, 48'}}>
            <strong style={{color: 'black'}}>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='black'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' className='black'>৳{(product.price * 1.1).toFixed(3)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
