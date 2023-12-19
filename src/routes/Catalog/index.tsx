import './styles.css';
import HeaderClient from "../../components/HeaderClient";
import SearchBar from '../../components/SearchBar';
import ButtonNextPage from '../../components/ButtonNextPage';
import CatalogCard from '../../components/CatalogCard';
import { ProductDTO } from '../../models/product';

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

export default function Catalog() {
  return(
     <>
     <HeaderClient />
     <main>
      <section id="catalog-section" className="dsc-container">
       <SearchBar />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
         <CatalogCard product={product} />
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
         <CatalogCard product={product} /> 
        </div>
        <ButtonNextPage />
       </section>
      </main>
     </>
  );
}