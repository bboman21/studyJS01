const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDosKey";


let toDos = [];

function deleteToDo(event){
  //console.dir(event.target.parentNode);//어떤 요소가 클릭 되었는지 알려줌
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    //console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}


function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNumbers = 1;

function paintToDo(text){
  console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  
  const span = document.createElement("span");
  // const newId = toDos.length + 1;// id 겹치는 버그 코드 
  const newId = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(delBtn);
  span.innerText = text;
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //입력창을 공란으로 남듬
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS)
  if(loadedToDos !== null){
    //console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parsedToDos);
    parsedToDos.forEach(function(toDoCall){
      //console.log(toDo.text);
      paintToDo(toDoCall.text);
    })
  } else {

  }

}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();