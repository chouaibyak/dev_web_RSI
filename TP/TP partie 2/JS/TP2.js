function Execute() {
    let ville = document.getElementById('ville').value;

    let url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m";

    let container = document.getElementById('container');

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // supprimer ancien résultat
            let old = document.getElementById("meteo");
            if (old) old.remove();

            let divMeteo = document.createElement('div');
            divMeteo.id = "meteo";

            divMeteo.innerHTML = `
                <h3>Météo à ${ville}</h3>
                <p>Température actuelle: ${data.current.temperature_2m} °C</p>
                <p>Vitesse du vent: ${data.current.wind_speed_10m} km/h</p>
            `;

            container.appendChild(divMeteo);
        });
}