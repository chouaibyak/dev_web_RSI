document.getElementById('btn').addEventListener("click", function () {

    let motif = document.getElementById('regex').value;
    let texte = document.getElementById('chaine').value;

    let flag = "";

    if (document.querySelector('input[value="g"]').checked) {
        flag += "g";
    }

    if (document.querySelector('input[value="i"]').checked) {
        flag += "i";
    }

    // chercher 2 chiffres
    // partout dans le texte (g)
    let regex = new RegExp(motif, flag);

    let action = document.querySelector('input[name="action"]:checked').value;

    let resultat;

    if (action === "extraire") {
        // match() cherche les correspondances
        resultat = texte.match(regex);
    } 
    else if (action === "remplacer") {
        resultat = texte.replace(regex, "***");
    }

    if (resultat === null) {
        resultat = "Aucune correspondance trouvée";
    }

    document.getElementById("resultat").value = resultat;
});