import React from "react";

export  const SearchField = ({formData,id,change,press}) => {
    const renderTemplate = () => {
        let formTemplate=null;
        formTemplate=(
            <div className="barContainer ">
                <div className="search-container">
                    <input
                        {...formData.config}
                        value={formData.value}
                        onChange={(event)=> change({event,id})}
                        onKeyPress={press}
                    />
                    <div className="search"> </div>
                </div>
            </div>
        );
        return formTemplate;
    };
    return(renderTemplate())
};
export const PriceField=({formData,id,change})=>{
    const renderTemplate = () => {
        let formTemplate=null;
        formTemplate=(
            <div>
                <input
                    {...formData.config}
                    value={formData.value}
                    onChange={(event)=> change({event,id})}
                />
            </div>
        );
        return formTemplate;
    };
    return(renderTemplate())
};
