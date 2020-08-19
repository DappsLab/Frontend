import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({change,id}) {
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                onChange={(event,value)=>change(event,value,id)}
                className={"edit"}
            />
        </div>
    );
}
export  default  Editor;
