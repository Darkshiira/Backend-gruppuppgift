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
            namn: e.target[1].value,
            huvudstad: e.target[2].value,
            befolkning: parseInt(e.target[3].value),
            sprak: e.target[4].value,
        }),
    });
    const data = await res.json();
    
    if (data.error) {
        alert(data.error);
    }
    else {
        alert(data);
        document.querySelector("form").remove();
    }
}
   

addButton.addEventListener("click", (e) => {
    if (document.querySelector("form")) {
        document.querySelector("form").remove();}
    if (document.querySelector("div")) {
        document.querySelector("div").remove();}
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
    const Language = document.createElement("input")
    Language.setAttribute("placeholder", "Language");
    form.appendChild(Language);
    const Submitbutton = document.createElement("button");
    Submitbutton.innerHTML = "Submit";
    form.appendChild(Submitbutton);

});

const UpdateOnSubmit = async(e) => {
    e.preventDefault();

    if (e.target[2].name === "City") {
        const res = await fetch("http://localhost:5050/admin/Huvudstad", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                kod: e.target[0].value,
                namn: e.target[1].value,
                huvudstad: e.target[2].value,
            }),
        });
        const data = await res.json();

        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data);
            document.querySelector("form").remove();
        }
    }
    else if (e.target[2].name === "Population") {
        const res = await fetch("http://localhost:5050/admin/Befolkning", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                kod: e.target[0].value,
                namn: e.target[1].value,
                befolkning: parseInt(e.target[2].value),
            }),
        });
        const data = await res.json();
    
        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data);
            document.querySelector("form").remove();
        }
    }
    else if (e.target[2].name === "Language") {
        const res = await fetch("http://localhost:5050/admin/Sprak", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                kod: e.target[0].value,
                namn: e.target[1].value,
                sprak: e.target[2].value,
            }),
        });
        const data = await res.json();

        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data);
            document.querySelector("form").remove();
        }
    }
}




updateButton.addEventListener("click", (e) => {
    if (document.querySelector("div")) {
        document.querySelector("div").remove();
        }
    
    if (document.querySelector("form")) {
        document.querySelector("form").remove();}
    const div = document.createElement("div");
    body.appendChild(div);

    const h1 = document.createElement("h1");
    h1.innerHTML = "What do you want to update?";
    div.appendChild(h1);

    const label1 = document.createElement("label");
    label1.textContent = "Huvudstad";
    div.appendChild(label1);

    const radioButton1 = document.createElement("input");
    radioButton1.setAttribute("type", "radio");
    radioButton1.setAttribute("name", "Val");
    radioButton1.setAttribute("value", "Huvudstad");
    div.appendChild(radioButton1);

    const radioButton2 = document.createElement("input");
    const label2 = document.createElement("label");
    label2.textContent = "Befolkning";
    div.appendChild(label2);

    radioButton2.setAttribute("type", "radio");
    radioButton2.setAttribute("name", "Val");
    radioButton2.setAttribute("value", "Befolkning");
    div.appendChild(radioButton2);

    const label3 = document.createElement("label");
    label3.textContent = "Sprak";
    div.appendChild(label3);

    const radioButton3 = document.createElement("input");
    radioButton3.setAttribute("type", "radio");
    radioButton3.setAttribute("name", "Val");
    radioButton3.setAttribute("value", "Sprak");
    div.appendChild(radioButton3);

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    div.appendChild(editButton);

    editButton.addEventListener("click", (e) => {
        if (document.querySelector("form")) {
            document.querySelector("form").remove();
        }
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
        
        if (radioButton1.checked) {
        const City = document.createElement("input")
        City.setAttribute("placeholder", "City");
        City.setAttribute("name", "City");
        form.appendChild(City);
        }
        else if (radioButton2.checked) {
        const Population = document.createElement("input")
        Population.setAttribute("placeholder", "Population");
        Population.setAttribute("type", "number");
        Population.setAttribute("min", "0");
        Population.setAttribute("name", "Population")
        form.appendChild(Population);
        }
        else if (radioButton3.checked) {
        const Language = document.createElement("input")
        Language.setAttribute("placeholder", "Language");
        Language.setAttribute("name", "Language");
        form.appendChild(Language);
        }
        const Submitbutton = document.createElement("button");
        Submitbutton.innerHTML = "Submit";
        form.appendChild(Submitbutton);
    })
})

        


const DeleteOnSubmit = async(e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5050/admin", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            kod: e.target[0].value,
            namn: e.target[1].value,
        }),
    });
    const data = await res.json();
    
    if (data.error) {
        alert(data.error);
    }
    else {
        alert(data);
        document.querySelector("form").remove();
    }
}

deleteButton.addEventListener("click", (e) => {
    if (document.querySelector("form")) {
    document.querySelector("form").remove();}
    if (document.querySelector("div")) {
        document.querySelector("div").remove();}
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

