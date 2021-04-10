document.getElementById("add-event-button").addEventListener("click",callTemplate);
x=0;
function callTemplate(){
   
    if(x==0){
        let newEvent=document.querySelector("template.newEvent");

        const importNewEvent=document.importNode(newEvent.content,true);
        document.querySelector("body").appendChild(importNewEvent);

        let eventContent=document.getElementById("eventContent");
        eventContent.style.border='1px black solid';
        document.getElementById('close-button').addEventListener('click', closeEvent);
        document.getElementById('canel-button').addEventListener('click', closeEvent);
        document.getElementById('create-button').addEventListener('click', closeEvent);
        x+=1;
        function closeEvent(){
            document.querySelector("body").removeChild(eventContent);
            x=0;
            };
        
    }else{
        document.querySelector("body").removeChild(eventContent);
        x=0;
    }

}
