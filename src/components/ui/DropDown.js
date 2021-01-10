import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Link} from "react-router-dom";
import {Divider} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    size:{
        height:"30px",
        width:"30px",
        marginRight:"5px"
    }
}));

export const DropDown =({check,updateimage,user,removeImage})=> {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef= useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target.event)) {
            return;
        }
        setOpen(false);
    };
    const handleremove=(event)=>{
        handleClose(event)
        removeImage()
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const links=[
        {title:"Dashboard",linkTo:"/dashboard/purchased_contracts"},
        {title:"My Account",linkTo:"/account_settings/profile"},
        {title:"Upload Smart Contract",linkTo:"/upload_samrt_contract"},
        {title:"Upload Dapps",linkTo:"/upload_dapps"},
        {title:"Logout",linkTo:"/logout"}
    ]
    const renderItem=()=>(
        links.map(link=>(
            <Link key={link.title} to={link.title==="My Account"?
                {pathname:link.linkTo,state:{id:user.id}}
                :link.linkTo
            }>
                <MenuItem onClick={handleClose}>{link.title}</MenuItem>
                {link.title==="Add Smart Contract"&&<Divider/>}
            </Link>
        ))
    )

    return (
        <div className={classes.root}>
            {check?
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar
                        className={classes.size}
                        src={user.avatar}/>
                    <span className={"arrowUp arrowName"}>{user.fullName}</span>
                    <ArrowDropDownIcon className={"arrowUp"}/>
                </Button>
                : <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={"edit_btn"}
                >
                    <EditIcon/> Edit
                </Button>
            }
            <Popper className={"dropdown "} style={{zIndex:99}} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {check?
                    <Paper>
                        <div className={"user_logged"}>
                            <div>Signed in as</div>
                            <h3>{user.fullName}</h3>
                        </div>
                        <Divider/>
                        <ArrowDropUpIcon className={"dropUpArrow"}/>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {renderItem()}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    :
                    <Paper className={"picture_menu"}>
                        <ArrowDropUpIcon className={"dropUpArrow"}/>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <label className={"avatar_label"} htmlFor={"upload_picture"}>
                                    <MenuItem >
                                        Upload a Photo
                                        <input
                                            type={"file"}
                                            id={"upload_picture"}
                                            name={"upload_picture"}
                                            accept="image/jpeg,image/png"
                                        />
                                    </MenuItem>
                                </label>
                                <MenuItem  onClick={handleremove}>Remove Photo </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                }
            </Popper>
        </div>
    );
}
