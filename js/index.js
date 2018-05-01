    var send = document.getElementById('send');
    var nick = document.getElementById('nick');
    var message = document.getElementById('message');
    var counterMessage = 0;


function jsonPost(url, data)
    {
        return new Promise((resolve, reject) => {
            var x = new XMLHttpRequest();   
            x.onerror = () => reject(new Error('Post failed'))
            x.open("POST", url, true);
            x.send(JSON.stringify(data))
            x.onreadystatechange = () => {
                if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                    resolve(JSON.parse(x.responseText));
                   //console.log (x.responseText);
                    }
                else if (x.status != 200){
                    reject(new Error('Status is not 200'))
                }
            }
        })
        
    }
   
    send.onclick = () => {
        let objectMessage = {
            func: 'addMessage',
            nick: nick.value,
            message: message.value
        };
        //console.log (objectMessage);
    jsonPost("http://students.a-level.com.ua:10012", objectMessage, true);
    
}
  
       
setInterval(() => {
    let objectMessageGet = {
        func: "getMessages",
        messageId: counterMessage,
    }

     jsonPost("http://students.a-level.com.ua:10012", objectMessageGet, true)
 .then((result) => {
//     console.log(result)
     let divGet = document.getElementById('get');
        messageId = result.nextMessageId;
        console.log (messageId);
        
        result.data.forEach ((data, i) => {
        //for(i=0;i<result.data.length; i++){
             
             let newMessage = document.createElement('div');
             let nick = (result.data[i].nick == '') ? 'Anon' : result.data[i].nick;
             let message = (result.data[i].message == '') ? 'Я не умею копипастить в консоль, зато умею жать красную кнопку.' : result.data[i].message;
             let timestamp = (new Date (result.data[i].timestamp)).getHours()+':'+
             (new Date (result.data[i].timestamp)).getMinutes()+':'+
             (new Date (result.data[i].timestamp)).getSeconds();
             //console.log (result.data[i]);

                     newMessage.innerHTML = `<b>${nick}</b> : ${message} <span class='pull-right'><small><mark>${timestamp}</small></mark></span>`;
                     divGet.prepend(newMessage);
                     
                 });
 
 });

 },5000);