import React from 'react';
import {Form} from "semantic-ui-react";
import '../../../../assets/scss/upload_smart_contract.css'

const Tags = (props) => {
    const {setTag,contract,tags,dapp}=props
    const removeTags=(i)=> {
        setTag(tags.filter((tag, index) => index !== i))
    }
    const addTags = event => {
        if (event.target.value !== "") {
            setTag( [...tags ,event.target.value]);
            event.target.value = "";
        }
    }
    return (
        <Form.Field>
            <label>Tag:</label>
            <div className="tags-input">
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                  onClick={() => removeTags(index)}
                            >x</span>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                    placeholder={contract?contract.sourceContractName:"Press enter to add tags"}
                />
            </div>
            <p className={"info"}>List of tags. Press Enter to add Tags</p>
        </Form.Field>
    );
};

export default Tags;