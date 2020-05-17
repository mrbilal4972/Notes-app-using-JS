console.log('p1');
let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById('addTxt');
let title = document.getElementById('title');

function Tasks(newtitle, newNote){
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
      if(title.value === ""){
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
            // titleObj = [];
        } else {
            notesObj = JSON.parse(notesVals);
            // titleObj = JSON.parse(titleVals);
        }
        // notesObj.push(addTxt.value);
        // titleObj.push(title.value);
        let task = new Tasks(title.value, addTxt.value);
        notesObj.push(task);
        console.log(notesObj)
        localStorage.setItem('notes', JSON.stringify(notesObj));
        // localStorage.setItem('title',JSON.stringify(titleObj));
        addTxt.value = "";
        title.value = "";
        showNote();
    }
});

//Displaying Notes

function showNote() {
    let notesVals = localStorage.getItem('notes');
    // let titleVals = localStorage.getItem('title');
    let notesObj;
    if (notesVals === null) {
        notesObj = [];
        // titleObj = [];
    } else {
        notesObj = JSON.parse(notesVals);
        // titleObj = JSON.parse(titleVals);
    }
    let notes = document.getElementById('notes');
    notes.innerHTML = "";
    notesObj.forEach((val, index) => {
        notes.insertAdjacentHTML("beforeend", `<div class="card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${val.title}</h5>
          <p class="card-text">${val.note}</p>
          <button class="btn btn-primary del">Delete</button>
            </div>
        </div>`);
    });

        //Deleting individual Notes

    let deleteBtn = document.querySelectorAll('.del');
    // console.log(deleteBtn)
Array.from(deleteBtn).forEach((i, index) => {
    // let notes= document
    // console.log(i, index);
    i.addEventListener('click', () => {
        console.log('click',index);
        console.log(i.parentElement.parentElement.remove());
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
let notesfilter = document.getElementById('notesfilter');


    notesfilter.addEventListener('click', () => {
        serachBar.addEventListener('input', (e) => {
        let notesText = document.querySelectorAll('.card-text');
        Array.from(notesText).forEach((i, index) => {
            if (i.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                i.parentElement.parentElement.style.display = 'block';
            } else {
                i.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});

notesfilter.addEventListener('click', () => {
    let notesText = document.querySelectorAll('.card-text');
    Array.from(notesText).forEach((i, index) => {
        console.log(i.innerText.toLowerCase());
        if (i.innerText.toLowerCase().includes(serachBar.value.toLowerCase())) {
            i.parentElement.parentElement.style.display = 'block';
        } else {
            i.parentElement.parentElement.style.display = 'none';
        }
    });
});

    titleFilter.addEventListener('click', () => {
        serachBar.addEventListener('input', (e) => {
        let titleText = document.querySelectorAll('.card-title');
        Array.from(titleText).forEach((i, index) => {
            if (i.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                i.parentElement.parentElement.style.display = 'block';
            } else {
                i.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});

titleFilter.addEventListener('toggle', () => {
    let titleText = document.querySelectorAll('.card-title');
    Array.from(titleText).forEach((i, index) => {
        if (i.innerText.toLowerCase().includes(serachBar.value.toLowerCase())) {
            i.parentElement.parentElement.style.display = 'block';
        } else {
            i.parentElement.parentElement.style.display = 'none';
        }
    });
});