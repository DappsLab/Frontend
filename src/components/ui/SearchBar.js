import React from 'react';
import '../../assets/scss/SearchBar.css'

const SearchBar = () => {
    return (
        <div className="barContainer">
            <div className="search-container">
                <input type="text" placeholder="Search..."/>
                    <div className="search"></div>
            </div>
            <div className="clear">

            </div>
        </div>
    );
};
export default SearchBar;