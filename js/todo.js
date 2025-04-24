let $$ = selector => document.querySelector(selector);
const todoListTasks = tasklist;

// task class
class Task{
    #id;
    #task;
    #status;

    constructor(id, task, status){
        this.#id = id;
        this.#task = task;
        this.#status = status;
    }

    // setter anf getter methods
    get id() {
        return this.#id;
    }

    get task() {
        return this.#task;
    }

    get status() {
        return this.#status;
    }

    set task(value) {
        this.#task = value;
    }
    
    set status(value) {
        this.#status = value;
    }
}

// todo list class
class TodoList {
    #todoListTasks = tasklist;

    // get and set method
    get todoListTasks() {
        return this.#todoListTasks;
    }

    set todoListTasks(value){
        this.#todoListTasks = value;
    }

    // class methods
    createTask(task){
        // this create a new class object
        const newTask = new Task((this.todoListTasks.length + 1), task, "open");
        // push the object while assigning the key of each attribute
        this.todoListTasks.push({
            "id": newTask.id,
            "task": newTask.task,
            "status": newTask.status
        });
        
        // update the display
        this.displayTaskList();
    }
    
    editTask(id, newTask){
        // this will find the certain task with the same id
        const task = this.todoListTasks.find(task => task.id === id);
        // it assigned the newTask
        task.task = newTask;
        this.displayTaskList();
    }
        
    removeTask(value){
        // overwrite the array using filter to not include the task.id that is equal to value
        this.todoListTasks = this.todoListTasks.filter(task => task.id !== value);
        this.displayTaskList();
    }
    
    removeAllComplete(){
        // overwrite the array using filter to not include the task.status that is equal to done
        this.todoListTasks = this.todoListTasks.filter(task => task.status !== "done");
        this.displayTaskList();
    }

    displayTaskDone(){
        let taskCounter = $$("#task-counter");
        
        // this make an array of task that are done in which the length will be output in the line below
        let countTaskArray = this.#todoListTasks.filter(task => task.status === "done");
        if (this.todoListTasks.length === 0){
            taskCounter.textContent = `No Task Available`;
        }else{
            taskCounter.textContent = `${countTaskArray.length}/${this.todoListTasks.length} Tasks Complete`;
        }
    }

    displayTaskList(){
        // this will show the tasks done
        this.displayTaskDone();

        // this will show eahc tasks that are created
        todoDisplay.innerHTML = "";
        this.#todoListTasks.forEach(task => {
            todoDisplay.innerHTML += `
            <form class="mx-auto py-2 pb-3 mb-4 bg-white rounded-xl">   
                <div class="relative flex items-center mt-1">
                    <input type="checkbox" class="todo-checkbox accent-slate-500 h-10 w-5 ml-4" ${task.status == "done" ? "checked" : ""}>
                    <label class="todo-checkbox-desc text-md text-slate-600 ml-4 ${task.status == "done" ? "line-through" : ""}">${task.task}</label>
                    <!-- This is for the edit part that show up when you press edit btn-->
                    <div class="edit-task-div ml-1 w-full hidden">
                        <input type="input" class="edit-content px-3 py-1.5 w-xl text-slate-600 rounded-xl focus:outline-none" placeholder="Edit Task"/>
                        <button type="button" class="edit-submit bg-slate-400 text-neutral-50 rounded-xl p-1.5 absolute right-3">Submit</button>
                    </div>
                    <button type="button" class="todo-edit rounded-xl text-slate-400 absolute right-18 focus:outline-none px-4 py-2 hover:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                    </button>
                    <button type="button" class="todo-remove rounded-xl text-slate-400 absolute right-2 focus:outline-none px-4 py-2 hover:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </form>
            `;
        });
        
        // query selector for the dynamic DOM
        let editBtns = todoDisplay.querySelectorAll(".todo-edit");
        let editDiv = todoDisplay.querySelectorAll(".edit-task-div");
        let editContent = todoDisplay.querySelectorAll(".edit-content");
        let editSubmit = todoDisplay.querySelectorAll(".edit-submit");
        let removeBtns = todoDisplay.querySelectorAll(".todo-remove");
        let checkboxBtn = todoDisplay.querySelectorAll(".todo-checkbox");
        let checkboxTask = todoDisplay.querySelectorAll(".todo-checkbox-desc");
    
        // event listeners for each button
        
        // this will call for the edit task method
        editBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                // this will hide the task and reveal an input to your edited text
                // now it also hide the buttons and the checkbox, to ensure the only thing user do is edit
                checkboxTask[i].classList.add("hidden");
                editDiv[i].classList.remove("hidden");
                editBtns[i].classList.add("hidden");
                removeBtns[i].classList.add("hidden");
                checkboxBtn[i].classList.add("hidden");

                // put the current description as a value for user to edit
                editContent[i].value = checkboxTask[i].textContent;

                // this make it so if you press enter it revert back to default
                editSubmit.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        if(editContent[i].value.trim() === ""){
                            // display an error msg and turn placheolder text to red
                            editContent[i].placeholder = "Task Content should not be empty";
                            editContent[i].classList.add("placeholder:text-red-700");

                            // its ctrl + z, it undo and return the initial value
                            document.addEventListener('keydown', (e) => {
                                if (e.ctrlKey && e.key === "z"){
                                    editContent[i].value = checkboxTask[i].textContent;
                                }
                            })
                        }else{
                            // if user has comitted an erro before, remove the red text in placeholder
                            editContent[i].classList.remove("placeholder:text-red-700");

                            // this will call upon the editTask, and update the current task with the new one
                            editDiv[i].classList.add("hidden");
                            checkboxTask[i].classList.remove("hidden");
                            this.editTask(this.todoListTasks[i].id, editContent[i].value); 
                        }
                    })
                })
            });
        });
        
        // this will call for remove task method
        removeBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                this.removeTask(this.todoListTasks[i].id);
            });
        });

        // this will change status depending if its check or not
        checkboxBtn.forEach((box, i) => {
            box.addEventListener('change', () => {
                // if status is open, it will change to done then update the counter and add a line-through
                if (this.todoListTasks[i].status === "open"){
                    this.todoListTasks[i].status = "done";
                    checkboxTask[i].classList.add("line-through");
                    this.displayTaskDone();
                }else {
                    // change done to open, update the counter and remove the line-through
                    this.todoListTasks[i].status = "open";
                    checkboxTask[i].classList.remove("line-through"); 
                    this.displayTaskDone();
                }
            })
        })

        // bring the user to the pomodoro timer
        // it used to be just for adding a line-through and makring a task done
        checkboxTask.forEach((text, i) => {
            text.addEventListener('click', () => {
                // this will hide the todo list page, and reveal the pomodoro
                todoListMain.classList.add("hidden");
                pomodoroTimer.classList.remove("hidden");
                
                // this will add a check marked and a line through if the event is done
                if (this.#todoListTasks[i].status == "done"){
                    pomodoroTaskCheck.checked = true;
                    pomodoroTaskDesc.classList.add("line-through");
                    pomodoroTaskDesc.textContent = (this.todoListTasks[i].task);
                }else{
                    pomodoroTaskCheck.checked = false;
                    pomodoroTaskDesc.textContent = (this.todoListTasks[i].task);
                }
            })
        })
    }
}


