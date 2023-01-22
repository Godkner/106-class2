var importantIcon = "fa-solid fa-face-grin-stars";
var nonImportantIcon ="fa-solid fa-face-dizzy";
var isImportant=true;

function toggleImportant(){
    console.log("Icon Clicked");

    if(isImportant){
        $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
        isImportant=false;
    } else{
        // change important
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
        isImportant=true;

    }   
}

function toggleForm(){
    console.log("button clicked");
    $(".form-container").toggle();
}

function saveTask(){
    console.log("user resgistered");
    let tittle = $("#txtTittle").val(); // read the text from the control
    let description = $("#txtDescription").val();
    let duedate= $("#selDueDate").val();
    let category= $("#selCategory").val();
    let contact= $("#txtContact").val();
    let status= $("#selStatus").val();

    // console.log(tittle,description,duedate,contact,category,status);
    let task= new Task(tittle,description,duedate,category,contact,status,isImportant);
    console.log(task);
    // save logic

    displayTask(task);


}

function displayTask(task){
    let syntax =`<div class="task"> 
    <div>
    <h3> ${task.tittle} </h3> 
    <p> ${task.description} </p>
    </div>

    <div>
    <label>${task.duedate}</label>
    <label>${task.category}</label>
    </div>
    <div>
    <label>${task.contact}</label>
    <label>${task.status}</label>
    </div>
    
    </div>`;
    $(".list-container").append(syntax);

}




function init(){

    console.log("Task manager");

// loads data

// assigns events
$("#iImportant").click(toggleImportant);
$("#btn-list").click(toggleForm);
$("#btnSave").click(saveTask);

}


window.onload = init;