const saveNote = document.getElementById('saveNote');
const title = document.getElementById('title');
const description = document.getElementById('description');
const noteList = document.querySelector('#noteList ul');
let notes = [];
console.log(notes);
renderNotes();
loadlistener();

function loadlistener() {
    noteList.addEventListener('click',deleteNote);
}

function renderNotes() {
    noteList.innerHTML = '';
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note) => {
        const li = document.createElement('li');
        li.innerHTML = `<details>
            <summary>${note.title}</summary>
            <p>${note.description}</p></details>
            <a href="#" class="deleteCourse" data-id="${note.id}"> X</a>
        `;
        noteList.appendChild(li);

    });
}


saveNote.addEventListener('click', (e) => {
    if (title.value === '' || description.value === '') {
        alert('Please add a title and description');
        return;
    }
    e.preventDefault();
    const newNote = {
        id: notes.length + 1,
        title: title.value,
        description: description.value
    }
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    console.log(notes);
    title.value = '';
    description.value = '';
})

function deleteNote(e) {
    if(e.target.classList.contains('deleteCourse')) {
        const id = parseInt(e.target.dataset.id);
        notes = notes.filter(note => note.id !== id);
  
        console.log(notes);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}