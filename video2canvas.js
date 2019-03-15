function Video2Canvas(options){
  options = options || {};
  this.src = options.src || document.querySelector('video');
  this.dest = options.dest || document.querySelector('canvas');
  this.ctx = this.dest.getContext('2d');
  this.fps = options.fps || 30;
  this.draw_fn = options.draw_fn || function(ctx, video){ ctx.drawImage(video, 0, 0); };

  // internal aliases
  let src = this.src;
  let dest = this.dest;
  let ctx = this.ctx;
  let fps = this.fps;
  let draw_fn = this.draw_fn;

  // set canvas size = video size when known
  src.addEventListener('loadedmetadata', function() {
    dest.width = src.videoWidth;
    dest.height = src.videoHeight;
  });

  // when play video, draw video on canvas
  src.addEventListener('play', function() {
    (function loop() {
      if (!src.paused && !src.ended) {
        draw_fn(ctx, src);
        setTimeout(loop, 1000 / fps); // drawing at N fps
      }
    })();
  }, 0);
}
