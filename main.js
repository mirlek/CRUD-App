let form = document.getElementById('form');  // submit
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    formValidation();
});

// mostly all above refers to the stage "Button click -> submit"

let formValidation = () => {
    if(textInput.value === "") {
        console.log('failure')
        msg.innerHTML =  "Task can not be blank"
    } else {
        console.log('success')
        msg.innerHTML =  "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal"); 
        add.click();
        (()=> {
            add.setAttribute("data-bs-dismiss", "modal");     // this is to close the form automatically after it filled correctly. The attribute is taken fron HTML.
        })();
    }
};

let data = [] ;  // accept and store data  //store

let acceptData = () => {                   //accept
    data.push({
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value
    });
    localStorage.setItem("data", JSON.stringify(data));

    createTasks();
};


let createTasks = () => {                   // output uploaded data // + below allows preventing the exclusion of the previously created tasks
    tasks.innerHTML = "";
    data.map((x,y)=> {
        return (tasks.innerHTML += `                    
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <br>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <span class="options">
                        <i data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
                        <i onClick="deleteTask(this); createTasks()" class="fa-sharp fa-solid fa-trash"></i>
                    </span>
                </div>`    )
    });
    
    resetForm();

};


let deleteTask = (e)=> {                   // this deleting card
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
        textInput.value = selectedTask.children[0].innerHTML;
        dateInput.value = selectedTask.children[2].innerHTML;
        textarea.value = selectedTask.children[3].innerHTML;
        // selectedTask.remove();   // this removes the card during updating and allows to modify it without creating the secord version
        deleteTask(e);
};

let resetForm = ()=> {                  // reset the form
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})();