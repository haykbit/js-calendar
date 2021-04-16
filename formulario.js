// This variable saves the date shown in the calendar
var dateSelected = new Date();

// Defined constants to display the correct text
const monthsYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//___________________en este array se guardarán todos los eventos guardados en el localStorage
let arrayEvents = [];
let inputDate;

//___________________________________________________________________________________añadido la llamada del botón para llamar al template
document.getElementById("add-event-button").addEventListener("click", callTemplate);

//__________________________________actualizamos el array de eventos apenas iniciamos la página
updateEventsArrayFromLocalStorage();

//___________________________________________en esta función actualizamos el array desde los datos del localStorage
function updateEventsArrayFromLocalStorage() {
    arrayEvents = [];

    for (let i = 0; i < localStorage.length; i++) {
        let objectTemp = JSON.parse(localStorage.getItem(i));
        arrayEvents.push(objectTemp);
    }
};

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

    document.getElementById('closeButton-visual').addEventListener('click', closeEvent2);
};

function callTemplateDayEvents(event){
    if((event.target == event.currentTarget)||
    (event.target == event.currentTarget.getElementsByClassName("numberDayGrid")[0])||
    (event.target == event.currentTarget.getElementsByClassName("more-event-box")[0])){
        let newEvent = document.querySelector("template.DayEvents");
        const importNewEvent = document.importNode(newEvent.content, true);
        document.querySelector("body").appendChild(importNewEvent);
    
        var dateEvent = event.currentTarget.getElementsByClassName("numberDayGrid")[0].innerHTML;
        var dayEvent = new Date(dateSelected.getFullYear(), dateSelected.getMonth(), dateEvent).getDay();
        var monthEvent = dateSelected.getMonth();
        var yearEvent = dateSelected.getFullYear();
    
        if(dayEvent == 0){
            document.getElementById("title-DayEvents").innerHTML = weekDays[6] + ", " + dateEvent + " of " + monthsYear[monthEvent] + " of " + yearEvent;
        }
        else{
            document.getElementById("title-DayEvents").innerHTML = weekDays[dayEvent-1] + ", " + dateEvent + " of " + monthsYear[monthEvent] + " of " + yearEvent;
        }
    
        for (var i = 0; i < arrayEvents.length; i++) {
            var eventDate = new Date(arrayEvents[i].idate).getDate();
            if(eventDate == dateEvent){
                var timeHour = new Date(arrayEvents[i].idate).getHours();
                var timeMinute = new Date(arrayEvents[i].idate).getMinutes();
                if(timeHour < 10){ timeHour = "0" + timeHour; }
                if(timeMinute < 10){ timeMinute = "0" + timeMinute; }
                document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='wrapper-event' value='" + i + "'><div class='information-DayEvents'><div class='title-specific-DayEvents'>" + arrayEvents[i].title + "</div><div class='time-DayEvents'>" + timeHour + ":" + timeMinute + "</div></div><div class='icon-eliminate-DayEvents-wrapper'><div onclick='eliminateElementFromDayEvents(event)'>x</div></div></div>");
            }
        }
    }
}

//____________________________________________________ esta función cierra el formulario de nuevo evento
function closeDayEvents(){
    document.querySelector("body").removeChild(document.getElementById("window-DayEvents"));
    document.querySelector("body").removeChild(document.getElementById("background-DayEvents"));
}
function closeEvent2() {
    document.querySelector("body").removeChild(document.getElementById("EventDate"));
    document.querySelector("body").removeChild(document.getElementById("fondo"));
};

function closeEvent() {
    document.querySelector("body").removeChild(document.getElementById("eventContent"));
    document.querySelector("body").removeChild(document.getElementById("formEvent"));
};

