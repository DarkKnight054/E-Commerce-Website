import axios from 'axios';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Order from '../components/Order';
const CartScreen = () => {
  
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList); // productList is a reducer
  const { loading, error, orders } = orderList;
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  const acceptOrder = async(order1)=>{
    try{
      const order = await axios.post(`http://127.0.0.1:8000/api/orders/${order1._id}/accept`);
      dispatch(listOrders());
    }
    catch(error){
      console.log(error);
    }
  }
  const rejectOrder = async(order1)=>{
    const order = await axios.post(`http://127.0.0.1:8000/api/orders/${order1._id}/reject`);
    dispatch(listOrders());

  }
  const updatedOrder = []
  for(let x in orders)
  {
    let order = orders[x];
    if(order['isPaid']===false&&order['totalPrice']!==-1)updatedOrder.push(order);
  }
  return (
    <>
      <h1>Pending Orders...</h1>
      {loading?(
        <Loader/>
      ): error?(
        <Message variant='danger'>{error}</Message>
      ):(
        <Row>
          {updatedOrder.map((order)=>(
              <Col md={8} style={{marginBottom: '50px'}}>
                <Order Order={order} acceptOrder={acceptOrder} rejectOrder={rejectOrder}/>
              </Col>
          ))}
        </Row>
      )
      }
    </>
  );
};
export default CartScreen;
