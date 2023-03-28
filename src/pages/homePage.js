import DisplayComponent from '../components/DisplayComponent/Display'
import ServicesComponent from '../components/ServicesComponent/Services'
import AddToCartComponent from '../components/AddToCartComponent/AddToCart'
import { useState } from 'react';
import { Icon } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function HomePage() {

  const [activeButton, setActiveButton] = useState('display');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  let content = null;

  switch (activeButton) {
    case 'display':
      content = <DisplayComponent />;
      break;
    case 'services':
      content = <ServicesComponent />;
      break;
    case 'add-to-cart':
      content = <AddToCartComponent />;
      break;
    default:
      content = null;
  }


  
  return (
    <div className='div-services'>
      <div className='btn-services-container'>
        <button className='btn-services' onClick={() => handleButtonClick('display')}>Display</button>
        <button className='btn-services' onClick={() => handleButtonClick('services')}>Services</button>
        <Icon className='btn-service' onClick={() => handleButtonClick('add-to-cart')} >
          <ShoppingCartIcon />
        </Icon>
      </div>
      <div className='content-container'>
      {content}
      </div>
    </div>
  );
  
}

export default HomePage