// pomodoro timer class
class PomodoroTimer {
  
    constructor(min, sec) {
        this.timer = undefined;
        this.min = min;
        this.sec = sec;
    }
    
    // class methods
    updateTimer(){
        // if min and sec is 0, it will call stopTimer()
        if (this.min === 0 && this.sec === 0){
            this.stopTimer();
            return;
        // if onyl sec is 0, it will become 59, and reduce 1 minute
        }else if(this.sec === 0){
            this.sec = 59;
            this.min--;
        // else it just reduce 1 second
        }else{
            this.sec--;
        }

        // show the display
        this.displayTimer();
    }

    startTimer() {
        // called update every second
        this.timer = setInterval(() => {
            this.updateTimer();
        }, 1000);
        this.displayTimer();
    }
  
    stopTimer() {
        // stop the interval
        clearInterval(this.timer);
        this.timer = undefined;
    }

    resetTimer() {
        // stop the timer
        this.stopTimer();

        // reset the min and sec to their initial value
        if(!pomodoroPart.classList.contains("hidden")){
            this.min = 25;
            this.sec = 0;
            this.displayTimer();
        }
        if(!shortBreakPart.classList.contains("hidden")){
            this.min = 5;
            this.sec = 0;
            this.displayTimer();   
        }
        if(!longBreakPart.classList.contains("hidden")){
            this.min = 15;
            this.sec = 0;
            this.displayTimer();
        }
    }
        
    displayTimer() {
        // if certain have hidden it will not display in their <p>
        if(!pomodoroPart.classList.contains("hidden")){
            pomoTimer.textContent = `${this.min}:${String(this.sec).padStart(2, '0')}`;
        }
        if(!shortBreakPart.classList.contains("hidden")){
            shortTimer.textContent = `${this.min}:${String(this.sec).padStart(2, '0')}`;
        }
        if(!longBreakPart.classList.contains("hidden")){
            longTimer.textContent = `${this.min}:${String(this.sec).padStart(2, '0')}`;
        }
    }
}

///////////////////////////////////////////////////////////////////
////////                    todo list part                ////////
/////////////////////////////////////////////////////////////////

// query stuff
let todoListMain = $$("#todo-list");

// tasks query
let addTodoBtn = $$("#add-todo");
let todoDisplay = $$("#todo-display");
let todoEdit = $$("#todo-edit");
let todoRemove = $$("#todo-remove");

