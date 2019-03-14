function Video2Canvas(options){
  options = options || {};
  this.video = options.video || document.querySelector('video');
  this.canvas = options.canvas || document.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.fps = options.fps || 30;
  this.draw_fn = options.draw_fn || function(ctx, video){ ctx.drawImage(video, 0, 0); };

  // internal aliases
  let video = this.video;
  let canvas = this.canvas;
  let ctx = this.ctx;
  let fps = this.fps;
  let draw_fn = this.draw_fn;

  // set canvas size = video size when known
  video.addEventListener('loadedmetadata', function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  // when play video, draw video on canvas
  video.addEventListener('play', function() {
    (function loop() {
      if (!video.paused && !video.ended) {
        draw_fn(ctx, video);
        setTimeout(loop, 1000 / fps); // drawing at N fps
      }
    })();
  }, 0);
}
