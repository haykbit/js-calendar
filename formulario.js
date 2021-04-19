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
        console.log(arrayEvents[i].idate)
    }

}
function remind() {

    if (arrayEvents.length == 0) {
        console.log('Do not execute')
    } else {

        for (i = 0; i < arrayEvents.length; i++) {

            let iReminded = arrayEvents[i].isReminded;
            let fechaInicial = arrayEvents[i].idate;
            let remindTime = arrayEvents[i].remindTime * 60000;

            //let secInitial= new Date(fechaInicial).getTime();
            let secInicio = new Date(fechaInicial).getTime();

            let remindNaw = secInicio - remindTime;
            console.log('momento en el que debe empezar a recordar', remindNaw)
            let timeToEvent = (secInicio - new Date().getTime());
            if (timeToEvent <= remindTime && timeToEvent > 0 && iReminded == false && arrayEvents[i].isRemind == true) {

                document.querySelector('div.remindContent').insertAdjacentHTML("beforeend", "<div value='" + i + "' class='reminders'>" + `<p class='remindtitle'>Recuerda: ${arrayEvents[i].title}</p>` + "</div>");
                document.querySelector('div.reminders:last-of-type').insertAdjacentHTML("beforeend", "<button class='showRemindText' onclick='showRemindText(this); this.onclick=null;'><span>+</span></button>");
                setTimeout(deleteRemind, 10000)
                arrayEvents[i].isReminded = true;
                let object = JSON.parse(localStorage.getItem(i));
                object.isReminded = true;
                localStorage.setItem(i, JSON.stringify(object));



            }
        }
    }
}

function showRemindText(specificButton) {

    let specificDiv = specificButton.parentElement;
    for (i = 0; i < arrayEvents.length; i++) {
        if (specificDiv.getAttribute('value') == i) {
            document.querySelector('section.reminder').insertAdjacentHTML("beforeend", `<div class='reminderText'><button class='closeRemindText' onclick='closeRemindText(this);'><span>x</span></button><p class='remindRefer'>${arrayEvents[i].title}</p> <p class='remindParagraf'> ${arrayEvents[i].eventText}</p><div>`);

        }
    }
}
function closeRemindText(specificText) {
    let specificDivText = specificText.parentElement;
    console.log(specificDivText)
    document.querySelector('section.reminder').removeChild(specificDivText);

}
function deleteRemind() {
    document.querySelector('div.remindContent').removeChild(document.querySelector('div.reminders'));
}
setInterval(remind, 10000);
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
    let remindLabel = document.querySelectorAll("label.RemindLabel");
    if (remind.checked == true) {
        renindImputs.forEach(element => {
            element.removeAttribute("disabled");
            //element.style.marginTop='3%';
            element.style.background = 'linear-gradient(5deg,rgba(105, 94, 255,0.05),rgba(248, 247, 253,0))'

        });

        remindLabel.forEach(element => {
            element.style.color = 'rgb(105, 94, 255)';
            element.style.fontSize = '16px';
            element.style.fontWeight = '700';
            element.style.marginBottom = '3%';

        });
    } else {
        renindImputs.forEach(element => {
            element.setAttribute("disabled", "")
        });
        remindLabel.forEach(element => {
            element.style.color = 'rgb(161, 161, 161)';
            element.style.fontSize = ' 15px';
            element.style.fontWeight = '300';
            element.style.marginBottom = '';

        });
    }
}

//____________________________________________________ habilitar la fecha final
function habilitarDate(date) {
    let imput = document.getElementById("final-date");
    if (date.checked == true) {
        imput.removeAttribute("disabled")
        document.getElementById('finalDateName').style.color = 'rgb(105, 94, 255)';
        document.getElementById('finalDateName').style.fontWeight = '700';
        document.getElementById('finalDateName').style.fontSize = '16px';
    } else {
        imput.setAttribute("disabled", "")
        document.getElementById('finalDateName').style.color = 'rgb(161, 161, 161)';
        document.getElementById('finalDateName').style.fontWeight = '300';
        document.getElementById('finalDateName').style.fontSize = '15px';
    }
};

