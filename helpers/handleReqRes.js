const url=require('url');
const routes=require('../routes');
const {notFoundHandler}=require('../handlers/routesHandler/notFoundHandler')
const { StringDecoder } = require('node:string_decoder');
const {parseJSON}=require('../helpers/utilities');

const decoder = new StringDecoder('utf8');

const handleReqRes=(req,res)=>{
    
    const parseUrl=url.parse(req.url,true);
    const path=parseUrl.pathname;
    const trimmedPath= path.replace(/^\/+|\/+$/g,'');
    const method=req.method.toLowerCase();
    const queryStringObject=parseUrl.query;
    const headerObj=req.headers;

    const requestedProperties={
        path,
        trimmedPath,
        method,
        queryStringObject,
    }

    // console.log(requestedProperties);


    // if(trimmedPath=='sample')
    // {
    //     res.writeHead(200)
    //     res.end('this is a sample message');
    // }
    // else
    // {
    //     res.writeHead(404)
    //     res.end('page not found');
    // }
    
    let realData='';

    req.on('data',(buffer)=>{
        realData+=decoder.write(buffer);
    })

    req.on('end',()=>{

        realData+=decoder.end();

        requestedProperties.body=parseJSON(realData);

        const chosenHandler=routes[trimmedPath] ? routes[trimmedPath]:notFoundHandler;

        chosenHandler(requestedProperties,(statusCode,payload)=>{

        statusCode=typeof(statusCode)==='number'?statusCode:500;
        payload=typeof(payload)==='object'?payload:{};

        const payloadString=JSON.stringify(payload);
        
        res.setHeader('Content-Type','application/json');
        res.writeHead(statusCode); 
        res.end(payloadString);
    })

        // res.end("hello programmers!"); 
    })
}

module.exports=handleReqRes;