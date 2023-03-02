const addButton = document.querySelector("#addButton");
const body = document.querySelector("body");

const DoThisOnSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch ("http://localhost:5050/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Namn: e.target[0].value,
            Befolkning: e.target[1].value,
            Huvudstad: e.target[2].value,
        }),
    });
    const data = await res.json();
    console.log(data);
    e.target.remove();
}
   

addButton.addEventListener("click", (e) => {
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
    form.appendChild(Population);
    const Submitbutton = document.createElement("button");
    Submitbutton.innerHTML = "Submit";
    form.appendChild(Submitbutton);

});