import React, {useState} from 'react';
import '../../../../assets/scss/metamask.css'
import _1 from '../../../../assets/images/metamask-1.png'
import _2 from '../../../../assets/images/metamask-2.png'
import _3 from '../../../../assets/images/metamask-3.png'
import _4 from '../../../../assets/images/metamask-4.png'
import _5 from '../../../../assets/images/metamask-5.png'
import _6 from '../../../../assets/images/metamask-6.png'
import Layout from "../../../../hoc/Layout";
import FormInput from "../../../ui/form-input/form-input.component";
import CustomButton from "../../../ui/custom-button/custom-button.component";
import {client, getPrivateKey} from "../../../../queries/queries";
import {withAlert} from "react-alert";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Form} from "semantic-ui-react";

const MetaMask = (props) => {
    const [passOne,setpassOne]=useState(true)
    const [password,setPassword]=useState('')
    const [privateKey,setPrivateKey]=useState('')
    const {alert}=props
   const handleSubmit=async (event)=>{
        event.preventDefault()
        const results = await client.query({
            query: getPrivateKey,
            variables: { pass: password},
            context:{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            }
        }).catch(error => {
            alert.error(error.toString()+" Try Again", {timeout: 5000})
        });
        if (results&&results.data){
            try{
                setPassword('')
                setPrivateKey(results.data.getPrivateKey.wallet.privateKey)
            }catch (e) {
                console.log(e.toString())
            }
        }
    }
    return (
        <Layout>
            <div className={'metamask-container'}>
                <h2>get private Key</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type={passOne?'password':'text'} password hidden={passOne}
                        name={'currentPassword'} label={'Current Password'}
                        handleChange={(event) => setPassword(event.target.value)}
                        value={password} required
                        onHidden={()=>setpassOne(!passOne)}
                    />
                    <CustomButton type={'submit'} >get Private key</CustomButton>
                </form>
                <Form>
                    {privateKey.length?
                        <Form.Field className={'address'}>
                            <Form.Input
                                disabled label={'Address'} value={privateKey}
                            />
                            <CopyToClipboard text={privateKey}>
                                <label className={'copied'} onClick={()=>{alert.success("Copied",{timeout:1000})}}> copy</label>
                            </CopyToClipboard>
                        </Form.Field>:''
                    }
                </Form>
                <h2 className={'metamask-heading'}>How To Connact To MetaMask Wallet</h2>
                <div className={'image-Container'}>
                    <div>
                        <h3>Step 1</h3>
                        <img src={_1} alt={'metamask'}/>
                    </div>
                    <div>
                        <h3>Step 2</h3>
                        <img src={_2} alt={'metamask'}/>
                    </div>
                    <div>
                        <h3>Step 3</h3>
                        <img src={_3} alt={'metamask'}/>
                    </div>
                    <div>
                        <h3>Step 4</h3>
                        <img src={_4} alt={'metamask'}/>
                    </div>
                    <div>
                        <h3>Step 5</h3>
                        <img src={_5} alt={'metamask'}/>
                    </div>
                    <div>
                        <h3>Step 6</h3>
                        <img src={_6} alt={'metamask'}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default withAlert() (MetaMask);
