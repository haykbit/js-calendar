var month = 1;
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

generateCalendar(month);

function generateCalendar(month){
    generateGridEmpty();
}

function generateGridEmpty(){
    for(i=0 ; i<49 ; i++){
        if(i<8){
            document.querySelector("main").insertAdjacentHTML("beforeend", "<div class='week-day'></div>");
        }
        else{
            document.querySelector("main").insertAdjacentHTML("beforeend", "<div></div>");
        }
    }
}