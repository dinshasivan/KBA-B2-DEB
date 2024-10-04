try{
//code that might throw an error
    let result =riskyOperation();
    console.log(result);
}catch (error){
//code that handle the error
    console.log("An error occurred:",error.message);
}finally{
//code that runs regardless of an error
    console.log('This will always run!');
}

function riskyOperation(){
    let obj;
    obj.property;
}