let citySearch = document.querySelector("#city-search");
let paragrafo = document.querySelector("#error");
let form = document.querySelector("form");

let key = document.querySelector("#key");
let title = document.querySelector("#title");
let lista = document.querySelector("#lista");
let table = document.querySelector(".table");
let descrizione = document.querySelector("#descrizione");
let classeFetch;
let classeFetch2;
let url;
let url2;
let score = document.querySelector("#score");
score.innerHTML = "";
descrizione.innerHTML = "";
document.body.style.backgroundImage = "url('https://picsum.photos/1920/1080')";
form.onsubmit = function(e) {
    if (citySearch.value === "") {
        e.preventDefault();
        paragrafo.textContent = "Inserisci una città";
    } else {
        e.preventDefault();

        paragrafo.textContent = citySearch.value;
        url = `https://api.teleport.org/api/urban_areas/slug:${paragrafo.textContent}/scores/`;

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                classeFetch = json;
                console.log("fetch: ", classeFetch);
                console.log(classeFetch.works);

                score.innerHTML += `
        <thead>
        <tr>
          

          <th scope="col">#</th>
          <th scope="col">Value</th>
          <th scope="col">Score</th>
          <th scope="col"></th>
        </tr>
      </thead>        
`;
                let i = 0;
                for (let valor of classeFetch.categories) {
                    i++;

                    let numero = valor.score_out_of_10;
                    let arrotondato = Math.round(numero);
                    let colore = valor.color;
                    let nome = valor.name;

                    score.innerHTML += `
          
                <tr>
                <td>${i}</td>
                <td>${nome}</td>
                <td>${arrotondato}</td>
                <td><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${
                  arrotondato * 10
                }%; background-color:${colore};font-size:18px; " aria-valuenow="${
            arrotondato * 10
          }" aria-valuemin="0" aria-valuemax="100">${arrotondato}</div>
              </div></td>
              
          </tr>
          
        `;
                }

                descrizione.innerHTML += `
         <h4>Description</h4>
        <p>${classeFetch.summary}</p>  `;
            })
            .catch((err) => {
                console.log("problem " + err.message);
            });

        descrizione.innerHTML = "";
        score.innerHTML = "";
    }
};