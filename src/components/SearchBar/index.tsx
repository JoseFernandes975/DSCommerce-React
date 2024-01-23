import { useState } from 'react';
import './styles.css';

type Props = {
   onSearch: Function;
}

export default function SearchBar({ onSearch } : Props) {

const [text, setText] = useState("");

function handleChangeName(event: any){
   setText(event.target.value);
}

function handleSubmit(event: any){
   event.preventDefault();
   onSearch(text);
}

function handleClearSearchBarClick(){
   setText("");
   onSearch(text);
}


 return(
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
    <button type="submit">🔎︎</button>
    <input value={text} onChange={handleChangeName}  type="text" placeholder="Nome do produto" />
    <button onClick={handleClearSearchBarClick}>🗙</button>
    </form>
 );

}