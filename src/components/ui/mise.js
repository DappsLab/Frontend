export const Validation =(element)=>{
    let error = [false,''];
    if(element.validation.required){
        const valid = /^[A-Za-z]+$/.test(element.value);
        const message = `${!valid ? 'Must be Alphabet' : ''}`;
        error = !valid ? [!valid,message]: error
    }
    return error;
};
