import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)   // productList is a reducer
  const { loading, error, products } = productList 
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  
  return (
    <div style={{background: '', color: 'green'}}>
      <h1>Latest Products</h1>
      { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      }
      
    </div>
  )
}
export default HomeScreen