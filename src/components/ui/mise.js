

export const Validation =(element)=>{
    let error = [false,''];
    if(element.validation.required){
        const valid = /^[A-Za-z]+$/.test(element.value);
        const message = `${!valid ? 'Must be Alphabet' : ''}`;
        error = !valid ? [!valid,message]: error
    }
    return error;
};
// export  function  getCroppedImg (image, crop, fileName) {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext('2d');
//
//     ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height
//     );
//
//     return new Promise((resolve, reject) => {
//         canvas.toBlob(blob => {
//             if (!blob) {
//                 console.error('Canvas is empty');
//                 return;
//             }
//             blob.name = fileName;
//             window.URL.revokeObjectURL(this.fileUrl);
//             this.fileUrl = window.URL.createObjectURL(blob);
//             resolve(this.fileUrl);
//         }, 'image/jpeg');
//     });
// }


