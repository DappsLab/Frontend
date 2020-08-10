import useDarkMode from 'use-dark-mode';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';

import React from 'react';

const DarkMode = () => {
    const dm = useDarkMode(false);
    const style={
        color:'#fff',
        cursor:'pointer'
    };
    return (
            <span style={style} className={"darkbtn block"} onClick={dm.toggle}>
                {dm.value ? <Brightness7RoundedIcon/> : <Brightness4OutlinedIcon/>}
            </span>
    );
};

export default DarkMode;
