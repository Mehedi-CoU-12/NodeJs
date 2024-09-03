const handle={};

handle.notFoundHandler=(requestedProperties,callBack)=>{

    console.log(requestedProperties);

    callBack(404,{
        error:'your requested page was not found'
    })
}

module.exports=handle;