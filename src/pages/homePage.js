import DisplayComponent from '../components/DisplayComponent/Display'
import ServicesComponent from '../components/ServicesComponent/Services'
import AddToCartComponent from '../components/AddToCartComponent/AddToCart'
import { useState } from 'react';

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
    <div>
      <h1>My Page</h1>
      <button onClick={() => handleButtonClick('display')}>Display</button>
      <button onClick={() => handleButtonClick('services')}>Services</button>
      <button onClick={() => handleButtonClick('add-to-cart')}>Add to Cart</button>
      {content}
    </div>
  );
  
}

export default HomePage
