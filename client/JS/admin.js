const body = document.querySelector("body");
const addButton = document.querySelector("#addButton");
const deleteButton = document.querySelector("#deleteButton");
const updateButton = document.querySelector("#updateButton");

const DoThisOnSubmit = async(e) => {
    e.preventDefault();

    
    const res = await fetch("http://localhost:5050/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            kod: e.target[0].value,
            Namn: e.target[1].value,
            Huvudstad: e.target[2].value,
            Befolkning: parseInt(e.target[3].value)
        }),
    });
    const data = await res.json();
    
    if (data.error) {
        alert(data.error);
    }
    else {
        alert(data);
        console.log(data)
        document.querySelector("form").remove();
    }
}
   

addButton.addEventListener("click", (e) => {
    if (document.querySelector("form")) {
        document.querySelector("form").remove();}
   const form =  document.createElement("form");
    form.addEventListener("submit", DoThisOnSubmit);
    body.appendChild(form);
   const password = document.createElement("input");
   password.setAttribute("type", "password");
   password.setAttribute("placeholder", "Password");
    form.appendChild(password);
    const Country = document.createElement("input")
    Country.setAttribute("placeholder", "Country");
    form.appendChild(Country);
    const City = document.createElement("input")
    City.setAttribute("placeholder", "City");
    form.appendChild(City);
    const Population = document.createElement("input")
    Population.setAttribute("placeholder", "Population");
    Population.setAttribute("type", "number");
    form.appendChild(Population);
    const Submitbutton = document.createElement("button");
    Submitbutton.innerHTML = "Submit";
    form.appendChild(Submitbutton);

});

const UpdateOnSubmit = async(e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5050/admin", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            kod: e.target[0].value,
            Namn: e.target[1].value,
            Huvudstad: e.target[2].value,
            Befolkning: parseInt(e.target[3].value)
        }),
    });
    const data = await res.json();
    
    if (data.error) {
        alert(data.error);
    }
    else {
        alert(data);
        console.log(data)
        document.querySelector("form").remove();
    }
}



updateButton.addEventListener("click", (e) => {
    if (document.querySelector("form")) {
        document.querySelector("form").remove();}
    const form =  document.createElement("form");
     form.addEventListener("submit", UpdateOnSubmit);
     body.appendChild(form);
    const password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Password");
     form.appendChild(password);
     const Country = document.createElement("input")
     Country.setAttribute("placeholder", "Country");
     form.appendChild(Country);
     const City = document.createElement("input")
     City.setAttribute("placeholder", "City");
     form.appendChild(City);
     const Population = document.createElement("input")
     Population.setAttribute("placeholder", "Population");
     Population.setAttribute("type", "number");
     form.appendChild(Population);
     const Submitbutton = document.createElement("button");
     Submitbutton.innerHTML = "Submit";
     form.appendChild(Submitbutton);
 
 });


const DeleteOnSubmit = async(e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5050/admin", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            kod: e.target[0].value,
            Namn: e.target[1].value,
        }),
    });
    const data = await res.json();
    
    if (data.error) {
        alert(data.error);
    }
    else {
        alert(data);
        console.log(data)
        document.querySelector("form").remove();
    }
}

deleteButton.addEventListener("click", (e) => {
    if (document.querySelector("form")) {
    document.querySelector("form").remove();}
    const form =  document.createElement("form");
     form.addEventListener("submit", DeleteOnSubmit);
     body.appendChild(form);
    const password = document.createElement("input");
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Password");
     form.appendChild(password);
     const Country = document.createElement("input")
     Country.setAttribute("placeholder", "Country");
     form.appendChild(Country);
     const Submitbutton = document.createElement("button");
     Submitbutton.innerHTML = "Submit";
     form.appendChild(Submitbutton);
 
 }
    );  

