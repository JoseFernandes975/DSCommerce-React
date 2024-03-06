/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function toDirty(inputs: any, name: string){
 return { ...inputs, [name]: {...inputs[name], dirty: "true"}}
}

export function updateAndValidate(inputs: any, name: string, newValue: any){
  const dataUpdated = update(inputs, name, newValue);
  const dataValidated = validate(dataUpdated, name);
  return dataValidated;
}

export function dirtyAndValidate(inputs: any, name: string){
  const dataDirty = toDirty(inputs, name);
  return validate(dataDirty, name);
}

export function toDirtyAll(inputs: any){
 const newInputs: any = {};
 for(var name in inputs){
  newInputs[name] = { ...inputs[name], dirty: "true"};
 }
 return newInputs;
}

export function validateAll(inputs: any){
  const newInputs: any = {};

  for(var name in inputs){
    if(inputs[name].validation){
      const isInvalid = !inputs[name].validation(inputs[name].value)
      newInputs[name] = { ...inputs[name], invalid: isInvalid.toString() }
    }
    else {
      newInputs[name] = { ...inputs[name] }
    }
  }
  return newInputs;
}

//função para verificar quando enviar formulario vazio
export function dirtyAndValidateAll(inputs: any){

  //sujar todos os campos e o resultado vai passar para validar todos esses campos
  return validateAll(toDirtyAll(inputs));
}

//verifico se tem algum campo invalido
export function hasAnyInvalid(inputs: any){
  for(var name in inputs){
    if(inputs[name].invalid === "true" && inputs[name].dirty === "true"){
      return true;
    }
    }
    return false;
}