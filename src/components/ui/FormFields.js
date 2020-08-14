import React from "react";
import "../../assets/scss/SearchResult.css"
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
export const FormField =({id,formData,change})=>{
    const renderTemplate = () => {
        let formTemplate=null;
        switch (formData.element) {
            case ('input'):
                formTemplate=(
                    <div>
                        {
                            formData.showLabel ?
                                <div className={"label_inputs"}>
                                    {formData.config.label}
                                </div>
                                :
                                null
                        }
                        <input
                            className={"selectSort"}
                            {...formData.config}
                            value={formData.value}
                            onChange={(event)=> change({event,id})}
                        />
                    </div>
                );
                break;
            case ('select'):
                formTemplate=(
                    <div>
                        {
                            formData.showLabel ?
                                <div className={"label_inputs"}>
                                    {formData.config.label}
                                </div>
                                :
                                null
                        }
                        <select className={"selectSort"}
                            value={formData.value}
                            onChange={(event)=> change({event,id})}
                        >
                            <option value={""}>Select one </option>
                            {
                                formData.config.options.map((item)=>(
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                );
                break;
            default:
                formTemplate=null;
        }
        return formTemplate;
    };
    return(
        <div>
            {renderTemplate()}
        </div>
    )
}
