import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const RadioButton = (props) => {
    const lists=[
        {input:props.input,value:"one"},
        {input: props.input2,value:"unlimited"}
    ]
    const renderInput=()=>(
        lists.map(list=>(
            <div className={"flex inputcontrol"}>
                <FormControlLabel value={list.value} control={<Radio />}   label={""}/>
                <div className={"fullWidth"}>
                    <div className={"flex priceInput"}>
                        <span className={"block"}> Dapps</span>
                        {list.input}
                    </div>
                </div>
            </div>
        ))
    );
    return (
        <div>
            <FormControl component="fieldset" className={"fullWidth"}>
                <RadioGroup aria-label="Price" name="price" value={props.value} onChange={(event)=>props.change(event)}>
                    {renderInput()}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default RadioButton;
