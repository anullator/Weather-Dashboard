// Retrieve tasks from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));

// ✅ create a function to generate a unique task id
function generateTaskId() {
    return Math.floor(Math.random()*Date.now()).toString(16).trim();
}

// TODO: create a function to create a task card
function createTaskCard(task, currDate) {

    // determine days from today until the due date
    const remainingDays = currDate.diff(task.dueDate, 'day')*-1;
    let daysLeft;

    // create all elements
    const containerEl = document.createElement("article");
    const h3El = document.createElement("h3");
    const descEl = document.createElement("p");
    const daysTilDue = document.createElement("p");
    const timeEl = document.createElement("time");
    const btnEl = document.createElement("button");

    // sets text based on days until deadline
    if (remainingDays > 0) {
        daysLeft = `Due in ${remainingDays} days`;
        containerEl.classList.add('not-due');
    } else if (remainingDays === 1) {
        daysLeft = 'Due tomorrow';
        containerEl.classList.add('due-soon');
    } else if (remainingDays == 0) {
        daysLeft = 'Due today';
        containerEl.classList.add('due-soon');
    } else {
        daysLeft = `${Math.abs(remainingDays)} days overdue`;
        containerEl.classList.add('past-due');
    }

    // sets content of each html element in the task card
    h3El.textContent = task.title;
    daysTilDue.textContent = daysLeft;
    descEl.textContent = task.description;
    timeEl.textContent = task.dueDate;
    btnEl.textContent = "Delete";

    // TODO: add necessary classes to the elements including for styling
    // container classes
    containerEl.classList.add("task-card");
    containerEl.setAttribute('id', task.id);
    btnEl.classList.add('delete-btn');

    // add elmts to container
    containerEl.appendChild(h3El);
    containerEl.appendChild(daysTilDue);
    containerEl.appendChild(descEl);
    containerEl.appendChild(timeEl);
    containerEl.appendChild(btnEl);

    return containerEl;
}

// TODO: create a function to render the task list and make cards draggable
function renderTaskList() {
    // clear current task cards
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    const todayObj = dayjs(); // today's date
    const storedTasks = localStorage.getItem("tasks"); // retrieve tasks from storage
    
    // converts JSON tasks to js
    taskList = JSON.parse(storedTasks); 

        taskList.forEach(task => {
        const nextTask = createTaskCard(task, todayObj); // creates new task card

        // add task cards to appropriate container based on status
        if (task.status === 'to-do') {
            $("#todo-cards").append(nextTask); // adds task card to todo container
        } else if (task.status === 'in-progress') {
            $("#in-progress-cards").append(nextTask); // adds task card to in progress container 
        } else {
            $("#done-cards").append(nextTask); // adds task card to done container 
        }      
    });

    // make cards draggable
    $('.task-card').draggable({
        containment: '.swim-lanes',
        revert: true,
    });
}

// create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    // assign input content to variables
    const title = $("#title").val().trim();
    const dueDate = $("#due-date").val().trim(); 
    const description = $("#description").val().trim();

    taskList = [];
    const id = generateTaskId(); // creates unique id

    // create task object
    const task = {
        id: id,
        title: title,
        dueDate: dueDate, 
        description: description, 
        status: "to-do",
    };

    // checks that all inputs are valid
    if (!title || !dueDate || !description) {
        alert("All inputs are required to add a task.");
        return;
    }

    // gets tasks and IDs from local storage
    if (localStorage.length !== 0) {

        const currTasks = localStorage.getItem("tasks");
        taskList = JSON.parse(currTasks);
    }

    // add new task to task list array
    taskList.push(task);

    // update task list in local storage
    const stringList = JSON.stringify(taskList);
    localStorage.setItem("tasks", stringList);

    // empty form input fields
    $("#title").val("");
    $("#due-date").val(""); 
    $("#description").val("");

    renderTaskList();
}

// TODO: create a function to handle deleting a task
function handleDeleteTask(event) {
    const task = event.target.closest('.task-card');
    const id =task.getAttribute('id');
    $(`#${id}`).remove();

    const indexToRemove = taskList.findIndex((task) => task.id === id);
    taskList.splice(indexToRemove, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// TODO: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();

    // store dragged card content in a variable
    const taskId = ui.draggable.attr('id');
    const parentId = event.target.id;

    // delete task from current parent
    $(`#${taskId}`).remove();

    // change status to column dropped on
    const updatedTask = taskList.find((task) => task.id === taskId);
    updatedTask.status = parentId;
    
    // add updated task to local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // render all task cards
    if (localStorage.length !== 0) { 
        renderTaskList();
    }

    // add event listener to open modal
    $("[type='submit']").on("click", handleAddTask);

    //add event listener to delete button
    $(".task-card").on("click", ".delete-btn", handleDeleteTask);

    // add droppable to columns
    $(function () {
        $('.lane').droppable({
            accept: '.task-card',
            drop: handleDrop,
        });
    })

    // make due date a date picker 
    $('#due-date').datepicker();
});


//TEST STATEMENTS
