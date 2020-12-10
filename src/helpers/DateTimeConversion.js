export  let dateTime=(timestemp)=>{

    let ts = Date(timestemp);
   let date_ob = new Date(ts);
    let sec = date_ob.getSeconds();
    let min = date_ob.getMinutes();
    let hour = date_ob.getHours();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() ;
    let year = date_ob.getFullYear();
    switch (month){
        case 0:
            month="January";
            break;
        case 1:
            month="February"
            break;
        case 2:
            month="March";
            break;
        case 3:
            month="April"
            break;
        case 4:
            month="May";
            break;
        case 5:
            month="June"
            break;
        case 6:
            month="July";
            break;
        case 7:
            month="August"
            break;
        case 8:
            month="September";
            break;
        case 9:
            month="October"
            break;
        case 10:
            month="November";
            break;
        case 11:
            month="December"
            break;
    }
// prints date & time in YYYY-MM-DD format
//     console.log(year + "-" + month + "-" + date+"-"+hour+"-"+min+"-"+sec);
    return date + " " + month + " " + year;
}