import React from "react";
import "../../assets/scss/SearchResult.css"
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


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
                        disabled={formData.disabled}
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
                    <div className={"input_box"}>
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
                            placeholder={formData.config.placeholder}
                            onChange={(event)=> change({event,id})}
                        />
                        {
                            formData.showInfo ?
                                <div className={"info"}>
                                    {formData.info}
                                </div>
                            : null
                        }
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
export const CheckBox=({check,name,change,index})=>{
    const renderTemplate = () => {
        let formTemplate;
        formTemplate=(
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={check}
                            onChange={(event)=> change({event,name,index})}
                            name={name}
                            color="primary"
                            value={"Primary"}
                        />
                    }
                    label={name}
                />
            </FormGroup>
        );
        return formTemplate;
    };
    return(renderTemplate())
}

