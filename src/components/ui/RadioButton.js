import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const RadioButton = (props) => {
    return (
        <div>
            <FormControl component="fieldset" className={"fullWidth"}>
                <RadioGroup aria-label="Price" name="price" value={props.value} onChange={(event)=>props.change(event)}>
                    <div className={"flex inputcontrol"}>
                        <FormControlLabel value="one" control={<Radio />}   label={""}/>
                        <div className={"fullWidth"}>
                            <div className={"flex priceInput"}>
                                <span className={"block"}> Dapps</span>
                                {props.input}
                            </div>
                        </div>
                    </div>
                    <div className={"flex inputcontrol"}>
                        <FormControlLabel value="unlimited" control={<Radio />}  label={""}/>
                        <div className={"fullWidth"}>
                            <div className={"flex priceInput"}>
                                <span className={"block"}> Dapps</span>
                                {props.input2}
                            </div>
                        </div>
                    </div>
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default RadioButton;
