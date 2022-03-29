let citySearch = document.querySelector("#city-search");
let paragrafo = document.querySelector("#error");
let form = document.querySelector("form");
let lista = document.querySelector("#lista");
let descrizione = document.querySelector("#descrizione");
let score = document.querySelector("#score");
let urlCity = "";
let classeFetch;
let url;

score.innerHTML = "";
descrizione.innerHTML = "";

document.body.style.backgroundImage = "url('https://picsum.photos/1920/1080')";
form.onsubmit = function (e) {
  if (citySearch.value === "") {
    e.preventDefault();
    paragrafo.textContent = "Inserisci una città";
  } else {
    e.preventDefault();

    urlCity = citySearch.value.replace(" ", "-").toLowerCase();
    url = `https://api.teleport.org/api/urban_areas/slug:${urlCity}/scores/`;

    paragrafo.textContent = `Città scelta : ${citySearch.value
      .replace("-", " ")
      .toUpperCase()}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        classeFetch = json;
        score.innerHTML += `
        <thead>
        <tr>
          <th scope="col"><strong>#</strong></th>
          <th scope="col"><strong>Value</strong></th>
          <th scope="col"><strong>Score</strong></th>
          <th scope="col"></th>
        </tr>
      </thead>        
`;
        let i = 0;
        for (let valore of classeFetch.categories) {
          i++;

          let numero = valore.score_out_of_10;
          let arrotondato = Math.round(numero);
          let colore = valore.color;
          let nome = valore.name;

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
