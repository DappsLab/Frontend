import React from 'react';
import './custom-button.styles.css'
const CustomButton = ({children,login,inverted,...otherProps}) => {
    return (
        <button className={` custom-button
         ${login?'login':''}
        ${inverted?'inverted':''}
        `} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;