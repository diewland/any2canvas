function Canvas2Canvas(options){
  options = options || {};
  this.src = options.src || document.querySelectorAll('canvas')[0]; // source canvas
  this.dest = options.dest || document.querySelectorAll('canvas')[1]; // dest canvas
  this.ctx = this.dest.getContext('2d');
  this.fps = options.fps || 30;
  this.draw_fn = options.draw_fn || function(ctx, video){ ctx.drawImage(video, 0, 0); };

  // internal aliases
  let src = this.src;
  let dest = this.dest;
  let ctx = this.ctx;
  let fps = this.fps;
  let draw_fn = this.draw_fn;

  let prev_w = null;
  let persist_count = 0;
  function sync_size(){
    if(persist_count > 20){ // persist
      return;
    }
    else if(prev_w != src.width){ // change
      // update size
      dest.width = src.width;
      dest.height = src.height;
      // reset presist
      presist_count = 0;
      prev_w = src.width;
    }
    else { // same
      persist_count++;
    }
  }

  // draw source canvas on dest canvas
  (function loop() {
    sync_size();
    draw_fn(ctx, src);
    setTimeout(loop, 1000 / fps); // drawing at N fps
  })();
}
