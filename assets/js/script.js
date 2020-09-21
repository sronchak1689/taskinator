var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function (event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("Please Fill out all fields...stupid!");
        return false;
    }

    var isEdit = formEl.hasAttribute("data-task-id");
    var completeEditTask = function (taskName, taskType, taskId) {
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        // set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated!");

        // remove data attribute from form
        formEl.removeAttribute("data-task-id");
        // update formEl button to go back to saying "Add Task" instead of "Edit Task"
        formEl.querySelector("#save-task").textContent = "Add Task";

    };

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        }

        createTaskEl(taskDataObj);
    }

};

var createTaskEl = function (taskDataObj) {

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button")
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // create Status selector
    var statusSelectEl = document.createElement("select");
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // For Loop for choices
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

var taskButtonHandler = function (event) {
    //console.log(event.target);
    var targetEl = event.target;

    // when the edit button click
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // When the Delete button is clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};


var editTask = function (taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;


    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event){
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }


}




formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);









