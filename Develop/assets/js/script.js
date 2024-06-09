// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const addTaskButton = document.querySelector("#add-task-btn");

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const { id, title, description, duedate, status } = task;
    const taskCard = $(`
      <div class="card task-card mb-3" data-id="${id}" data-status="${status}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><strong>Deadline:</strong> ${dayjs(duedate).format('MM-DD-YYYY')}</p>
          <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `);

    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();
  
    taskList.forEach(task => {
      const taskCard = createTaskCard(task);
      $(`#${task.status}-cards`).append(taskCard);
    });
  
    $(".task-card").draggable({
      revert: "invalid",
      cursor: "move",
      helper: "clone"
    });
  }


// Todo: create a function to handle adding a new task
function handleAddTask(){
  
    const title = $("#task-title").val().trim();
    const description = $("#task-desc").val().trim();
    const duedate = $("#task-duedate").val();
    const status = "todo";
  
    if (title && description && duedate) {
      const newTask = {
        id: generateTaskId(),
        title,
        description,
        duedate,
        status
      };
  
      taskList.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(taskList));
      localStorage.setItem("nextId", nextId);
      
      $("#formModal").modal("hide");
      $("#task-title").val("");
      $("#task-desc").val("");
      $("#task-duedate").val("");
  
      renderTaskList();
    }
  }

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

// Event Listener for add task.
addTaskButton.addEventListener('click', function (event) {
handleAddTask();
});

$(document).ready(function () {
    renderTaskList();
  
    $("#formModal").on("shown.bs.modal", function () {
      $("#title").focus();
    });
  
    $("#addTaskForm").on("submit", handleAddTask);
  
    $(document).on("click", ".delete-btn", handleDeleteTask);
  
    $(".lane").droppable({
      accept: ".task-card",
      drop: handleDrop
    });
  
    $("#deadline").datepicker({
      dateFormat: "yy-mm-dd"
    });
  });