import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
  const { id } = useParams();
  const orderId = id;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    userInfo,
    navigate,
  ]);
  let TotalPrice = 1.5;
  const payNowHandlerforadmin = async (total_price) => {
    const paymentdata = {
      email: order.user.email,
      account_number: order.user.account_number,
      amount: total_price,
      receiver_account_number: '111423192491172311192292132523',
    };
    TotalPrice = total_price;
    try {
      const bank_api_call = axios.post(
        `http://127.0.0.1:7000/bankapi/payment/`,
        paymentdata
      );
      bank_api_call.then(function (result) {
        const DataReceivedFromBankApi = {
          id: result.data.id,
          status: result.data.status,
          email: result.data.email,
          update_time: result.data.update_time,
        };
        dispatch(payOrder(orderId, DataReceivedFromBankApi));
      });
    } catch (error) {}
  };

  const payNowHandlerforseller = async (total_price) => {
    const paymentdata = {
      email: order.user.email,
      account_number: order.user.account_number,
      amount: total_price,
      receiver_account_number: '293126262219152891172311192292132523',
    };
    try {
      const bank_api_call = axios.post(
        `http://127.0.0.1:7000/bankapi/payment/`,
        paymentdata
      );
      bank_api_call.then(function (result) {
        const DataReceivedFromBankApi = {
          id: result.data.id,
          status: result.data.status,
          email: result.data.email,
          update_time: result.data.update_time,
        };
        dispatch(payOrder(orderId, DataReceivedFromBankApi));
      });
    } catch (error) {}
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // seller to accept the order
  //{
  
  const [sellerOrder, setSellerOrder ] = useState();
  useEffect(()=>{
    try{
      const fetchData = async()=>{
        if (typeof order !== 'undefined' && order !== null) {
          const {sellerEcomID} = order;
          const {data} = await axios.get(`http://127.0.0.1:8000/api/orders/${sellerEcomID}`);
          const {isPaid} = data;
          setSellerOrder(data);
        }
      }
      fetchData();
    } catch(error){
      console.log(error);
    }

  },[order]);





  //}





  return loading || !sellerOrder || sellerOrder === undefined? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='light_green'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='light_green'>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='light_green'>
              <h2>Transaction Information</h2>
              {order.isPaid ? (
                <Message variant='success'>
                  Transaction Id: {order.paymentResult.id}
                </Message>
              ) : (
                <Message variant='danger'>Please do the transacton</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='light_green'>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className='light_green'>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} className='white'>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ৳{item.price * 1.1} = ৳
                          {item.qty * item.price * 1.1}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='light_green'>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className='light_green'>
                <Row>
                  <Col>Items</Col>
                  <Col>৳{order.itemsPrice * 1.1}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='light_green'>
                <Row>
                  <Col>Shipping</Col>
                  <Col>৳{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='light_green'>
                <Row>
                  <Col>Tax</Col>
                  <Col>৳{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='light_green'>
                <Row>
                  <Col>Total</Col>
                  <Col>৳{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {!order.isPaid && (
              <ListGroup.Item className='light_green'>
                {loadingPay && <Loader />}
                &nbsp; &nbsp; <Button
                  type='button'
                  className='btn-block'
                  onClick={() => {
                    payNowHandlerforadmin(
                      order.itemsPrice * 0.1 + order.taxPrice
                    );
                    payNowHandlerforseller(order.itemsPrice);
                  }}
                  disabled={sellerOrder[0].isPaid === false||sellerOrder[0].totalPrice===-1}
                >
                  {sellerOrder[0].totalPrice===-1?'Order Rejected':(sellerOrder[0].isPaid===true?'Pay Now':'waiting for seller to accept the order')}
               </Button>
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroupItem className='light_green'>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
