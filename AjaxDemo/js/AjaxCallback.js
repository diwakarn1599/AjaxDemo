let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let makeAJAXCall = (methodType,url,callBack,async=true,data=null) =>
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=() =>
    {
        console.log("State Change Called... Ready State: "+xhr.readyState+" Status: "+xhr.status);
        
        if(xhr.readyState===4)
        {
            
            if(xhr.status===200||xhr.status===201)
                callBack(xhr.responseText);
            else if(xhr.status>=400)
                console.log("Handle 400 client error or 500 server error");
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
        xhr.send();
    console.log(methodType+" request send to the server");
}
/*******************************************************************************************/
//retreiving data form json server
const getURL="http://localhost:3000/employees/";

let getUserDetails = (data)=>console.log("Get User Data: "+data);

makeAJAXCall("GET",getURL,getUserDetails);

//delete data from json server 
const deleteURL="http://localhost:3000/employees/2";

let userDeleted = (data) => console.log("User Deleted: "+data);

makeAJAXCall("DELETE",deleteURL,userDeleted,false);
//post data into json server
const postURL="http://localhost:3000/employees";

const empData={"first_name":"Virat","salary":"60000"};

let userAdded = (data) =>console.log("User added : "+data);

makeAJAXCall("POST",postURL,userAdded,true,empData);