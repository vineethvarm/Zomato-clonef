
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SlideBar from '../components/SlideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Greetings from '../components/greetings';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmHeading, setShowFirmHeading] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    const restaurantName = localStorage.getItem('restaurantName');

    if (loginToken) setShowLogOut(true);
    if (restaurantName) setShowFirmHeading(false);
  }, []);

  const logOutHandler = useCallback(() => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('restaurantName');

      setShowLogOut(false);
      setShowFirmHeading(true);
      setActiveComponent(null);
    }
  }, []);

  const changeComponent = useCallback((component) => {
    setActiveComponent(component);
  }, []);

  return (
    <section className='landingSection'>
      <Navbar 
        showLoginHandler={() => changeComponent('login')} 
        showRegisterHandler={() => changeComponent('register')}
        showLogOut={showLogOut}
        logOutHandler={logOutHandler}
      />
      <div className="cardcontainer">
        <SlideBar 
          showFirmHandler={() => changeComponent('firm')}
          showProductHandler={() => changeComponent('product')}
          showAllProductsHandler={() => changeComponent('allProducts')}
          showFirmHeading={showFirmHeading}
        />

        {activeComponent === 'login' && <Login showGreetingsHandler={() => changeComponent('greetings')} />}
        {activeComponent === 'register' && <Register showLoginHandler={() => changeComponent('login')} />}
        {activeComponent === 'firm' && <AddFirm />}
        {activeComponent === 'product' && <AddProduct />}
        {activeComponent === 'greetings' && <Greetings />}
        {activeComponent === 'allProducts' && <AllProducts />}
      </div>
    </section>
  );
};

export default LandingPage;
