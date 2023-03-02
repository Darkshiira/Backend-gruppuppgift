

document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let Namn = document.querySelector('#land').value;
        console.log(Namn);
        if(Namn.length>0){
            
            postAPI(Namn);
        }else{
            getAPI();

        }

});


});

async function postAPI(Namn) {
   
    let body = {
        Namn: Namn
    }
    body = JSON.stringify(body);
    console.log(body);

    fetch('http://localhost:5050/api/', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        responseHandler(data);
    });
}

async function getAPI() {
    fetch('http://localhost:5050/api/', {
        method: 'GET'

    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        responseHandler(data);
    });


}

function responseHandler(response) {
    let resultBox = document.querySelector('#result');
    resultBox.innerHTML = "";
    if (response.length > 0) {
        response.forEach(element => {
            let p = document.createElement('p');
            let span = document.createElement('span');
            span.innerHTML = ` Namn: ${element.Namn} Befolkning: ${element.Befolkning} Huvudstad: ${element.Huvudstad}`;

            p.innerHTML = `Namn: ${element.Namn} Befolkning: ${element.Befolkning} Huvudstad: ${element.Huvudstad}`;
            resultBox.appendChild(p);
        });
    } else{
        console.log("hej");
    }
    
}