//___________________en este array se guardarán todos los eventos guardados en el localStorage
let arrayEvents = [];
let inputDate;

//___________________________________________________________________________________añadido la llamada del botón para llamar al template
document.getElementById("add-event-button").addEventListener("click", callTemplate);

//__________________________________actualizamos el array de eventos apenas iniciamos la página
updateEventsArrayFromLocalStorage();

//___________________________________________en esta función actualizamos el array desde los datos del localStorage
function updateEventsArrayFromLocalStorage(){
    arrayEvents = [];

    for (let i = 0; i < localStorage.length; i++) {
        let eventSelected = "event" + i;
        let objectTemp = JSON.parse(localStorage.getItem(eventSelected));
        arrayEvents.push(objectTemp);
        console.log(arrayEvents[i].idate)
    }
    
}
function remind() {
    
  if(arrayEvents.length==0){console.log('Do not execute')
    }else{
        
        for(i=0;arrayEvents.length;i++){
            
            let iReminded=arrayEvents[i].isReminded;
            let fechaInicial=arrayEvents[i].idate;
            let remindTime=arrayEvents[i].remindTime*60000;

            //let secInitial= new Date(fechaInicial).getTime();
            let secInicio=new Date(fechaInicial).getTime();
            
            let remindNaw=secInicio-remindTime;
            console.log('momento en el que debe empezar a recordar',remindNaw)
            let timeToEvent=(secInicio-new Date().getTime());
            if (timeToEvent<=remindTime && timeToEvent>0 && iReminded==false && arrayEvents[i].isRemind==true){

                document.querySelector('div.remindContent').insertAdjacentHTML("beforeend","<div value='"+i+"' class='reminders'>"+`<p class='remindtitle'>Recuerda: ${arrayEvents[i].title}</p>`+"</div>");
                document.querySelector('div.reminders:last-of-type').insertAdjacentHTML("beforeend","<button class='showRemindText' onclick='showRemindText(this); this.onclick=null;'><span>+</span></button>");
                setTimeout(deleteRemind,10000)
                arrayEvents[i].isReminded=true;
            }
        }
    }
}

function showRemindText(specificButton) {
   
    let specificDiv=specificButton.parentElement;
    for(i=0;i<arrayEvents.length;i++){
        if(specificDiv.getAttribute('value')==i){
                document.querySelector('section.reminder').insertAdjacentHTML("beforeend",`<div class='reminderText'><button class='closeRemindText' onclick='closeRemindText(this);'><span>x</span></button><p class='remindRefer'>${arrayEvents[i].title}</p> <p class='remindParagraf'> ${arrayEvents[i].eventText}</p><div>`);

        }
    }
}
function closeRemindText(specificText){
    let specificDivText=specificText.parentElement;
    console.log(specificDivText)
    document.querySelector('section.reminder').removeChild(specificDivText);
    
}
function deleteRemind() {
    document.querySelector('div.remindContent').removeChild(document.querySelector('div.reminders'));
}
setInterval(remind,10000);
//_________________________esta función muestra el formulario de nuevo evento
function callTemplate() {
    //___________________________________________________________copiar y añadir hijo desde el template
    let newEvent = document.querySelector("template.newEvent");
    const importNewEvent = document.importNode(newEvent.content, true);
    document.body.appendChild(importNewEvent);

    //______________________________________________________________________________añade los EventListeners para los botones
   
    
    document.getElementById('closeButton-shape').addEventListener('click', closeEvent);
    document.getElementById('cancel-button').addEventListener('click', closeEvent);
    document.getElementById('formEvent').addEventListener('submit', saveDataAndCloseEvent, true);
}

//____________________________________________________ habilitar los recordatorios
function habilitarReminder(remind) {
    let renindImputs = document.querySelectorAll(".habitiation");
    if (remind.checked == true) {
        renindImputs.forEach(element => {
            element.removeAttribute("disabled");
        });
    } else {
        renindImputs.forEach(element => {
            element.setAttribute("disabled", "")
        });
    }
}

//____________________________________________________ habilitar la fecha final
function habilitarDate(date) {
    let imput = document.getElementById("final-date");
    if (date.checked == true) {
        imput.removeAttribute("disabled")
    } else {
        imput.setAttribute("disabled", "")
    }
};
function callTemplate2() {
    let newEvent = document.querySelector("template.Event");
        const importNewEvent = document.importNode(newEvent.content, true);
        document.querySelector("body").appendChild(importNewEvent);
        
}

//____________________________________________________ esta función cierra el formulario de nuevo evento
function closeEvent2(){
    document.querySelector("body").removeChild(document.getElementById("EventDate"));
    document.querySelector("body").removeChild(document.getElementById("fondo"));
}
function closeEvent(){
    document.querySelector("body").removeChild(document.getElementById("eventContent"));
    document.querySelector("body").removeChild(document.getElementById("formEvent"));
    

}

//____________________________________________________ esta función añade el evento a guardar en el calendario
function addEventInCalendar(event){
    var firstDayMonth = new Date(dateSelected.getFullYear(), dateSelected.getMonth(), 1).getDay();
    var dateTemp = new Date(event.idate);
    
    if(dateTemp.getMonth() == dateSelected.getMonth()){
        let father;
        if (firstDayMonth == 0) {
            father = document.getElementsByClassName("grid-day")[5 + dateTemp.getDate()];
        }
        else {
            father = document.getElementsByClassName("grid-day")[firstDayMonth + dateTemp.getDate() - 2];
        }
        let eventsInDay = father.getElementsByClassName("event-box").length;
        let eventMax = father.getElementsByClassName("more-event-box")[0];
        if(eventsInDay < 1){
            father.insertAdjacentHTML("beforeend", "<div class='event-box' onclick='callTemplate2()'>" + event.title + "</div>");
        }
        else if((eventsInDay == 1)&&(!eventMax)){
            father.insertAdjacentHTML("beforeend", "<div class='more-event-box'>...</div>");
        }
    }
}

//____________________________________________________ esta función guarda los datos en localStorage y cierra el formulario
function saveDataAndCloseEvent(evt){
    evt.preventDefault();

    let event = {
        title: document.getElementById("event-tittle").value,
        idate: document.getElementById("initial-date").value,
        isFDate: document.getElementById("final-date-option").checked,
        fdate: document.getElementById("final-date").value,
        isRemind: document.getElementById("remind-option").checked,
        remindTime: document.getElementById("time-remind").value,
        eventText: document.getElementById("remindText").value,
        eventType: document.getElementById("event-type").value,
        isReminded: false
    };

    let jsonString = JSON.stringify(event);
    let keyJson = "event" + arrayEvents.length;
    localStorage.setItem(keyJson, jsonString);

    updateEventsArrayFromLocalStorage();
    addEventInCalendar(event);
    

    closeEvent();
    
}
console.log(event);