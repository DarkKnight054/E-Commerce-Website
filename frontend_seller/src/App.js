import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

import OrderListScreen from './screens/OrderListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {/* Routes tells to choose just 1 best matched Route. Route order doesn't matter. */}
            {/* <Route path='/order/:id' element={<OrderScreen />} /> */}
            {/* <Route path='/shipping' element={<ShippingScreen />} /> */}
            {/* <Route path='/payment' element={<PaymentScreen />} /> */}
            {/* <Route path='/placeorder' element={<PlaceOrderScreen />} /> */}
            <Route path='/login' element={<LoginScreen />} />
            {/* <Route path='/register' element={<RegisterScreen />} /> */}
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/orders' element={<CartScreen />} />
            {/* <Route path='/cart/:id' element={<CartScreen />} /> */}
            <Route path='/seller/userList' element={<UserListScreen />} />
            <Route path='/seller/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/seller/productList' element={<ProductListScreen />} />
            <Route path='/seller/orderList' element={<OrderListScreen />} />
            <Route
              path='/seller/product/:id/edit'
              element={<ProductEditScreen />}
            />

            <Route exact path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