// btns and etc.
let removeAll = $$("#remove-all-complete");

// to dislay the list
const todolist = new TodoList();
todolist.displayTaskList();

// event listener
addTodoBtn.addEventListener('click', () => {
    let todoContent = $$("#todo-content");

    // check if the field is empty or not, if yes add an error msg
    if(todoContent.value.trim() === ""){
        todoContent.placeholder = "Task content should not be empty";

        // add red text for placeholder
        todoContent.classList.add("placeholder:text-red-600");
    } else {
        // this put back the default placeholder, if the user inputted an empty space earlier
        todoContent.placeholder = "Add Task";

        // if user has gotten an error msh before, it removes the red text in the placeholder
        todoContent.classList.remove("placeholder:text-red-600");

        // get the value and call createTask from TodoList class
        const taskInput = todoContent.value;
        todolist.createTask(taskInput);
        todoContent.value = "";
    }
})

// this remove all the complted task
removeAll.addEventListener('click', () => {
    todolist.removeAllComplete();
})


///////////////////////////////////////////////////////////////////
////////                    pomodoro part                 ////////
/////////////////////////////////////////////////////////////////

// query stuff
let pomodoroTimer = $$("#pomodoro-timer");

// buttons and etc.
let modeBtns = document.querySelectorAll('[role="mode-group"] button');
let pomodoroBtn = $$("#pomodoro-btn");
let shortBreakBtn = $$("#short-break-btn");
let longBreakBtn = $$("#long-break-btn");
let functionBtns = document.querySelectorAll('[role="function-group"] button');
let startBtn = $$("#start-btn");
let pauseBtn = $$("#pause-btn");
let resetBtn = $$("#reset-btn");
let exitBtn = $$("#exit-btn");
let pomodoroTaskCheck = $$("#pomodoro-task-checkbox");
let pomodoroTaskDesc = $$("#pomodoro-task-content")

// mode windows
let pomodoroPart = $$("#pomodoro-part");
let shortBreakPart = $$("#short-break-part");
let longBreakPart = $$("#long-break-part");

// timers
let pomoTimer = $$("#pomo-timer");
let shortTimer = $$("#short-timer");
let longTimer = $$("#long-timer"); 

// objects
const timerPomodoro = new PomodoroTimer(25, 0);
const timerShortBreak = new PomodoroTimer(5, 0);
const timerLongBreak = new PomodoroTimer(15, 0);

// event listener
startBtn.addEventListener('click', () => {
    // if play button is pressed remove hidden from pause and reset
    pauseBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");

    if (!pomodoroPart.classList.contains("hidden")){
        timerPomodoro.startTimer();        
    }
    if (!shortBreakPart.classList.contains("hidden")){
        timerShortBreak.startTimer();        
    }
    if (!longBreakPart.classList.contains("hidden")){
        timerLongBreak.startTimer();        
    }
});

pauseBtn.addEventListener('click', () => {
    // hide pause and unhidden start
    pauseBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    startBtn.classList.remove("hidden");

    if (!pomodoroPart.classList.contains("hidden")){
        timerPomodoro.stopTimer();        
    }
    if (!shortBreakPart.classList.contains("hidden")){
        timerShortBreak.stopTimer();        
    }
    if (!longBreakPart.classList.contains("hidden")){
        timerLongBreak.stopTimer();        
    }
});

resetBtn.addEventListener('click', () => {
    if (!pomodoroPart.classList.contains("hidden")){
        timerPomodoro.resetTimer();        
    }
    if (!shortBreakPart.classList.contains("hidden")){
        timerShortBreak.resetTimer();        
    }
    if (!longBreakPart.classList.contains("hidden")){
        timerLongBreak.resetTimer();        
    }
});

// changing betwen different modes of timer and changing the colour
// for pomodoro timer
pomodoroBtn.addEventListener('click', () => {

    // hide the other timer
    pomodoroPart.classList.remove("hidden");
    shortBreakPart.classList.add("hidden");
    longBreakPart.classList.add("hidden");

    // ensure that if you move to other timer while your current timer is playing
    // that it reset your current timer and only show the start button on the timer you click
    pauseBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    timerPomodoro.resetTimer(); 

    // this change the colour of each box depending on the mode
    // this change the colour of the big box
    pomodoroTimer.classList.remove("bg-teal-400", "bg-sky-400");
    pomodoroTimer.classList.add("bg-red-400");

    // this change the buttons at the top
    modeBtns.forEach((btn) => {
        btn.classList.remove("bg-blue-500", "bg-teal-500", "hover:bg-blue-700", "hover:bg-teal-700");
        btn.classList.add("bg-red-500", "hover:bg-red-700");
    });

    // this change the buttons in the bottom
    functionBtns.forEach((btn) => {
        btn.classList.remove("text-teal-400", "text-blue-400", "hover:text-teal-600", "hover:text-blue-600");
        btn.classList.add("text-red-400", "hover:text-red-600");
    });

    // change the color of the task description
    pomodoroTaskDesc.classList.remove("text-teal-400", "text-blue-400");
    pomodoroTaskDesc.classList.add("text-red-400");

    // this change the accent colour for the checkbox
    pomodoroTaskCheck.classList.remove("accent-teal-500", "accent-blue-400");
    pomodoroTaskCheck.classList.add("accent-red-400");

    // ensure that if user switch to other mode, the timer from other mode is not counting down
    // since it keep trying to update two timer countdown in one page
    if (timerShortBreak.min != 5 || timerShortBreak.sec != 0) {
        timerShortBreak.stopTimer();
    }
    
    if (timerLongBreak.min != 15 || timerLongBreak.sec != 0) {
        timerLongBreak.stopTimer();
    }
})

