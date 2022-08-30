const add = document.querySelector(".add");
const loc = JSON.parse(localStorage.getItem("notes"));


if(loc){
    loc.forEach(nots => {   
        addNotes(nots);     
    });
}


// Add Notes

function addNotes(data = '') {
    const div = document.createElement("div");

    div.className = "notes";
    div.setAttribute("draggable", true);

    div.innerHTML = `
    <div class="tools">
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="main ${data ? "":"hidden"}"></div>
    <textarea class="note ${data ? "hidden":""}"></textarea>
    </div> 
    `;

    const main = div.querySelector(".main")
    const txt = div.querySelector(".note")
    
    const edit = div.querySelector(".edit")
    const del = div.querySelector(".delete")
    
    txt.value = data;
    main.innerHTML = marked(data);

    edit.addEventListener("click", () => {
        main.classList.toggle("hidden");
        txt.classList.toggle("hidden");
        txt.focus();
    });

    txt.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    })

    del.addEventListener("click", (e)=>{
        div.remove();     
        updateLS();
    })

    div.addEventListener("drag", dragStart);
    div.addEventListener("dragend", dragEnd);    
    document.body.appendChild(div);

}

function dragStart(e){
    e.target.style.display = "none";
}
function dragEnd(e){
    e.target.style.display = "initial";
    document.body.append(e.target);
}

function updateLS(){
    const notes = document.querySelectorAll("textarea");
    
    const txt =[];
    
    notes.forEach(note => {
        txt.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(txt));
}

function editNote(e) {
    console.log(e.parentElement);
}

add.addEventListener("click", ()=> addNotes() );

