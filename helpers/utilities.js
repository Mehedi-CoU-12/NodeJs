const {createHmac}=require('node:crypto')

const utility={};

utility.hashPassword=(password)=>{
    
    const secret='mehedihasan';

    if(typeof(password)==='string' && password.length>0){

        const newPassword=createHmac('sha256', secret)
        .update(password)
        .digest('hex');

        return newPassword;     
    }
}

utility.parseJSON=(data)=>{

    let output;
    try {
        output=JSON.parse(data);
    } catch {
        output={firtName:'Hasan'};
    }

    return output;
}

module.exports=utility;