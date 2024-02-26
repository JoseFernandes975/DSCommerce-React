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