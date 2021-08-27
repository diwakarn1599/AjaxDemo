let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let makePromiseCall = (methodType,url,async=true,data=null)=>
{
    return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        console.log("State Change Called... Ready State: "+xhr.readyState+" Status: "+xhr.status);
        
         if(xhr.status.toString().match('^[2][0-9]{2}$'))
         {
             resolve(xhr.responseText);
         }
         else if(xhr.status.toString().match('^[4,5][0-9]{2}$'))
         {
             reject({
               status:xhr.status,
               statusText:xhr.statusText
             });
             console.log("XHR failed");
        }
    
    }
    xhr.open(methodType,url,async);
    if(data)
    {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else
    {
        xhr.send();
    }
    console.log(methodType+" request send to the server");
});
}
//getting data form json
const getURL="http://localhost:3000/employees/";
makePromiseCall("GET",getURL,true)
.then(responseText=>{
    console.log("Get user data:"+responseText);
})
.catch(error=>console.log("GET error status:"+JSON.stringify(error)));


//delete operation 
const deleteURL="http://localhost:3000/employees/4";
makePromiseCall("DElETE",deleteURL,false)
.then(responseText=>{
    console.log("user deleted:"+responseText);
})
.catch(error=>console.log("DELETE error status:"+JSON.stringify(error)));


//post call
const postURL="http://localhost:3000/employees";
const empData={"name":"Messi","salary":"40000"}
makePromiseCall("POST",postURL,true,empData)
.then(responseText=>{
    console.log("user added :"+responseText);
})
.catch(error=>console.log("POST error status:"+JSON.stringify(error)));