import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({

    drawerPaper: {
        width: drawerWidth,
        height:"auto",
        position:"absolute",
        padding:"0 15px 15px 15px",
        top:"64px"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        // padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },

}));

export default function FilterDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        if(open===true){
            handleDrawerClose();
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <FontAwesomeIcon className={"filterIcon cursor"} onClick={handleDrawerOpen} icon={faFilter}/>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <h3>Search Filter</h3>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                {props.select}
                {props.input}
                {props.button}
                <Divider/>
            </Drawer>
        </div>
    );
}
