document.getElementById("add-event-button").addEventListener("click",callTemplate);
x=0;//_______________________contador para que no se llame al formulario dos veces


function callTemplate(){

    if(x==0){
        //___________________________________________________________llamar template
        let newEvent=document.querySelector("template.newEvent");

        const importNewEvent=document.importNode(newEvent.content,true);
        document.querySelector("body").appendChild(importNewEvent);

        let eventContent=document.getElementById("eventContent");
        eventContent.style.border='1px black solid';

    //_____________________________________________________________cerrar formulario
            document.getElementById('close-button').addEventListener('click', closeEvent);
            document.getElementById('cancel-button').addEventListener('click', closeEvent);
            document.getElementById('create-button').addEventListener('click', sendAndCloseEvent);
            x+=1;
            function closeEvent(){
                document.querySelector("body").removeChild(eventContent);
                x=0;
            };
           
    }else{
    //________________cambio la funcion del boton "add-event-button" par que envez de 
    //__________________ abrir otro formulario cierre el que ya esta abierto
        document.querySelector("body").removeChild(eventContent);
        x=0;
    }

}
//____________________________________________________ habilitar los recordatorios

function habilitar(remind){
    let renindImputs=document.querySelectorAll(".habitiation");
    if(remind.checked==true){
       renindImputs.forEach(element => {
           element.removeAttribute("disabled")
        });
    }else{
        renindImputs.forEach(element => {
            element.setAttribute("disabled","")
         });
    }
}

//_________________________________________________________________ recoger datos


function sendAndCloseEvent(){
    let remindTime=document.getElementById("time-remind").value;
    let eventType=document.getElementById( "event-type").value;
    let textRemind=document.getElementById("remindText").value;

    localStorage.setItem('tiempo de recordatorio',remindTime);
    localStorage.setItem('tipo de event',eventType);
    localStorage.setItem('¿Que quiere recordar?, pues acuerdate panolis',textRemind)

    
    document.querySelector("body").removeChild(eventContent);
    x=0;
}
localStorage.clear()