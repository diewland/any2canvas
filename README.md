# from any2canvas
from video/canvas to (another) canvas

```javascript
// video to canvas
var v = new Video2Canvas({
  src: document.querySelector('video'),   // default
  dest: document.querySelector('canvas'), // default
  fps: 30,                                // default
  draw_fn: function(ctx, video){          // default
    ctx.drawImage(video, 0, 0);
  },
});

// from canvas to canvas
var c = new Canvas2Canvas({
  src: document.querySelectorAll('canvas')[0],  // default
  dest: document.querySelectorAll('canvas')[1], // default
  fps: 30,                                      // default
  draw_fn: function(ctx, video){                // default
    ctx.drawImage(video, 0, 0);
  },
});
```
