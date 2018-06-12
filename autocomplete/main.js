class Autocomplete{
  constructor(input_selector,base_url){
    this.search = this.search.bind(this);
    this.input = document.querySelector(input_selector);
    this.url = base_url;
    this.value = "";
    this.interval = null;
    this.buildDataList();
    this.bindEvents();
  }

  bindEvents(){
    this.input.addEventListener("keyup",() =>{
      // Se optimiza la cantidad de peticiones
      if(this.input.value == this.value || this.input.value.length < 3) return;
      if(this.interval) window.clearInterval(this.interval);

      this.value = this.input.value;

      this.interval = window.setTimeout(this.search,500);
      // this.search();
    });
  }

  buildDataList(){
    this.dataList = document.createElement("datalist");
    this.dataList.id = "datalist-autocomplete";
    document.querySelector("body").appendChild(this.dataList);
    this.input.setAttribute("list","datalist-autocomplete");
  }

  search(){
    // Search.get("").then(data => {});
    Search.get(this.url+this.value).then(results => this.build(results));
  }

  build(response){
    this.dataList.innerHTML = "";
    response.items.forEach(item => {
      let optionEl = document.createElement("option");
      optionEl.value = item.volumeInfo.title;
      if(item.volumeInfo.subtitle)
        optionEl.innerHTML = item.volumeInfo.title;

      this.dataList.appendChild(optionEl);
    });
  }
}

class Search{
  static get(url){
    // Petición AJAX
    let xhr = new XMLHttpRequest();

    xhr.open("GET",url);

    xhr.send();

    return new Promise((resolve,reject)=>{
      // Comprobar si ya se envió la petición
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
          // Todo salió bien
          // Convertir en JSON lo que haya entregado como respuesta el servidor remoto
          if(xhr.status == 200) return resolve(JSON.parse(xhr.responseText));

          // Algo salió mal
          reject(xhr.status);
        }
      }
    });
  }
}

(function(){
  const GoogleBooksApiURL = "https://www.googleapis.com/books/v1/volumes/?q=";
  let autocomplete = new Autocomplete("#searcher",GoogleBooksApiURL);
  // autocomplete.search();
})();
