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
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res){
            console.log(res); //res is JSON string
        },
        error: function(error){
            console.log(error);

            alert("Unexpected error");
        }
    });

    displayTask(task);


}

function displayTask(task){
    let syntax =`<div class="task"> 
    <div class="col1">
    <h3> ${task.tittle} </h3> 
    <p> ${task.description} </p>
    </div>

    <div class="col2">
    <label>${task.duedate}</label>
    <label>${task.category}</label>
    </div>
    <div class="col3">
    <label>${task.contact}</label>
    <label>${task.status}</label>
    </div>
    
    </div>`;
    $(".list-container").append(syntax);

}
function testRequest(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        } 
    });

}

function loadTasks(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            let data = JSON.parse(response); //will parse the json string into JS objects
            console.log(data);
            for(let i=0; i<data.length; i++){
                let task = data[i]; //get every obj
                if(task.name== "Kevin"){
                displayTask(task);

            }
        }
        },
        error: function(error){
            console.log(error);
        }
    });

}



function init(){

    console.log("Task manager");

// loads data
loadTasks();

// assigns events
$("#iImportant").click(toggleImportant);
$("#btn-list").click(toggleForm);
$("#btnSave").click(saveTask);

}


window.onload = init;