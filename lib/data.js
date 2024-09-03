const fs=require('fs');
const path=require('path');
const { escape, stringify } = require('querystring');

const lib={};

lib.baseDir=path.join(__dirname,'/../.data/');

lib.create=function(dir,file,data,callback){

    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){

        // console.log(lib.baseDir+dir+'/'+file+'.json');

        if(!err){
        
            const stringData=JSON.stringify(data);
            
            fs.writeFile(fileDescriptor,stringData,function(err){

                if(!err){

                    fs.close(fileDescriptor,function(err){
                        if(!err)
                            callback(false);
                        else
                            callback('Error closing the new file')
                    })
                }
                else
                    callback('Error writting new file')
            })
        }
        else
            callback('could not create a new file,it may already exist')
    })
}

lib.read=function(dir,file,callback){

    // console.log(lib.baseDir+dir+'/'+file+'.json')
    
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        callback(err,data);
    })
}

lib.update=function(dir,file,data,callback){

    // console.log(dir,file,data)

    fs.open(lib.baseDir+dir+'/'+file+'.json' ,'r+',function(err,fileDescriptor){

        if(!err)
        {
            stringData=JSON.stringify(data);

            fs.ftruncate(fileDescriptor,function(err){
                
                if(!err){
                    
                    fs.writeFile(fileDescriptor,stringData,function(err){
                        if(!err)
                        {
                            fs.close(fileDescriptor,function(err){
                                if(!err)
                                    callback(false);
                                else
                                    callback('failed to close file!');
                            })
                        }
                        else
                            callback('could not write files')
                    })
                }
                else
                    callback('Failed to trancate file!')
            })
        }
        else
            callback(err)
    })

}

lib.Delete=function(dir,file,callback){

    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err)
            callback(false);
        else
            callback('file may not exist');
    })
}

module.exports=lib;