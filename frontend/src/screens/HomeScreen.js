import React, { useEffect,useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link ,useParams} from 'react-router-dom';

export default function HomeScreen() {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  let arr=[1,2,3,4,5]
  const [length,setlength]=useState(0)
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div className="container"  >
      <div style={{marginTop:""}}>
      <Carousel  autoPlay showThumbs={false}>
        <div>
          <img src="img1.jpg" style={{height:"150px"}}></img>
        </div>
        <div>
          <img src="img2.jpg" style={{height:"150px"}}></img>
        </div>
        <div>
          <img src="img3.gif" style={{height:"150px"}}></img>
        </div>
        <div>
          <img src="img4.jpg" style={{height:"150px"}}></img>
        </div>
        <div>
          <img src="img5.png" style={{height:"150px"}}></img>
        </div>
      </Carousel>
      </div>
      <div className="seltQtn">
      <h1 className="pageTitle">Featured Products</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div style={{marginTop:"4rem"}}>
      <Carousel  autoPlay showThumbs={false}>
          
            {products.map((product) => (
              <div>
              <Product key={product._id} product={product}></Product>
              </div>
            ))}
          
          </Carousel>
          </div>
        </>
      )}
      </div>
      <h1 className="pageTitle">Categories</h1>
      <div className="seln">
        
        <div className="container">

     
      {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <>
                <div className="seltQtn">
                <h1 key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    //onClick={() => setSidebarIsOpen(false)}
                  >
                    <h3 className="cat">{c}</h3>
                  </Link>
                </h1>
                
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (  
                  <>
                  
                  {console.log("products",product)}
                  {product.category===c &&
                  
                  <Product key={product._id} product={product}></Product>
                  
                  }
                  

                  </>
                ))}
                
                
              </div>
              <div className="row center pagination">
              <Link
                      className="backBtn"
                      to={getFilterUrl({ category: c })}
                    >
                      View More
                    </Link>
              </div>
              {/* <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div> */}
            </>
          )}
        </div>
        
                </>
              ))
            )}
            </div>
             </div>
    </div>
  );
}
