var year = 2025;
var month = 5;  // Month in number format: January -> 0 and December -> 11

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

generateCalendar(year, month);

function generateCalendar(p_year, p_month){
    var daysMonth = new Date(p_year, p_month+1, 0).getDate();
    var firstDayMonth = new Date(p_year, p_month, 1). getDay();

    generateGridEmpty();
    
    // The next lines insert the week days in the grid and the id's in the first line in the grid
    for(var i = 0; i < weekDays.length; i++){
        document.getElementsByClassName("week-day")[i].innerHTML = weekDays[i];
    }
    
    // The next lines insert the day numbers in the grid according to the month and year
    for (var i = 0; i < daysMonth; i++) {
        if(firstDayMonth == 0){
            document.getElementsByClassName("grid-day")[i+7-1].innerHTML = i+1;
        }
        else{
            document.getElementsByClassName("grid-day")[i+firstDayMonth-1].innerHTML = i+1;
        }
    }
}

// This function generates the grid in main
function generateGridEmpty(){
    for(var i = 0; i < 49; i++){
        if(i<7){
            document.querySelector("main").insertAdjacentHTML("beforeend", "<div class='week-day'></div>");
        }
        else{
            document.querySelector("main").insertAdjacentHTML("beforeend", "<div class='grid-day'></div>");
        }
    }
}