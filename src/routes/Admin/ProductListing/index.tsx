import './styles.css';

import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import { useEffect, useState } from 'react';
import * as productService from '../../../services/product-service';
import { ProductDTO } from '../../../models/product';
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';

type QueryParams = {
 page: number,
 name: string
}

export default function ProductListing(){

  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: ""
  });

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [isLastPage, setIsLastPage] = useState(false);

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Operação com sucesso!"
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem certeza?"
  });

  useEffect(() => {
     productService.findPageRequest(queryParams.page, queryParams.name)
     .then(response => {
         const newPage = response.data.content;
         setProducts(products?.concat(newPage));
         setIsLastPage(response.data.last);
        })
  }, [queryParams]);

  function handleNewProductClick(){
    navigate("/admin/products/create");
  }

  function handleSearch(searchText: string) {
     setProducts([]);
     setQueryParams({...queryParams, name: searchText, page: 0});
  }

  function handleNextPageClick(){
    setQueryParams({...queryParams, page: queryParams.page + 1});
  }

  function handleCloseDialog(){
    setDialogInfoData({ ...dialogInfoData, visible: false});
  }

  function handleDeleteClick(productId: number){
    setDialogConfirmationData({ ...dialogConfirmationData, id: productId, visible: true});
    console.log("Id do Produto: " + productId);
  }

  function handleDialogConfirmationAnswer(result: boolean, productId: number){
    if(result === true){
      productService.deleteById(productId).then(() => {
        setProducts([]);
        setQueryParams({...queryParams, page: 0});
      }).catch(error => {
        setDialogInfoData({...dialogInfoData, visible: true, message: error.response.data.error});
      })

    }

    setDialogConfirmationData({...dialogConfirmationData, visible: false});
  }


    return(
        <main>
        <section id="product-listing-section" className="dsc-container">
          <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>
  
          <div className="dsc-btn-page-container dsc-mb20">
            <div onClick={handleNewProductClick}>
            <ButtonInverse text='Novo' />
            </div>
          </div>
  
        <SearchBar onSearch={handleSearch} />
  
          <table className="dsc-table dsc-mb20 dsc-mt20">
            <thead>
              <tr>
                <th className="dsc-tb576">ID</th>
                <th></th>
                <th className="dsc-tb768">Preço</th>
                <th className="dsc-txt-left">Nome</th>
                <th></th>
                <th></th>  
              </tr>
            </thead>
            <tbody>
              {
                products.map(x => (
                  <tr key={x.id}>
                  <td className="dsc-tb576">{x.id}</td>
                  <td><img className="dsc-product-listing-image" src={x.imgUrl} alt={x.name} /></td>
                  <td className="dsc-tb768">R$ {x.price.toFixed(2)}</td>
                  <td className="dsc-txt-left">{x.name}</td>
                  <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                  <td><img onClick={() => handleDeleteClick(x.id)} className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                </tr>
                ))
              }
            
            </tbody>
          </table>
          
          {
            !isLastPage
            &&
              <ButtonNextPage onNextPage={handleNextPageClick} />
          }
          
        </section>
        {
          dialogInfoData.visible
          &&
          <DialogInfo message={dialogInfoData.message} onDialogClose={handleCloseDialog} />
        }
        {
          dialogConfirmationData.visible
          &&
          <DialogConfirmation message={dialogConfirmationData.message} id={dialogConfirmationData.id}  onDialogAnswer={handleDialogConfirmationAnswer} />
        }
      </main>
    );
}