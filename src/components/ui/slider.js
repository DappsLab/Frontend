import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "24px 0",
        boxShadow:"none",
        width:"100%"
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
        marginLeft:"10px",
        width:"95%",
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -8,
        marginLeft: -13,
        boxShadow: '#ebebeb 0px 2px 2px',
        '&:focus,&:hover,&$active': {
            boxShadow: '#ccc 0px 3px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        background:"#0090FA",
        height: 8,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 8,
    },
})(Slider);

function AirbnbThumbComponent(props) {
    return (
        <span className={"sliderCircle"} {...props}> </span>
    );
}
export default function CustomizedSlider({changeSlider}) {

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography gutterBottom>Filter by price (per deployment):</Typography>
            <AirbnbSlider
                ThumbComponent={AirbnbThumbComponent}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={[0, 1500]}
                min={0}
                max={1500}
                step={1}
                onChange={(event,value)=>changeSlider(event,value)}
            />
        </Paper>
    );
}
// import styled from 'styled-components';
// import React from "react";
// import ReactSlider from 'react-slider'
//
// const StyledSlider = styled(ReactSlider)`
//     width: 100%;
//     height: 25px;
// `;
//
// const StyledThumb = styled.div`
//     height: 25px;
//     line-height: 25px;
//     width: 25px;
//     text-align: center;
//     background-color: #000;
//     color: #fff;
//     border-radius: 50%;
//     cursor: grab;
// `;
//
// const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
//
// const StyledTrack = styled.div`
//     top: 0;
//     bottom: 0;
//     background: ${props => props.index === 2 ? '#ddd' : props.index === 1 ? '#0f0' : '#ddd'};
//     border-radius: 999px;
// `;
//
// const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
// export default function CustomizedSlider({changeSlider}) {
//
//     return <StyledSlider
//         min={0}
//         max={200}
//         onChange={(event,value)=>changeSlider(event,value)}
//         defaultValue={[50, 75]}
//         renderTrack={Track}
//         renderThumb={Thumb}
//     />
// }
