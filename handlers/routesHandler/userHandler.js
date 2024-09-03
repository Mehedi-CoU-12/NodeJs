//dependencies
const {create,read, update,Delete}=require('../../lib/data');
const {hashPassword, parseJSON}=require('../../helpers/utilities');


const handler={};

handler.userHandler=(requestProperties,callback)=>{

    const method=requestProperties.method;

    const acceptedMethod=['get','post','put','delete'];

    if(acceptedMethod.indexOf(method)==-1)    
        callback(405,{message:'method are not allowed'})
    else
        handler._user[method](requestProperties,callback)
}

handler._user={};

handler._user.post=(requestProperties,callback)=>{

    const firstName=typeof(requestProperties.body.firstName)==='string' && requestProperties.body.firstName.trim().length>0?requestProperties.body.firstName:false;

    const lastName=typeof(requestProperties.body.lastName)==='string' && requestProperties.body.lastName.trim().length>0?requestProperties.body.lastName:false;

    const phone=typeof(requestProperties.body.phone)==='string' && requestProperties.body.phone.trim().length>0?requestProperties.body.phone:false

    const password=typeof(requestProperties.body.password)==='string' && requestProperties.body.password.trim().length>0?requestProperties.body.password:false;

    const tosAgreement=typeof(requestProperties.body.tosAgreement)==='boolean'?requestProperties.body.tosAgreement:false;

    if(firstName && lastName && phone && password && tosAgreement){
        
        read('users',phone,(err,result)=>{

            if(err){

                const userObj={
                    firstName,
                    lastName,
                    phone,
                    password:hashPassword(password),
                    tosAgreement
                };

                create('users',phone,userObj,(err)=>{
                    if(!err)
                        callback(200,{message:'user created successfully'});
                    else
                        callback(500,);
                })
            }
            else
            callback(500,{error:'user already exist'})
        })
    }
    else
        callback(400,{error:'you have a problem in your request'})
}

handler._user.get=(requestProperties,callback)=>{
    
    const phone=typeof(requestProperties.queryStringObject.phone)==='string' && requestProperties.queryStringObject.phone.trim().length===11 ? requestProperties.queryStringObject.phone:false;

    if(phone){
        read('users',phone,(err,data)=>{
            if(!err){

                const user=parseJSON(data);
                delete user.password; 

                callback(200,user);
            }
            else
                callback(500,{error:'User not found!'})
        })
    }
    else
        callback(404,{error:"Requested User Was Not Found"});
}

handler._user.put=(requestProperties,callback)=>{
    
    const phone=typeof(requestProperties.body.phone)==='string' && requestProperties.body.phone.trim().length===11?requestProperties.body.phone:false;

    const firstName=typeof(requestProperties.body.firstName)==='string' && requestProperties.body.firstName.trim().length>0?requestProperties.body.firstName:false;

    const lastName=typeof(requestProperties.body.lastName)==='string' && requestProperties.body.lastName.trim().length>0?requestProperties.body.lastName:false;

    const password=typeof(requestProperties.body.password)==='string' && requestProperties.body.password.trim().length>0?requestProperties.body.password:false;

    const tosAgreement=typeof(requestProperties.body.tosAgreement)==='boolean'?requestProperties.body.tosAgreement:false;


    if(phone)
    {
        if(firstName || lastName || password)
        {   
            read('users',phone,(err,data)=>{
                if(!err)
                {
                    let user=parseJSON(data);

                    if(firstName)
                        user.firstName=firstName;
                    if(lastName)
                        user.lastName=lastName;
                    if(password)
                        user.password=hashPassword(password);

                    update('users',phone,user,(err)=>{

                        if(!err)
                            callback(200,{message:'user update successfully!'})
                        else
                            callback(500,{error:'unexpected error occured'})
                    })
                }
                else
                    callback(400,{error:'You have a problem in your request!'})
            })
        }
        else
            callback(400,{error:'You have a problem in your request!'})
    }
    else
        callback(400,{error:"Invalid phone number!"});

}

handler._user.delete=(requestProperties,callback)=>{

    const phone=typeof(requestProperties.queryStringObject.phone)==='string' && requestProperties.queryStringObject.phone.trim().length===11 ? requestProperties.queryStringObject.phone:false;

    if(phone){
        Delete('users',phone,(err)=>{
            if(!err){
                callback(200,{message:"User has benn deleted successfully"})
            }
            else
                callback(500,{error:'unexpected error!'})
        })
    }
    else
        callback(400,{error:'Invalid Phone number'})
}

module.exports=handler;