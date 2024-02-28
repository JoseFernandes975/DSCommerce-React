/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as productServices from '../../../services/product-service';

export default function ProductForm(){

  const params = useParams();
  
  const isEditing = params.productId !== 'create';

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome"
    },
    price: {
      value: 0,
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function(value: any) {
        return Number(value) > 0;
      },
      message: "Informe um preço positivo"
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem"
    }
  });

  function handleInputChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    const formUpdate = forms.update(formData, name, value);
    const formValidate = forms.validate(formUpdate, name);
    setFormData(formValidate);
  }

  function handleTurnDirty(name: string){
    const newFormData = forms.toDirty(formData, name);  
    setFormData(newFormData);
  }

  useEffect(() => {

    const result = forms.toDirty(formData, "price");
    console.log(result);
   
   //const newObj = forms.validate(formData, "price");
   //console.log(newObj);

    if(isEditing){
      productServices.findById(Number(params.productId)).then(response => {
        const newFormData = forms.updateAll(formData, response.data);
        setFormData(newFormData);
      });
    }
  }, []);

    return(
      <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput { ...formData.name } className="dsc-form-control " onChange={handleInputChange} onTurnDirty={handleTurnDirty}  />
              </div>
              <div>
              <FormInput { ...formData.price } className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
              <div className='dsc-form-error'>{formData.price.message}</div>
              </div>
              <div>
              <FormInput { ...formData.imgUrl } className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
              </div>
              
            </div>

            <div className="dsc-product-form-buttons">
              <Link to='/admin/products'>
               <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
              </Link>
             
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
    );
}