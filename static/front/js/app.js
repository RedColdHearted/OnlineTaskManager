const userId = document.getElementById('userId').textContent;

function fetchApiDatGet(){
    fetch('http://localhost:8000/api/v1/noteslist/' + userId + '/')
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.length; i++){
                console.log(data[i])
                notes.push(data[i])
            }
            render()
            })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function fetchApiPost(param, data){
    var csrftoken = getCookie('csrftoken');
fetch('http://localhost:8000/api/v1/noteslist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => {
    console.log('data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}


fetchApiDatGet()

const notes = [

]

//sort
const sortNameBtn = document.getElementById('sort-name');
const sortDateBtn = document.getElementById('sort-date');
const sortSizeBtn = document.getElementById('sort-size');

//pop up
const noteNameElement = document.getElementById('note-name');
const noteDscrptElement = document.getElementById('note-description');
const saveBtn = document.getElementById('create-note-btn');

//cards
const listElement = document.getElementById('table');

function getNoteTemplate(note, index){
    let Tstrs = note.created_at.split('-');
    let Tdate = Tstrs[2] + '.' + Tstrs[1] + '.' + Tstrs[0];

return  `
<div class="task-card-${note.completed ? 'warning': 'normal'}"">
            <h4 class="task-name">
            ${note.title}
            </h4>
            <p class="task-discription">
                ${note.description}
            </p>
            
            <div class="task-buttom">
                <h5 class="task-date">
                   created ${Tdate}
                </h5>
                <div class="btn-container">
                    <button class="button-${note.completed ? 'warning': 'success'}" data-index="${index}" data-type="toggle"></button>
                    <button class="button-danger" data-index="${index}" data-type="remove"></button>
                </div>
            </div>
        </div>
`
}

function render(){
listElement.innerHTML = ''
if (notes.length === 0){
    listElement.innerHTML = '<p><h4>Create a first note!</h4></p>'
}
for(let i = 0; i < notes.length; i++){
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
}
}



//name sort
sortNameBtn.onclick = function sortedRender(){
if (notes.length > 0) {
listElement.innerHTML = ''
    const sorted = notes.sort((a, b) => a.title.localeCompare(b.title));
    for (let c = 0; c < notes.length; c++ ){
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(sorted[c], c))
    }
}
else{
    alert('you got 0 notes!')
}
}

//date sort
function compareDates(a, b) {
const dateA = new Date(a.created_at);
const dateB = new Date(b.created_at);
return dateA - dateB;
}

sortDateBtn.onclick = function (){
if (notes.length > 0) {
listElement.innerHTML = ''
    const sorted = notes.slice().sort(compareDates);
    for (let c = 0; c < notes.length; c++ ){
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(sorted[c], c))
    }
}
else{
    alert('you got 0 notes!')
}
}

//size sort
function compareDescriptionLength(a, b) {
const lengthA = a.description.length;
const lengthB = b.description.length;
return lengthA - lengthB;
}

sortSizeBtn.onclick = function (){
if (notes.length > 0) {
    listElement.innerHTML = ''
    const sorted = notes.slice().sort(compareDescriptionLength);
    for (let c = 0; c < notes.length; c++ ){
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(sorted[c], c))
    }
}
else{
    alert('you got 0 notes!')
} 
}

//note create
saveBtn.onclick = function(){
const name = noteNameElement.value

//date
let currentDate = new Date();
let day = currentDate.getDate().toString().padStart(2, '0');
let month = (currentDate.getMonth() + 1).toString().padStart(2,'0');
let year = currentDate.getFullYear().toString();

let formattedDate = year + '-' + month + '-' + day;

const newNote = {
    title: name !==''? name : 'task' + (notes.length + 1),
    description: noteDscrptElement.value !==''? noteDscrptElement.value : 'empty',
    created_at : formattedDate,
    completed : false,
    user_id: Number(userId),
}
if (notes.length < 12){
    //post request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*/*',
        },
        body: JSON.stringify(newNote)
    };
    fetchApiPost(requestOptions, newNote)
    notes.push(newNote)
    console.log(newNote, requestOptions)

    render()} else {
    alert('Max amount of notes!')
}

noteNameElement.value = ''
noteDscrptElement.value = ''
}



listElement.onclick = function(event){
//console.log(event.target.dataset)
if (event.target.dataset.index){
    const index = event.target.dataset.index
    const type = event.target.dataset.type
    if (type === 'toggle'){
        //console.log('toggle', index)
        notes[index].completed = !notes[index].completed
        
    } else if (type === 'remove'){
        //console.log('remove', index)
        notes.splice(index, 1)
    }
    render()
}}