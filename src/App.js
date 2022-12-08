import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Footer from './components/Footer/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { Toaster } from 'react-hot-toast';
import { useUserContext } from './context/UserProvider';
import Basket from './pages/Basket/Basket';
import CartCheckout from './pages/CartCheckout/CartCheckout';
import PageNotFound from './pages/PageNotFound/PageNotFound';
function App() {

  const { user } = useUserContext();
  

  return (
    <Router>
      <Toaster position='right-top' />
      <Header />

      <div>
        <Routes>
          <Route path='/' exact element={<Products />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:product_id' element={<ProductDetail />} />
          <Route path='/login' element={!user ? <Login /> : <Products /> } />
          <Route path='/register' element={!user ? <Register /> : <Products /> } />
          <Route path='/basket' element={<Basket />} />
          <Route path='/basket/checkout' element={!user ? <Login /> : <CartCheckout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
