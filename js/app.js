let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById('addTxt');
let title = document.getElementById('title');

function Tasks(newtitle, newNote) {
    this.title = newtitle;
    this.note = newNote;
}


// getting Previous Note after Refresh

if (localStorage.getItem('notes') !== null) {
    showNote();
}

//Adding Note Event

addBtn.addEventListener('click', (event) => {
    if (addTxt.value === "") {
        setTimeout(() => {
            let alert = document.querySelector('.desAert');
            alert.remove();
        }, 2000);
        addTxt.insertAdjacentHTML("beforebegin", `<div class="alert desAert alert-danger" role="alert">
                                                        Please write some note to add!!
                                                    </div>`);
        if (title.value === "") {
            setTimeout(() => {
                let alert = document.querySelector('.titleAlert');
                alert.remove();
            }, 2000);
            title.insertAdjacentHTML("beforebegin", `<div class="alert titleAlert alert-danger" role="alert">
                                                        Title is Required!!
                                                    </div>`);
        }
    } else {
        let notesVals = localStorage.getItem('notes');
        let titleVals = localStorage.getItem('title');
        let notesObj, titleObj;
        if (notesVals === null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notesVals);
        }
        let task = new Tasks(title.value, addTxt.value);
        notesObj.push(task);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = "";
        title.value = "";
        showNote();
    }
});

//Displaying Notes

function showNote() {
    let notesVals = localStorage.getItem('notes');
    let notesObj;
    if (notesVals === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesVals);
    }
    let notes = document.getElementById('notes');
    notes.innerHTML = "";
    notesObj.forEach((val, index) => {
        notes.insertAdjacentHTML("beforeend", `<div class="card my-2 mx-2" style="width: 18rem;">
                                                    <div class="card-body" id="card-text">
                                                        <h5 class="card-title">${val.title}</h5>
                                                        <hr />
                                                        <p class="card-text">${val.note}</p>
                                                        <button class="btn btn-primary del">Delete</button>
                                                    </div>
                                                </div>`);
    });

    //Deleting individual Notes

    let deleteBtn = document.querySelectorAll('.del');
    Array.from(deleteBtn).forEach((i, index) => {
        i.addEventListener('click', () => {
            i.parentElement.parentElement.remove();
            notesObj.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notesObj));
            if (notesObj.length === 0) {
                localStorage.clear();
                notes.innerHTML = `<h6 id="noNotes">
                                        Added Notes will be displayed here
                                    </h6>`;
            } else {
                showNote();
            }
        });
    });
}



//Serach Bar Event

let serachBar = document.querySelector('#search');
let titleFilter = document.getElementById('titleFilter');
let notesFilter = document.getElementById('notesFilter');
let allFilter = document.getElementById('all');


//Seaarch all
serachBar.addEventListener('input', (e) => {
    let anyText = document.querySelectorAll('#card-text');
    Array.from(anyText).forEach((i, index) => {
        console.log(e.target.value)
        if (i.firstElementChild.nextElementSibling.nextElementSibling.innerText.toLowerCase().includes(e.target.value.toLowerCase()) || i.firstElementChild.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
            i.parentElement.style.display = 'block';
        } else {
            i.parentElement.style.display = 'none';
        }
    });
});

// Search through both with title & Notes 
allFilter.addEventListener('click', () => {
    let anyText = document.querySelectorAll('#card-text');
    Array.from(anyText).forEach((i, index) => {
        if (i.firstElementChild.nextElementSibling.nextElementSibling.innerText.toLowerCase().includes(serachBar.value.toLowerCase()) || i.firstElementChild.innerText.toLowerCase().includes(serachBar.value.toLowerCase())) {
            i.parentElement.style.display = 'block';
        } else {
            i.parentElement.style.display = 'none';
        }
    });
    serachBar.addEventListener('input', (e) => {
        Array.from(anyText).forEach((i, index) => {
            console.log(e.target.value)
            if (i.firstElementChild.nextElementSibling.innerText.toLowerCase().includes(e.target.value.toLowerCase()) || i.firstElementChild.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                i.parentElement.style.display = 'block';
            } else {
                i.parentElement.style.display = 'none';
            }
        });
    });
});

// Search through title 
titleFilter.addEventListener('click', () => {
    let titleText = document.querySelectorAll('.card-title');
    Array.from(titleText).forEach((i, index) => {
        if (i.innerText.toLowerCase().includes(serachBar.value.toLowerCase())) {
            i.parentElement.parentElement.style.display = 'block';
        } else {
            i.parentElement.parentElement.style.display = 'none';
        }
    });
    serachBar.addEventListener('input', (e) => {
        Array.from(titleText).forEach((i, index) => {
            if (i.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                i.parentElement.parentElement.style.display = 'block';
            } else {
                i.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});

// Search through notes
notesFilter.addEventListener('click', () => {
    let notesText = document.querySelectorAll('.card-text');
    Array.from(notesText).forEach((i, index) => {
        if (i.innerText.toLowerCase().includes(serachBar.value.toLowerCase())) {
            i.parentElement.parentElement.style.display = 'block';
        } else {
            i.parentElement.parentElement.style.display = 'none';
        }
    });
    serachBar.addEventListener('input', (e) => {
        Array.from(notesText).forEach((i, index) => {
            if (i.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                i.parentElement.parentElement.style.display = 'block';
            } else {
                i.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});