function Execute(){
    let nombreImg = document.getElementById("NombreImg").value;
    let url = "https://picsum.photos/seed/";
    let divImage = document.getElementById("images");
    
    // vider le contenu avant
    divImage.innerHTML = "";
    
    for(let i = 0; i<nombreImg;i++){
        let img = document.createElement("img");

        img.src = url + i + "/256/256";
        img.style.margin = "5px";

        divImage.appendChild(img);
    }

}