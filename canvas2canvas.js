function Canvas2Canvas(options){
  options = options || {};
  this.video = options.video || document.querySelectorAll('canvas')[0]; // source canvas
  this.canvas = options.canvas || document.querySelectorAll('canvas')[1]; // dest canvas
  this.ctx = this.canvas.getContext('2d');
  this.fps = options.fps || 30;
  this.draw_fn = options.draw_fn || function(ctx, video){ ctx.drawImage(video, 0, 0); };

  // internal aliases
  let video = this.video;
  let canvas = this.canvas;
  let ctx = this.ctx;
  let fps = this.fps;
  let draw_fn = this.draw_fn;

  let prev_w = null;
  let persist_count = 0;
  function sync_size(){
    if(persist_count > 20){ // persist
      return;
    }
    else if(prev_w != video.width){ // change
      // update size
      canvas.width = video.width;
      canvas.height = video.height;
      // reset presist
      presist_count = 0;
      prev_w = video.width;
    }
    else { // same
      persist_count++;
    }
  }

  // draw source canvas on dest canvas
  (function loop() {
    sync_size();
    draw_fn(ctx, video);
    setTimeout(loop, 1000 / fps); // drawing at N fps
  })();
}
