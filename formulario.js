document.getElementById("add-event-button").addEventListener("click", callTemplate);
x = 0;//_______________________contador para que no se llame al formulario dos veces


function callTemplate() {

    if (x == 0) {
        //___________________________________________________________llamar template
        let newEvent = document.querySelector("template.newEvent");

        const importNewEvent = document.importNode(newEvent.content, true);
        document.querySelector("body").appendChild(importNewEvent);

        let eventContent = document.getElementById("eventContent");
        
       
        
        

        //_____________________________________________________________cerrar formulario
       // document.getElementById('eventContent').addEventListener('click', closeEvent);
        eventContent.addEventListener('click', closeEvent);
        document.getElementById('close-button').addEventListener('click', closeEvent);
        document.getElementById('cancel-button').addEventListener('click', closeEvent);
        document.getElementById('create-button').addEventListener('click', sendAndCloseEvent);
        x += 1;
        function closeEvent() {
            document.querySelector("body").removeChild(eventContent);
            document.querySelector(".eventForm").style.display="none";
            
            x = 0;
        };

    } else {
        //________________cambio la funcion del boton "add-event-button" par que envez de 
        //__________________ abrir otro formulario cierre el que ya esta abierto
        document.querySelector("body").removeChild(eventContent);
        document.querySelector(".eventForm").style.display="none";
        x = 0;
    }

}
//____________________________________________________ habilitar los recordatorios

function habilitarReminder(remind) {
    let renindImputs = document.querySelectorAll(".habitiation");
    if (remind.checked == true) {
        renindImputs.forEach(element => {
            element.removeAttribute("disabled")
        });
    } else {
        renindImputs.forEach(element => {
            element.setAttribute("disabled", "")
        });
    }
}

function habilitarDate(date) {
    let imput = document.getElementById("final-date");
    if (date.checked == true) {
        imput.removeAttribute("disabled")
    } else {
        imput.setAttribute("disabled", "")
    }
};

//_________________________________________________________________ recoger datos


function sendAndCloseEvent() {
    let eventTitle = document.getElementById("event-tittle").value;
    let initialDate = document.getElementById("initial-date").value;
    let finalDateOption = document.getElementById("final-date-option").value;
    let remindTime = document.getElementById("time-remind").value;
    let remindText = document.getElementById("remindText").value;
    let eventType = document.getElementById("event-type").value;

    let event = {
        title: eventTitle,
        idate: initialDate,
        fdate: finalDateOption,
        remindTime: remindTime,
        eventText: remindText,
        eventType: eventType,
    };

    let json = JSON.stringify(event);
    console.log(json);
    console.log(event);
    localStorage.setItem("event", json);

    document.querySelector("body").removeChild(eventContent);
    x = 0;
};