function callTemplate2(event) {
    if ((event.target == event.currentTarget ||
        (event.target == event.currentTarget.getElementsByClassName("numberDayGrid")[0]) ||
        (event.target == event.currentTarget.getElementsByClassName("more-event-box")[0]))) {

        let newEvent = document.querySelector("template.Event");
        const importNewEvent = document.importNode(newEvent.content, true);
        document.querySelector("body").appendChild(importNewEvent);

        var singleEvent = document.getElementById("enventTitleVisual");
        var titleSingleEvent = singleEvent.querySelector("h1");
        var dateSingleEvent = document.getElementById("dateCurrentEvent");
        var timeSingleEvent = document.getElementById("timeCurrentEvent");
        var endDateSingleEvent = document.getElementById("endDateCurrentEvent");
        var endTimeSingleEvent = document.getElementById("endTimeCurrentEvent");
        var typeSingleEvent = document.getElementById("typeText");
        var dSingleEvent = document.getElementById("description");
        var descSingleEvent = dSingleEvent.querySelector("h5");

        var eventValue = event.currentTarget.getAttribute('value');
        var eventTime = arrayEvents[eventValue].idate;
        var eventEndTime = arrayEvents[eventValue].fdate;

        titleSingleEvent.innerHTML = arrayEvents[eventValue].title;
        dateSingleEvent.innerHTML = eventTime.split("T")[0];
        timeSingleEvent.innerHTML = eventTime.split("T")[1];

        if (arrayEvents[eventValue].isFDate == false) {
            document.getElementById("fiDate").style.visibility = "hidden";
        }
        else {
            endDateSingleEvent.innerHTML = eventEndTime.split("T")[0];
            endTimeSingleEvent.innerHTML = eventEndTime.split("T")[1];
        }

        if (arrayEvents[eventValue].eventType == "Meeting") {
            typeSingleEvent.insertAdjacentHTML("beforeend", "<h5 class='titleDataContent' id='typeOfEvent'><img src='img/circle-meeting.png' width='16px height='16px'/>&nbsp" + arrayEvents[eventValue].eventType);
        } else if (arrayEvents[eventValue].eventType == "Personal") {
            typeSingleEvent.insertAdjacentHTML("beforeend", "<h5 class='titleDataContent' id='typeOfEvent'><img src='img/circle-personal.png' width='16px height='16px'/>&nbsp" + arrayEvents[eventValue].eventType);
        } else if (arrayEvents[eventValue].eventType == "Studing") {
            typeSingleEvent.insertAdjacentHTML("beforeend", "<h5 class='titleDataContent' id='typeOfEvent'><img src='img/circle-studing.png' width='16px height='16px'/>&nbsp" + arrayEvents[eventValue].eventType);
        }

        if (arrayEvents[eventValue].isRemind == true) {
            descSingleEvent.innerHTML = arrayEvents[eventValue].eventText;
        } else {
            console.log(document.getElementById("dSingleEvent"));
        }
        //document.getElementById('eliminate-button').addEventListener('click', eliminateElementFromDayEvents(event));
        document.getElementById('closeButton-visual').addEventListener('click', closeEvent2);
        if (document.getElementById('EventDate')) {
            document.getElementById('eliminate-button').addEventListener('click', function () {
                eliminateEvent(eventValue);
                document.querySelector("body").removeChild(document.getElementById('EventDate'));
                document.querySelector("body").removeChild(document.getElementById('fondo'));
            });
        }
    }
};

