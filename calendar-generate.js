var year = 2021;
var month = 1;  // Month in number format: January -> 0 and December -> 11

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

generateCalendar(month);

function generateCalendar(p_month){
    p_month++;
    var daysMonth = new Date(year, p_month, 0).getDate();

    generateGridEmpty();
    
    // The next lines insert the week days in the grid
    for(var i = 0; i < weekDays.length; i++){
        document.getElementsByClassName("week-day")[i].innerHTML = weekDays[i];
    }
    
    for (var i = 0; i < daysMonth; i++) {
        document.getElementsByClassName("grid-day")[i].innerHTML = i+1;
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