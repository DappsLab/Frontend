import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallIcon from '@material-ui/icons/LocalMall';
const DashboardNav = (props) => {
    const {user}=props;
    const type=user.type;
    const links=[
        {icon:<LocalMallIcon/>, title:"Custom Orders",linkTo:"/dashboard/custom_orders"},
        {icon:<LocalMallIcon/>,title:"Ordered Contract",linkTo:"/dashboard/ordered_contract"},
        {icon:<LocalMallIcon/>, title:"Purchased Smart Contract",linkTo:"/dashboard/purchased_contracts"},
        {icon:<LocalMallIcon/>,title:"Developed Smart Contract",linkTo:"/dashboard/developed_contract"},
        {icon:<LocalMallIcon/>,title:"Developed Dapps",linkTo:"/dashboard/developed_dapps"},
        {icon:<LocalMallIcon/>,title:"Purchased Dapps",linkTo:"/dashboard/purchased_dapps"},
        {icon:<LocalMallIcon/>,title:"KYC (Account Setting)",subtitle:"(Account Setting)",linkTo:"/dashboard/kyc_verification"},
        {icon:<LocalMallIcon/>,title:"Smart Contract (Contract  Verification)",subtitle:"(Contract  Verification)",linkTo:"/dashboard/contract_verification"},
        {icon:<LocalMallIcon/>,title:"Dapps (Dapps Verification)",subtitle:"(Dapps Verification)",linkTo:"/dashboard/dapps_verification"}

    ]
    const checkUser=()=>{
        if (user==="DEVELOPER"){
            return 0,5
        }else if (user==='USER'){
            return 1,5
        }
    }
    return (
        <List component="nav"  className={'uploadNav flex'} aria-label="main mailbox folders">
            {user.type==='ADMIN'?
             links.map(link=>{
                return  <ListItem key={link.title}>
                    {window.location.pathname===link.linkTo&&<div className={'active-nav'}> </div>}
                    <Link to={link.linkTo}>
                        <ListItemIcon style={{ color: '#fff' }}>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.title} />
                    </Link>
                </ListItem>
            })
            :(user.type==="DEVELOPER"?
                links.slice(0,5).map(link=>{
                return  <ListItem key={link.title}>
                        {window.location.pathname===link.linkTo&&<div className={'active-nav'}> </div>}
                <Link to={link.linkTo}>
                <ListItemIcon>
                <InboxIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary={link.title} />
                </Link>
                </ListItem>
                }):links.slice(1,5).map(link=>{
                    return  <ListItem key={link.title}>
                        {window.location.pathname===link.linkTo&&<div className={'active-nav'}> </div>}
                        <Link to={link.linkTo}>
                            <ListItemIcon>
                                <InboxIcon style={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText primary={link.title} />
                        </Link>
                </ListItem>
            })
            )
             }
        </List>
    )
}

export default DashboardNav;