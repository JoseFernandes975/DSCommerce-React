import './styles.css';
import HeaderClient from "../../components/HeaderClient";
import SearchBar from '../../components/SearchBar';
import ButtonNextPage from '../../components/ButtonNextPage';
import CatalogCard from '../../components/CatalogCard';

export default function Catalog() {
  return(
     <>
     <HeaderClient />
     <main>
      <section id="catalog-section" className="dsc-container">
       <SearchBar />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
         <CatalogCard />
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
         <CatalogCard /> 
        </div>
        <ButtonNextPage />
       </section>
      </main>
     </>
  );
}