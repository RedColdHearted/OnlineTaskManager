

const notes = [
    {
    title: 'сделать дз',
    description: 'сдать задание до пятницы ',
    date : '18.01.2024',
    completed : true
    },
    {
    title: 'полить цветы',
    description: 'Лейка стоит на подоконнике',
    date : '14.02.2024',
    completed : false
    },
    {
    title: 'купить продукты',
    description: 'нужны батон, сыр, молоко, помидоры, огурцы, яйца',
    date : '19.01.2024',
    completed : false
    },
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
                   created ${note.date}
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

render()

//name sort
sortNameBtn.onclick = function sortedRender(){
if (notes.length > 0) {
listElement.innerHTML = ''
    const sorted = notes.sort((a, b) => a.title.localeCompare(b.title));
    console.log(sorted);
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
const dateA = new Date(a.date.split('.').reverse().join('-'));
const dateB = new Date(b.date.split('.').reverse().join('-'));
return dateA - dateB;
}

sortDateBtn.onclick = function (){
if (notes.length > 0) {
listElement.innerHTML = ''
    const sorted = notes.slice().sort(compareDates);
    console.log(sorted);
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
    console.log(sorted);
    for (let c = 0; c < notes.length; c++ ){
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(sorted[c], c))
    }
}
else{
    alert('you got 0 notes!')
} 
}


saveBtn.onclick = function(){
const name = noteNameElement.value
console.log(name)

//date
let currentDate = new Date();
let day = currentDate.getDate().toString().padStart(2, '0');
let month = (currentDate.getMonth() + 1).toString().padStart(2,'0');
let year = currentDate.getFullYear().toString();

let formattedDate = day + '.' + month + '.' + year;
console.log(formattedDate)

const newNote = {
    title: name !==''? name : 'task' + (notes.length + 1),
    description: noteDscrptElement.value !==''? noteDscrptElement.value : 'empty',
    date : formattedDate,
    completed : false
}
if (notes.length < 12){
    notes.push(newNote)
    render()
} else {
    alert('Max amount of notes!')
}

noteNameElement.value = ''
noteDscrptElement.value = ''
}



listElement.onclick = function(event){
console.log(event.target.dataset)
if (event.target.dataset.index){
    const index = event.target.dataset.index
    const type = event.target.dataset.type
    if (type === 'toggle'){
        console.log('toggle', index)
        notes[index].completed = !notes[index].completed
        
    } else if (type === 'remove'){
        console.log('remove', index)
        notes.splice(index, 1)
    }
    render()
}
}