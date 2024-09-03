const handle={};

handle.sampleHandlder=(requestedProperties,callBack)=>{
    
    console.log('sample handler:->',requestedProperties)

    callBack(200,{
        message:'this is a sample message'
    });
}

module.exports=handle;
