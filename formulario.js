document.getElementById("add-event-button").addEventListener("click",callTemplate);

function callTemplate(){
    console.log('boton funciona')
   let newEvent=document.querySelector("template.newEvent");
   
    const importNewEvent=document.importNode(newEvent.content,true);
    document.querySelector("body").appendChild(importNewEvent);

    let eventContent=document.getElementById("eventContent");
    eventContent.style.border='1px black solid';
    
}
