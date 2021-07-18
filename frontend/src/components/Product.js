import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <Link to={`/product/${product._id}`}>
    <div className="frmBox">
    <div key={product._id} >
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/product/${product._id}`}>
              {product.seller.seller.name}
              {console.log("seller check",product.seller)}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Link>
  );
}
