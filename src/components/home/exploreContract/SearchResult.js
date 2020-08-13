import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter } from '@fortawesome/free-solid-svg-icons'



const SearchResult = () => {
    return (
        <div className={"container"}>
            <FontAwesomeIcon icon={faFilter} />
        </div>
    );
};

export default SearchResult;

