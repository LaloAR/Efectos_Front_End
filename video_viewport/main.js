class ViewPort{
  static visible(el){
    let coords = el.getBoundingClientRect();

    // Obtener la altura de todo el documento
    let windowHeight = document.documentElement.clientHeight;

    // Validar que el video está dentro del viewport
     return (coords.top < windowHeight && (coords.top * -1) < windowHeight);
  }
}

class PlayOnViewPort{
  constructor(video_selector){
    this.video = document.querySelector(video_selector);
    // Para no perder el valor de evaluate
    this.evaluate = this.evaluate.bind(this);
    this.bindEvents();
  }

  bindEvents(){
    window.addEventListener('scroll',this.evaluate);
  }

  evaluate(){
    if(ViewPort.visible(this.video)){
      this.video.play();
    }else{
      this.video.pause();
    }
  }
}

(function(){
  new PlayOnViewPort("video");
})();
