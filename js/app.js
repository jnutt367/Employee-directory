let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".next");
const modalPrev = document.querySelector(".previous");
const searchField = document.getElementById("searchField");
const card = document.querySelector(".card");
// Fetch API

fetch(urlAPI)
.then(response => response.json())
.then(data => data.results)
.then(displayEmployees)
.catch(err => console .log(err))


//Search Functionality that filters employees



//Creates HTML for main display  

function displayEmployees (employeeData) {
    employees = employeeData;
    let employeeHTML = " ";
    employees.map((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        
        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
            </div>
            `
});
gridContainer.innerHTML = employeeHTML;
}

//creates Modal

function displayModal (index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date (dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        ` ;
    overlay.classList.remove( "hidden" );
    modal.innerHTML = modalHTML;
}

//event listeners for Modal display

gridContainer.addEventListener( 'click' , e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card" );
    let index = card.getAttribute("data-index");
    displayModal(index);
    let indexNum = parseInt(index)    

    modalNext.addEventListener("click", () => {
        if(indexNum < 11) {
        indexNum += 1;
        displayModal(indexNum);
    } else if (indexNum === 11) {
        indexNum = 0;
        displayModal(indexNum);
    }
    })    

    modalPrev.addEventListener("click", () => {
        if(indexNum > 0) {
        indexNum -= 1;
        displayModal(indexNum);
    } else if (indexNum === 0) {
        indexNum = 11;
        displayModal(indexNum);
    }
    })
  
}});

modalClose.addEventListener( 'click' , () => {
    overlay.classList.add( "hidden" );
    });