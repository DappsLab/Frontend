import React from 'react';
import './custom-button.styles.css'
const CustomButton = ({metamask,children,cancel,isChangePassword,login,inverted,...otherProps}) => {
    return (
        <button className={` custom-button
         ${login?'login':''}
         ${metamask?'metamask':''}
           ${cancel?'cancel':''}
        ${isChangePassword?'change-password':''}
        `} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;