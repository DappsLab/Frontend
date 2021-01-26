import React from 'react';
import './form-input.styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormInput = ({password,onHidden,hidden,onKeyPress,handleChange,label,...otherProps}) => {
    return (
        <div className={'group'}>
            {password?
                <div className={'icon-input'}>
                    <input className={'form-input pass-input'} onChange={handleChange} {...otherProps}/>
                    <i onClick={onHidden}><FontAwesomeIcon icon={hidden?faEyeSlash:faEye} /></i>
                </div>
            :<input className={'form-input'} onKeyPress={onKeyPress} onChange={handleChange} {...otherProps}/>
            }
            {label?
                (<label className={`${otherProps.value.length?'shrink':''}
                ${otherProps.value.length&&password?'password-shrink':''}
                 ${password?'form-icon-label':''}
                 form-input-label`}>
                    {label}
                </label>)
                :null}
        </div>
    );
};

export default FormInput;