// for short break timer
shortBreakBtn.addEventListener('click', () => {
    shortBreakPart.classList.remove("hidden");
    pomodoroPart.classList.add("hidden");
    longBreakPart.classList.add("hidden");

    pauseBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    timerShortBreak.resetTimer(); 

    pomodoroTimer.classList.remove("bg-red-400", "bg-sky-400");
    pomodoroTimer.classList.add("bg-teal-400");

    modeBtns.forEach((btn) => {
        btn.classList.remove("bg-red-500", "bg-blue-500", "hover:bg-red-700", "hover:bg-blue-700");
        btn.classList.add("bg-teal-500", "hover:bg-teal-700");
    });

    functionBtns.forEach((btn) => {
        btn.classList.remove("text-red-400", "text-blue-400", "hover:text-red-600", "hover:text-blue-600");
        btn.classList.add("text-teal-400", "hover:text-teal-600");
    });

    pomodoroTaskDesc.classList.remove("text-red-400", "text-blue-400");
    pomodoroTaskDesc.classList.add("text-teal-400");

    pomodoroTaskCheck.classList.remove("accent-red-400", "accent-blue-400");
    pomodoroTaskCheck.classList.add("accent-teal-500");

    if (timerPomodoro.min != 25 || timerPomodoro.sec != 0) {
        timerPomodoro.stopTimer();
    }
    
    if (timerLongBreak.min != 15 || timerLongBreak.sec != 0) {
        timerLongBreak.stopTimer();
    }
})

// for long break timer
longBreakBtn.addEventListener('click', () => {
    longBreakPart.classList.remove("hidden");
    shortBreakPart.classList.add("hidden");
    pomodoroPart.classList.add("hidden");

    pauseBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    timerLongBreak.resetTimer(); 

    pomodoroTimer.classList.remove("bg-red-400", "bg-teal-400");
    pomodoroTimer.classList.add("bg-sky-400");

    modeBtns.forEach((btn) => {
        btn.classList.remove("bg-red-500", "bg-teal-500", "hover:bg-red-700", "hover:bg-teal-700");
        btn.classList.add("bg-blue-500", "hover:bg-blue-700");
    });

    functionBtns.forEach((btn) => {
        btn.classList.remove("text-teal-400", "text-red-400", "hover:text-teal-600", "hover:text-red-600");
        btn.classList.add("text-blue-400", "hover:text-blue-600");
    });

    pomodoroTaskDesc.classList.remove("text-teal-400", "text-red-400");
    pomodoroTaskDesc.classList.add("text-blue-400");

    pomodoroTaskCheck.classList.remove("accent-red-400", "accent-teal-500");
    pomodoroTaskCheck.classList.add("accent-blue-400");

    if (timerPomodoro.min != 25 || timerPomodoro.sec != 0) {
        timerPomodoro.stopTimer();
    }
    
    if (timerShortBreak.min != 5 || timerShortBreak.sec != 0) {
        timerShortBreak.stopTimer();
    }
})

// this just add a line crossing-out the task
pomodoroTaskCheck.addEventListener('change', () => {
    if (pomodoroTaskCheck.checked){
        pomodoroTaskDesc.classList.add("line-through");

        // this just ensure the status change when checkbox is marked or not
        const currentTask = todolist.todoListTasks.find(task => task.task === pomodoroTaskDesc.textContent);
        currentTask.status = "done";
    }else{
        pomodoroTaskDesc.classList.remove("line-through");
        const currentTask = todolist.todoListTasks.find(task => task.task === pomodoroTaskDesc.textContent);
        currentTask.status = "open";
    }
})

// this sent back to the todo list page
exitBtn.addEventListener('click', () => {
    pomodoroTimer.classList.add("hidden");
    todoListMain.classList.remove("hidden");
    
    // this update the task list in case the user completed a task in the pomodoro timer
    todolist.displayTaskList();
})