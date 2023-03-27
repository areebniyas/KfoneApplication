import Product from "./Product"
import productsData from "../../data/sample-devices.json"

function DisplayComponent() {
    return (
      <div className="display-container">
      {productsData.map((product) => (
        <div className="product-container">
        <Product key={product.Name} product={product} />
        </div>
      ))}
    </div>
    )
  }
  
export default DisplayComponent
  