import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = (props) => {
    const [term, setTerm] = useState("");
    
    const handleClick = (e) => {
        props.onSearch(term);
    }

    const handleOnChange = (e) => {
        setTerm(e.target.value);
    }
    
    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleOnChange}/>
            <button className="SearchButton" onClick={handleClick}>SEARCH</button>
        </div>
    )
}

export default SearchBar;