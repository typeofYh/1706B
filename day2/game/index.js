let names = '第一关';
const fs = require('fs');
const path = require('path');
const reg = /\[(.+)\'(.+)\'\]/;
function getkey(name,callback){
    if(callback){
        fs.readFile(path.join(__dirname,name+'.txt'),(error,data)=>{
            if(error){
                return;
            }
            callback(data.toString());
        })
    }else{
        return new Promise((resolve,reject)=>{
            fs.readFile(path.join(__dirname,name+'.txt'),(error,data)=>{
                if(error){
                    reject(error)
                    return;
                }
                setTimeout(()=>{
                    resolve(data.toString());
                },500)
            })
        })
    }
}


// getkey(names,function(data){
//     let key = data.match(reg)[2];
//     console.log(key)
//     getkey(key,function(data){
//         let key = data.match(reg)[2];
//         console.log(key)
//         getkey(key,function(data){
//             let key = data.match(reg)[2];
//             console.log(key)
//         })
//     })
// })

// getkey(names).then(res=>{ //1
//     console.log(res);
//     let key = res.match(reg)[2];
//     console.log(key,'===================')
//     return getkey(key);
// }).then(data=>{ //2
//     console.log(data);
//     let key = data.match(reg)[2];
//     console.log(key,'===================')
//     return getkey(key);
// }).then(data=>{ //3
//     console.log(data);
//     let key = data.match(reg)[2];
//     console.log(key,'===================')
// })


async function run (){
    // console.log('run');
    let data = await getkey(names)
    let key = data.match(reg)[2];
    console.log(key);
    let data1 = await getkey(key)
    let key1 = data1.match(reg)[2];
    console.log(key1);
    let data2 = await getkey(key1)
    let key2 = data2.match(reg)[2];
    console.log(key2);
}
run();