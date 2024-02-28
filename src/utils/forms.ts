export function update(inputs: any, name: string, newValue: any){
    return { ...inputs, [name]: { ...inputs[name] , value: newValue}};
}

//percorre os atributos do input, sendo que o nome do atributo adicione no data e para cada atributo 
//percorrido pega o valor dele
export function toValues(inputs: any){
  const data :any = {};
  for(const name in inputs){
    data[name] = inputs[name].value;
  }
  return data;
}

export function updateAll(inputs: any, newValue: any){
  //objeto vazio
  const newInput :any = {};

  //percorrer todos os atributos dos inputs
  // conservar tudo do atributo, pegar o valor do atributo e passar o novo valor
  for(var name in inputs){
    newInput[name] = {...inputs[name], value: newValue[name]};
  }
  return newInput;
}

export function validate(inputs: any, name: string){

  //verifico se o campo passado tem alguma validação se não, retorna o input normal sem fazer alteração
  if(!inputs[name].validation){
    return inputs;
  }

  const isInvalid = !inputs[name].validation(inputs[name].value);

  return {...inputs, [name]: { ...inputs[name], invalid: isInvalid.toString() } }
  
  
}