import React from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';


export default function Order({Order, acceptOrder, rejectOrder}){
    const {shippingAddress, orderItems} = Order;
    return(
        <>
            {orderItems.map((order)=>(
                <Card>
                <Card.Header>Order Information</Card.Header>
                <Card.Body>
                  <ListGroup>
                    <div style={{display: 'flex', paddingBottom: '10px'}}>
                      <ListGroupItem style={{width: '180px', background: 'black', color: 'white'}}>Product Name </ListGroupItem>
                      <ListGroupItem style={{width: '600px', borderBlockColor: 'black'}}>{order.name}</ListGroupItem>
                    </div>
                    <div style={{display: 'flex', paddingBottom: '10px'}}>
                      <ListGroupItem style={{width: '180px', background: 'black', color: 'white'}}>Product Quantity </ListGroupItem>
                      <ListGroupItem style={{width: '600px', borderBlockColor: 'black'}}>{order.qty}</ListGroupItem>
                    </div>
                    <div style={{display: 'flex', paddingBottom: '10px'}}>
                      <ListGroupItem style={{width: '180px', background: 'black', color: 'white'}}>Price </ListGroupItem>
                      <ListGroupItem style={{width: '600px', borderBlockColor: 'black'}}>{order.qty} * {order.price} = {order.qty*order.price}</ListGroupItem>
                    </div>
                    <div style={{display: 'flex', paddingBottom: '25px'}}>
                      <ListGroupItem style={{width: '180px', background: 'black', color: 'white'}}>Shipping Address </ListGroupItem>
                      <ListGroupItem style={{width: '600px', borderBlockColor: 'black'}}>{shippingAddress.address},{shippingAddress.city}-{shippingAddress.postalCode},{shippingAddress.country}</ListGroupItem>
                    </div>
                    <div style={{display: 'flex'}}>
                      <ListGroupItem style={{width: '180px'}} variant='success' as='button' onClick={()=>acceptOrder(Order)}>Accept Order</ListGroupItem>
                      <div style={{width: '30px'}} />
                      <ListGroupItem style={{width: '180px'}} variant='danger' as='button' onClick={()=>rejectOrder(Order)}>Reject Order</ListGroupItem>
                    </div>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
        </>
    );
}