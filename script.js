let userName = JSON.parse(localStorage.getItem("user-name")) || [];

function getUsername() {
  const containerInputUserName = document.querySelector('.get-user-name')
  if(userName.length === 0){
    containerInputUserName.innerHTML = inputUserName()
  } else clearContainerInputUsername()
}
getUsername()

function setDataUserName() {
  const inputForUserName = document.querySelector('.input-for-user-name').value
  userName.push(inputForUserName)
  localStorage.setItem("user-name", JSON.stringify(userName))
  writeUserName()
}

function clearContainerInputUsername() {
  const containerInputUserName = document.querySelector('.get-user-name')
  containerInputUserName.innerHTML = ""
}

function writeUserName() {
  document.querySelector('.user-name').innerHTML = userName
}
writeUserName()

function greetings() {
  const newDate = new Date
  const hour = newDate.getHours();

  const classGreetings = document.querySelector('.greetings')

  if(hour >= 19){
    classGreetings.innerHTML = "Selamat Malam"
  } else if(hour >= 15){
    classGreetings.innerHTML = "Selamat Sore"
  } else if(hour >= 11){
    classGreetings.innerHTML = "Selamat Siang"
  } else if(hour >= 6){
    classGreetings.innerHTML = "Selamat Pagi"
  } 
}
greetings()

let tasks = JSON.parse(localStorage.getItem("data-task")) || [];

// Task class
class Task {
  constructor(id, title, date, time, status) {
    this.id = id
    this.title = title;
    this.date = date;
    this.time = time;
    this.status = status;
  }
}

// display all local storage
const displayLocalStorage = () => {
  const containerTask = document.querySelector('.container-todolist')
  if(tasks.length === 0){
    containerTask.innerHTML = svgNoTask()
    document.querySelector('.get-user-name').style.alignItems = 'end'
  } else {
    let theTask = '';
    tasks.forEach((x, i) => {
      theTask += todolistHeader(x.id, x.title,x.date, x.time, x.status, i);
      containerTask.innerHTML = theTask;
      document.querySelector('.get-user-name').style.alignItems = 'center'
    })
  };
}
displayLocalStorage()


function addNewTask (){

  checkValue()

  const listTitle = document.querySelector('.modal .list-title')
  const listDate = document.querySelector('.modal .list-date')
  const listTime = document.querySelector('.modal .list-time')
  const dateRealTime = new Date;
  const day = dateRealTime.getDate();
  const hour = dateRealTime.getHours();
  const seconds = dateRealTime.getSeconds();
  const milliSeconds = dateRealTime.getMilliseconds();

  const title = listTitle.value
  const date = listDate.value
  const time = listTime.value
  const status = ""
  const id = generateId(title.trim(), day, hour, seconds, milliSeconds);

  function generateId(title, day, hour, seconds, milliSeconds) {
    // Combine the values
    const combinedValue = title + day + hour + seconds + milliSeconds;
    // Remove spaces and special characters using a regular expression
    const sanitizedValue = combinedValue.replace(/[^a-zA-Z0-9]/g, '');
    return sanitizedValue;
  }

  if(title === ""){
    document.querySelector('.info-error-input').innerHTML = `<div class="alert alert-danger text-center mt-5" role="alert">Judul tidak boleh kosong</div>`
  } else {
    tasks.push(
      new Task(id, title, date, time, status)
    )
    localStorage.setItem("data-task", JSON.stringify(tasks));
    displayLocalStorage()
    listTitle.value = ""
    listDate.value = ""
    listTime.value = ""
    document.querySelector('.info-error-input').innerHTML = ""
    document.querySelector('.modal .new-task').setAttribute("data-bs-dismiss", "")
  }

}

function checkValue (){
  const listTitle = document.querySelector('.modal .list-title')
  const btnAddNewTask = document.querySelector('.modal .new-task')
  const title = listTitle.value
  if (title === "") {
    btnAddNewTask.setAttribute("data-bs-dismiss", "")
  } else btnAddNewTask.setAttribute("data-bs-dismiss", "modal")
}

function deleteTask (el){
  const thisID = el.parentElement.parentElement.parentElement.parentElement.parentElement.id
  const indexID = tasks.findIndex(x => x.id === thisID)
  tasks.splice(indexID, 1)
  localStorage.setItem("data-task", JSON.stringify(tasks));
  displayLocalStorage()
}

function editInputTask(el){
  const thisID = el.parentElement.parentElement.parentElement.parentElement.parentElement.id
  const thisTask = tasks.find(x => x.id === thisID)
  document.querySelector('.modalContentInput').innerHTML = inputEdit(thisTask.id, thisTask.title, thisTask.date, thisTask.time)
}

function checkEditValue () {
  const newTitle = document.querySelector('.modal .edit-list-title').value
  const buttonEditTask = document.querySelector('.modal .button-edit-task')

  if (newTitle === "") {
    buttonEditTask.setAttribute("data-bs-dismiss", "")
  } else buttonEditTask.setAttribute("data-bs-dismiss", "modal")
}

function editTask(id) {
  checkEditValue()
  const newTitle = document.querySelector('.modal .edit-list-title')
  const newDate = document.querySelector('.modal .edit-list-date')
  const newTime = document.querySelector('.modal .edit-list-time')
  const filterd = tasks.find(x => x.id === id)

  if (document.querySelector('.modal .edit-list-title').value === ""){
    document.querySelector('.info-error-input-edit').innerHTML = `<div class="alert alert-danger text-center mt-5" role="alert">Judul baru tidak boleh kosong</div>`
  } else {
    filterd.title = newTitle.value
    filterd.date = newDate.value
    filterd.time = newTime.value
    localStorage.setItem("data-task", JSON.stringify(tasks));
    displayLocalStorage()
  }
}

