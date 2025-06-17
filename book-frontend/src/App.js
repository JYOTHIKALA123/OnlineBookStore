import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import MyOrders from './components/MyOrder';
import Navbar from './components/Navbar';
import AddBook from './components/AddBook';
import AdminBookList from './components/AdminBookList';
import AdminOrders from './components/AdminOrders';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <>
      <Navbar /> {/* Navbar outside Routes */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin/add-book" element={<AddBook/>}/>
        <Route path="/admin/book-list"element={<AdminBookList/>}/>
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route 
          path="/customerdashboard"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
          
      
      </Routes>
    </>
  );
}

export default App;
