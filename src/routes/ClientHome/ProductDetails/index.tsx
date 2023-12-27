import './styles.css';
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { ProductDTO } from '../../../models/product';

const product: ProductDTO = {
    id: 2,
    name: "Smart TV",
    description: "Com tela 4k resolução absurda, 40 polegadas para a familia assistir com conforto, tem em sua tecnologia também o Smart com Youtube e diverso aplicativos e canais!",
    price: 2550.99,
    imgUrl: "https://github.com/devsuperior/dscatalog-resources/blob/master/backend/img/2-big.jpg?raw=true",
    categories: [
      {
        id: 2,
        name: "Eletrônicos"
      },
      {
        id: 3,
        name: "Computadores"
      },
      {
        id: 4,
        name: "Smarts"
      }
    ]
}

export default function ProductDetails(){
    return(
    <main>
    <section id="product-details-section" className="dsc-container">
      <ProductDetailsCard product={product}  />
        <div className="dsc-btn-page-container">
            <ButtonPrimary text='Comprar' />
            <ButtonInverse text='Início' />
        </div>
      </section>
    </main>
    );
}