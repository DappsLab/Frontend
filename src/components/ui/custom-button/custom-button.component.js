import React from 'react';
import './custom-button.styles.css'
const CustomButton = ({children,cancel,isChangePassword,login,inverted,...otherProps}) => {
    return (
        <button className={` custom-button
         ${login?'login':''}
           ${cancel?'cancel':''}
        ${isChangePassword?'change-password':''}
        `} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;