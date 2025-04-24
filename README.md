# Pomodoro Application

This project is a Pomodoro Timer and a Todo list application combined.
This was created as my first assignment into my Introduction to Client-Side Programming Course in my first year of ITAS Web and Mobile Development Diploma Program.
The application only have one HTML as a requirement for the assignment.

## tasklist.js
This js file is only used to store the initial tasklist that was given, and also store the newly created or edited task.

## todo.js
This js file contained the classes and event listener for the application
- Task class
    The Task Class contianed three private field which are #id, #task, and #status.
    It has getter functions for the three private fields, and only two setter functions for task and status.
  
- TodoList class
    The TodoList class has one private field which is #todoListTasks.
    It only have one setter and getter function for todoLIstTasks.
    It has nine methods:
  - createTask(task)  
      This method create a new task then update the display by calling displayTaskList method.
  - editTask(id, newTask)  
      This method edit existing task then update the display by calling displayTaskList method.
  - removeTask(value)  
      This method remove a task by overwriting the array using filter to create a new array with task.id that does not equal the value.
  - removeAllComplete()  
      This method overwrite the array by filtering the todoListTasks by making a new array that have their task.status not equal to "done".
  - displayTaskDone()  
      This method count how many task are done by getting the length of an array that only contained tasks with the status of "done".
  - displayTaskList()  
      This method dynamicly create the HTML and also contained all the event listener for edit button, remove button, and check box for completing a task.

- PomodoroTimer class
    It has five methods:
  - updateTimer()  
      This method updates the countdown timer logic and handles how time decreases per second. It also ensures the timer stops at zero and updates the display each time it's called
  - startTimer()  
      This method starts the countdown. It updates the timer every second using setInterval and shows the initial time with displayTimer().
  - stopTimer()  
      This method stops the countdown by clearing the interval.
  - resetTimer()  
      This method first call stopTimer method to stop the timer then check if the three timers' class does not contain hidden, then it update the timer text to the timer's duration.
  - displayTimer()  
      This method updates the timer display. It checks which timer section is visible and sets its text to the timer's duration.
  
