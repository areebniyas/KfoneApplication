import DisplayComponent from '../components/DisplayComponent/Display'
import ServicesComponent from '../components/ServicesComponent/Services'
import AddToCartComponent from '../components/AddToCartComponent/AddToCart'

function HomePage() {

  const [activeButton, setActiveButton] = useState('display');

  
  return (
    <div>
      <h1>Welcome</h1>
      <DisplayComponent />
      <ServicesComponent />
      <AddToCartComponent />
    </div>
  )
}

export default HomePage
