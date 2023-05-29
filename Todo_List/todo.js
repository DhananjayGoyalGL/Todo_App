//Check if user had enter any data , if not then display notification to add task in input field.
var notification_bar = document.getElementById("notification");
document.getElementById("btn").onclick = function () {
  if (document.getElementById("task_data").value == 0) {
    notification_bar.style.display = "block";
    setTimeout(() => {
      notification_bar.style.display = "none"; //notification will disapper after 3sec.
    }, 3000);
  }
  //add a new task to list
  else {
    document.getElementById("lists").innerHTML += `
        <div class="list">
            <span id="taskname">
            ${document.getElementById("task_data").value}
            </span> 
            <button class="edit" onclick="">
               EDIT
            </button>
            <button class="delete">
                DELETE
            </button> 
        </div>`;

    task_data.value = ""; //once the task is added into list make input field as empty.

    //Delete the selected task.
    var delete_tasks = document.getElementsByClassName("delete");
    for (var i = 0; i < delete_tasks.length; i++) {
      delete_tasks[i].onclick = function () {
        if (confirm("Do you want to delete this Task-item!!") == true) {
          this.parentNode.remove();
        } else {
          return;
        }
      };
    }

    //Edit the selected task
    var currentEditNode = "";
    var edit_task = document.getElementsByClassName("edit");
    for (var i = 0; i < edit_task.length; i++) {
      edit_task[i].onclick = function () {
        document.getElementById("btn").style.display = "none"; //hide add button
        document.getElementById("btn2").style.display = "block"; //display update button

        //getting firstChild of task list which is span tag.
        currentEditNode = this.parentNode.firstChild.nextSibling;
        //adding a className of update to the first child of parentNode for the task needs to be edited.
        currentEditNode.className = "update";

        //fetching data from span tag and displaying in input field for editing
        task_data.value = currentEditNode.innerHTML
          .trim()
          .replace(/&nbsp;/g, "");
      };
    }

    var update_task = document.getElementById("btn2");
    update_task.onclick = function () {
      var spanEdit = document.getElementsByClassName("update");
      //getElementsByClassName always returns an array, thats why we are using spanEdit[0]
      if (task_data.value === "") {
        spanEdit[0].parentElement.remove();
      } else {
        spanEdit[0].innerHTML = task_data.value; //assign updated value to task.
        spanEdit[0].className = ""; //once edited value is updated , make className to empty string.
      }
      task_data.value = ""; //make input field as empty once update is done.
      update_task.style.display = "none"; //hide update button
      document.getElementById("btn").style.display = "block"; //display add button
    };
  }
};
