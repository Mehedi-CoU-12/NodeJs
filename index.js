const http=require('http');
const url=require('url');
const handleReqRes=require('./helpers/handleReqRes.js');
const data=require('./lib/data.js');

// data.create('test','1234',{name:'mehedi',age:'20'},function(err){
//     console.log('error was ',err);  
// })

// data.read('test','134',function(err,result){
//     console.log(err,result);
// })

// data.update('test','bangladesh',{country:'bangladesh',area:'56 miles'},function(err){
//     console.log(err);
// })

// data.delete('test','bangladesh',function(err){
//     console.log(err)
// })

const server=http.createServer(handleReqRes);

const port=3000;

server.listen(port,()=>{
    console.log('server listen on port',port);
})