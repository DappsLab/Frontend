import React, {Component} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";



class Layout extends Component{
    render() {
        return (
            <div>
                {  console.log(window.location.pathname)}
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default  (Layout);
