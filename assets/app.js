const datavorodi = document.getElementById("inp");
const delet = document.querySelector(".clear-btn");
const vorodi = document.querySelector(".box");
const filters = document.querySelectorAll(".filters span");










/* tabe ijad list az data vorodi */
datum = ""
function creat_data(filter) {
    let tagvorodi = "";
    for (let i = 0; i < datum.length; i++) {
        let data = datum[i];
        let id = i;
        let completed = data.status == "completed" ? "checked" : "";
        if (filter == data.status || filter == "all") {
            tagvorodi +=
                `<li class="checktik">
                            <label for="${id}">
                                <input onclick="vaziat(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${data.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="change(this)">change</i>
                                <ul class="change_order">
                                    <li onclick='edit(${id}, "${data.name}")'><i>Edit</i></li>
                                    <li onclick='del(${id}, "${filter}")'><i>Delete</i></li>
                                </ul>
                            </div>
                        </li>`;
        }
    }








    let checkTask = vorodi.querySelectorAll(".checktik");
    vorodi.innerHTML = tagvorodi;


}

let edt = "";


/* ijad element ba inter */
datavorodi.addEventListener("keyup", e => {
    let val = datavorodi.value;
    if (e.key == "Enter" && val) {
        datum = !datum ? [] : datum;
        let val_type = { name: val, status: "pending" };
        datum.push(val_type);
        datavorodi.value = "";
        creat_data(document.querySelector("span.active").id);
    }
});




/* tabe menu edit va delete */

function change(select) {
    let changeee = select.parentElement.lastElementChild;
    changeee.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selected) {
            changeee.classList.remove("show");
        }
    });
}
/* end tabe menu edit va delete */


/* taghir vaziat dar data */
function vaziat(selected) {
    let taskName = selected.parentElement.lastElementChild;
    if (selected.checked) {
        taskName.classList.add("checked");
        datum[selected.id].status = ("completed");
    } else {
        taskName.classList.remove("checked");
        datum[selected.id].status = ("pending");
    }
}



/* halghe check kardn complate shode*/
for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", function () {
        let vz = document.querySelector("span.active");
        if (vz !== null) {
            vz.classList.remove("active");
        }
        this.classList.add("active");
        creat_data(this.id);
    });
}






/* pak kardn taki */
function del(iddel, filter) {
    datum.splice(iddel, 1);
    creat_data(filter);
}


/* pak kardan hame */
delet.addEventListener("click", () => {
    edt = false;
    datum.splice(0, datum.length);
    creat_data()
});