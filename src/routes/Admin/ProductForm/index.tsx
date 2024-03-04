/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as productServices from '../../../services/product-service';
import FormTextArea from '../../../components/FormTextArea';
import Select from 'react-select';
import { CategoryDTO } from '../../../models/category';
import * as categoryService from '../../../services/category-service';

export default function ProductForm(){

  const params = useParams();
  
  const isEditing = params.productId !== 'create';

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function(value: string){
        return /^.{3,80}/.test(value);
      }, 
      message: "Favor informar um nome de 3 a 80 caracteres"
    },
    price: {
      value: "",
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
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function(value: string){
        return /^.{10,}/.test(value);
      }, 
      message: "Favor informar uma descrição de pelo menos 10 caracteres"
    }
  });

  function handleInputChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    const result = forms.updateAndValidate(formData, name, value);

    setFormData(result);
  }

  function handleTurnDirty(name: string){
    const newFormData = forms.dirtyAndValidate(formData, name);  
    setFormData(newFormData);
  }

  useEffect(() => {
    categoryService.findAllRequest().then(response => {
      setCategories(response.data);
    }).catch(error => {
      console.log("Erro em buscar categorias" + error);
    });
  }, [])

  useEffect(() => {
    if(isEditing){
      productServices.findById(Number(params.productId)).then(response => {
        const newFormData = forms.updateAll(formData, response.data);
        setFormData(newFormData);
      });
    }
  }, []);

  const options = [
    { value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ]

    return(
      <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput { ...formData.name } className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty}  />
                <div className='dsc-form-error'>{formData.name.message}</div>
              </div>
              <div>
              <FormInput { ...formData.price } className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
              <div className='dsc-form-error'>{formData.price.message}</div>
              </div>
              <div>
              <FormInput { ...formData.imgUrl } className="dsc-form-control" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
              </div>
              <div>
               <Select options={categories} isMulti getOptionLabel={(obj) => obj.name} getOptionValue={(obj) => String(obj.id)} />
              </div>
              <div>
                <FormTextArea { ...formData.description} className="dsc-form-control dsc-textarea" onChange={handleInputChange} onTurnDirty={handleTurnDirty} />
                <div className='dsc-form-error'>{formData.description.message}</div>
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