// to save the task complete or not
function checkedTask (el){
  const filterd = tasks.find(x => x.id === el.parentElement.parentElement.parentElement.id)
  const check = el.previousElementSibling
  if (check.checked) {
    filterd.status = ""
    localStorage.setItem("data-task", JSON.stringify(tasks));
  } else {
    filterd.status = "checked"
    localStorage.setItem("data-task", JSON.stringify(tasks));
  }
}

// clear all task
document.querySelector('.confirm-dat').addEventListener('click', function() {
  const btnConfirm = document.querySelector('.modal-confirm-delete')
  if (tasks.length === 0){
    btnConfirm.innerHTML = `<div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>      
            <div class="alert alert-info text-center mb-0" role="alert">
                Tugas kamu kosong
            </div>`
  } else {
    btnConfirm.innerHTML = `<div class="modal-body d-flex justify-content-around">
              <h6>Yakin untuk hapus semua tugas ?</h6>
              <span class="d-flex justify-content-between gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="button" class="btn" onclick="deleteAllTasks()" style="background-color: red; color: aliceblue;" data-bs-dismiss="modal">Hapus</button>
              </span>
            </div>`
  }
})

function deleteAllTasks (){
  tasks = [];
  localStorage.setItem("data-task", JSON.stringify(tasks));
  displayLocalStorage()
}

// func delete username 
function deleteUserName() {
  userName = [];
  localStorage.setItem("user-name", JSON.stringify(userName));
  writeUserName()
}

function todolistHeader(id, title, date, time, status, i){
    return `<div id="${id}" class="card mb-1">
        <div class="card-body d-flex justify-content-between">
          <div>
            <input type="checkbox" class="btn-check" id="btn-check-outlined${i}" autocomplete="off" ${status}>
            <label class="btn rounded-pill label-check-task" for="btn-check-outlined${i}" onclick="checkedTask(this)">Selesai</label>
          </div>
          <div class="form-check flex-grow-1">
            <label class="label-task-title">
              <h6>${title}</h6>
            </label>
            <p class="m-0">Tanggal : ${date}  |  Jam : ${time}</p>
          </div>
          <div class="dropdown">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              </svg>
            </button>
            <span class="dropdown-menu bg-transparent text-body border-0">
              <span><button type="button" class="btn text-light" onclick="editInputTask(this)" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></span>
              <span><button type="button" class="btn text-light" onclick="deleteTask(this)">Delete</button></span>
            </span>
          </div>
        </div>
      </div>`
}

function inputNewTask() {
  document.querySelector('.modal .modalContentInput')
  .innerHTML = `<div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Add  new to do list</h1>
                  <button type="button" class="btn-close focus-ring" style="--bs-focus-ring-color: transparent" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-input">
                    <!-- input -->
                    <div class="input-group mb-3">
                      <input type="text" value="" class="form-control list-title" placeholder="Tambah tugas baru" aria-describedby="button-addon2" onkeypress="checkValue()">
                    </div>
                    <div class="input-group mb-3">
                      <input type="date" value="" class="form-control list-date" aria-describedby="button-addon2" onkeypress="checkValue()">
                    </div>
                    <div class="input-group mb-3">
                      <input type="time" value="" class="form-control list-time" aria-describedby="button-addon2" onkeypress="checkValue()">
                    </div>
                    <button class="new-task btn" style="width: 100%;" id="button-addon2" onclick="addNewTask()">Tambah</button>
                    <div class="info-error-input"></div>
                </div>`
}

function inputEdit(id, title, date, time) {
  return `<div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit new to do list</h1>
              <button type="button" class="btn-close focus-ring" style="--bs-focus-ring-color: transparent" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-input">
            <div class="input-group mb-3">
                <input type="text" value="${title}" class="form-control edit-list-title" placeholder="Tambah tugas baru" aria-describedby="button-addon2" onkeypress="checkEditValue()">
              </div>
              <div class="input-group mb-3">
                <input type="date" value="${date}" class="form-control edit-list-date" aria-describedby="button-addon2">
              </div>
              <div class="input-group mb-3">
                <input type="time" value="${time}" class="form-control edit-list-time" aria-describedby="button-addon2">
              </div>
              <button class="button-edit-task btn" style="width: 100%;" id="button-addon2" onclick="editTask('${id}')">Tambah</button>
            <div class="info-error-input-edit"></div>
          </div>`
}

function inputUserName() {
  return `<div class="card card-input-name text-center">
            <div class="card-header pt-3 pb-3">Masukkan Nama Anda</div>
            <div class="card-body pt-5 pb-5">
              <div class="input-group mb-3">
                <input type="text" class="form-control input-for-user-name" placeholder="Masukkan Nama Anda" aria-label="Recipient's username" aria-describedby="button-addon2">
              </div>
              <button class="btn button-get-user-name mt-3" type="button" id="button-addon2" onclick="setDataUserName(); clearContainerInputUsername();">Simpan</button>
            </div>
          </div>`
}

function svgNoTask() {
  return `<img src="Work illustrations by Storyset.svg" alt="" class="no-task-svg">
          <h4 class="no-task">Tidak ada tugas hari ini</h4>`
}