//____________________________________________________ esta función añade el evento a guardar en el calendario
function addEventInCalendar(ID, event) {
    var firstDayMonth = new Date(dateSelected.getFullYear(), dateSelected.getMonth(), 1).getDay();
    var dateTemp = new Date(event.idate);

    if (dateTemp.getMonth() == dateSelected.getMonth()) {
        let father;
        if (firstDayMonth == 0) {
            father = document.getElementsByClassName("grid-day")[5 + dateTemp.getDate()];
        }
        else {
            father = document.getElementsByClassName("grid-day")[firstDayMonth + dateTemp.getDate() - 2];
        }
        let eventsInDay = father.getElementsByClassName("event-box").length;
        let eventMax = father.getElementsByClassName("more-event-box")[0];
        if (eventsInDay < 1) {
            father.insertAdjacentHTML("beforeend", "<div class='event-box' onclick='callTemplate2()' value='" + ID + "'>" + event.title + "</div>");
        }
        else if ((eventsInDay == 1) && (!eventMax)) {
            father.insertAdjacentHTML("beforeend", "<div class='more-event-box'>...</div>");
        }
    }
};

//____________________________________________________ esta función guarda los datos en localStorage y cierra el formulario
function saveDataAndCloseEvent(evt) {
    evt.preventDefault();

    let event = {
        title: document.getElementById("event-tittle").value,
        idate: document.getElementById("initial-date").value,
        isFDate: document.getElementById("final-date-option").checked,
        fdate: document.getElementById("final-date").value,
        isRemind: document.getElementById("remind-option").checked,
        remindTime: document.getElementById("time-remind").value,
        eventText: document.getElementById("remindText").value,
        eventType: document.getElementById("event-type").value
    };

    let jsonString = JSON.stringify(event);
    localStorage.setItem(arrayEvents.length, jsonString);

    updateEventsArrayFromLocalStorage();
    addEventInCalendar(arrayEvents.length-1, event);

    closeEvent();
}

function eliminateEvent(eventId) {
    var arrayTemp = [];
    var objectTemp = {
        key: "",
        value: ""
    };

    for (var i = 0; i < localStorage.length; i++) {
        objectTemp.key = i;
        objectTemp.value = localStorage.getItem(objectTemp.key);
        if(i < eventId){
            var objectTempCopy = Object.assign({}, objectTemp);
            arrayTemp.push(objectTempCopy);
        }
        else if(i > eventId){
            objectTemp.key = (i - 1);
            var objectTempCopy = Object.assign({}, objectTemp);
            arrayTemp.push(objectTempCopy);
        }
    }

    localStorage.clear();

    for (var i = 0; i < arrayTemp.length; i++) {
        localStorage.setItem(arrayTemp[i].key, arrayTemp[i].value);
    }

    updateEventsArrayFromLocalStorage();
    generateCalendar(dateSelected.getFullYear(), dateSelected.getMonth());
}

function eliminateElementFromDayEvents(event){
    var eventValueElement = event.currentTarget.parentElement.parentElement;
    var eventID = eventValueElement.getAttribute("value");
    var wrapperElementFather = eventValueElement.parentElement;

    while (wrapperElementFather.firstChild) {
        wrapperElementFather.removeChild(wrapperElementFather.firstChild);
    }
    
    var dateEvent = new Date(arrayEvents[eventID].idate).getDate();
    eliminateEvent(eventID);

    for (var i = 0; i < arrayEvents.length; i++) {
        var eventDate = new Date(arrayEvents[i].idate).getDate();
        if(eventDate == dateEvent){
            var timeHour = new Date(arrayEvents[i].idate).getHours();
            var timeMinute = new Date(arrayEvents[i].idate).getMinutes();
            if(timeHour < 10){ timeHour = "0" + timeHour; }
            if(timeMinute < 10){ timeMinute = "0" + timeMinute; }
            document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='wrapper-event' value='" + i + "'><div class='information-DayEvents'><div class='title-specific-DayEvents'>" + arrayEvents[i].title + "</div><div class='time-DayEvents'>" + timeHour + ":" + timeMinute + "</div></div><div class='icon-eliminate-DayEvents-wrapper'><div onclick='eliminateElementFromDayEvents(event)'>x</div></div></div>");
        }
    }
}