function callTemplateDayEvents(event) {
    if ((event.target == event.currentTarget) ||
        (event.target == event.currentTarget.getElementsByClassName("numberDayGrid")[0]) ||
        (event.target == event.currentTarget.getElementsByClassName("more-event-box")[0])) {
        let newEvent = document.querySelector("template.DayEvents");
        const importNewEvent = document.importNode(newEvent.content, true);
        document.querySelector("body").appendChild(importNewEvent);

        var dateEvent = event.currentTarget.getElementsByClassName("numberDayGrid")[0].innerHTML;
        var dayEvent = new Date(dateSelected.getFullYear(), dateSelected.getMonth(), dateEvent).getDay();
        var monthEvent = dateSelected.getMonth();
        var yearEvent = dateSelected.getFullYear();

        if (dayEvent == 0) {
            document.getElementById("title-DayEvents").innerHTML = weekDays[6] + ", " + dateEvent + " of " + monthsYear[monthEvent] + " of " + yearEvent;
        }
        else {
            document.getElementById("title-DayEvents").innerHTML = weekDays[dayEvent - 1] + ", " + dateEvent + " of " + monthsYear[monthEvent] + " of " + yearEvent;
        }

        for (var i = 0; i < arrayEvents.length; i++) {
            var eventDate = new Date(arrayEvents[i].idate).getDate();
            if (eventDate == dateEvent) {
                var timeHour = new Date(arrayEvents[i].idate).getHours();
                var timeMinute = new Date(arrayEvents[i].idate).getMinutes();
                if (timeHour < 10) { timeHour = "0" + timeHour; }
                if (timeMinute < 10) { timeMinute = "0" + timeMinute; }
                document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='wrapper-event' value='" + i + "' onclick='callTemplate2(event)'><div class='information-DayEvents' onclick='callTemplate2(event)'><div class='title-specific-DayEvents'><p>" + arrayEvents[i].title + "</p></div><div class='time-DayEvents'>" + timeHour + ":" + timeMinute + "</div></div><div class='icon-eliminate-DayEvents-wrapper'><div onclick='eliminateElementFromDayEvents(event)'><img src='img/remove(1).png' width='32px' height='32px' /></div></div></div>");
            }
        }

        var re = new RegExp('[a-z]');
        if (!event.currentTarget.lastChild.innerHTML.match(re)) {
            document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='addNewEvent'><div class='information-DayEvents'><input type='button' value='+'/ onclick='callTemplate()'></div></div>");
        }

    }
}

//____________________________________________________ esta función cierra el formulario de nuevo evento
function closeDayEvents() {
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
    for (var i = 0; i < arrayEvents.length; i++) {
        var objectTemp = arrayEvents[i];
        var dateTemp = new Date(objectTemp.idate);
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
                father.insertAdjacentHTML("beforeend", "<div class='event-box' onclick='callTemplate2(event)' value='" + ID + "'><p onclick='callTemplate2(event)' value='" + ID + "'>" + event.title + "</p></div>");
            }
            else if ((eventsInDay == 1) && (!eventMax)) {
                father.insertAdjacentHTML("beforeend", "<div class='more-event-box'>...</div>");
            }
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
        eventType: document.getElementById("event-type").value,
        isReminded: false
    };

    let jsonString = JSON.stringify(event);
    localStorage.setItem(arrayEvents.length, jsonString);

    updateEventsArrayFromLocalStorage();
    addEventInCalendar(arrayEvents.length - 1, event);

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
        if (i < eventId) {
            var objectTempCopy = Object.assign({}, objectTemp);
            arrayTemp.push(objectTempCopy);
        }
        else if (i > eventId) {
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

function eliminateElementFromDayEvents(event) {
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
        if (eventDate == dateEvent) {
            var timeHour = new Date(arrayEvents[i].idate).getHours();
            var timeMinute = new Date(arrayEvents[i].idate).getMinutes();
            if (timeHour < 10) { timeHour = "0" + timeHour; }
            if (timeMinute < 10) { timeMinute = "0" + timeMinute; }
            document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='wrapper-event' value='" + i + "' onclick='callTemplate2(event)'><div class='information-DayEvents' onclick='callTemplate2(event)'><div class='title-specific-DayEvents'>" + arrayEvents[i].title + "</div><div class='time-DayEvents'>" + timeHour + ":" + timeMinute + "</div></div><div class='icon-eliminate-DayEvents-wrapper'><div onclick='eliminateElementFromDayEvents(event)'><img src='img/remove(1).png' width='32px' height='32px' /></div></div></div>");
        }
    }

    var re = new RegExp('[a-z]');
    var re2 = new RegExp('[A-Z]');
    if (!event.currentTarget.lastChild.innerHTML.match(re) && !event.currentTarget.lastChild.innerHTML.match(re2)) {
        document.getElementById("section-DayEvents").insertAdjacentHTML("beforeend", "<div class='addNewEvent'><div class='information-DayEvents'><input type='button' value='+'/ onclick='callTemplate()'></div></div>");
    }

}
