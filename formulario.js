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
        let eventSelected = "event" + i;
        let objectTemp = JSON.parse(localStorage.getItem(eventSelected));
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

//____________________________________________________ esta función cierra el formulario de nuevo evento
function closeEvent2() {
    document.querySelector("body").removeChild(document.getElementById("EventDate"));
    document.querySelector("body").removeChild(document.getElementById("fondo"));
};

function closeEvent() {
    document.querySelector("body").removeChild(document.getElementById("eventContent"));
    document.querySelector("body").removeChild(document.getElementById("formEvent"));
};

//____________________________________________________ esta función añade el evento a guardar en el calendario
function addEventInCalendar(event) {
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
            father.insertAdjacentHTML("beforeend", "<div class='event-box' onclick='callTemplate2()'>" + event.title + "</div>");
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
    let keyJson = "event" + arrayEvents.length;
    localStorage.setItem(keyJson, jsonString);

    updateEventsArrayFromLocalStorage();
    addEventInCalendar(event);

    closeEvent();
};