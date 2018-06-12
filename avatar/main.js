(function(){
  document.querySelector("#file-uploader").addEventListener("change",function(ev){
    // Administrador de archivos
    let files = ev.target.files;
    let image = files[0];

    // Convertir el archivo en URL
    let imgURL = URL.createObjectURL(image);

    document.querySelector(".profile .img").style.backgroundImage = "url('"+ imgURL +"')";
  });
})()
