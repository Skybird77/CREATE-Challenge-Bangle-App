let page = 0;
function drawPage(p){
  if(p == 1){
    g.setColor(0,0,0).fillRect(0,0,230,230);
    page = 1;
  } else if(p == 2){
    g.setColor(0,0,0).fillRect(0,0,230,230);
    g.setColor(100,100,100).fillCircle(87.5,87.5,85);
    page = 2;
  }
}

drawPage(1);
Bangle.on('swipe', function(directionLR) {
  if(directionLR==-1){
    drawPage(2);
    Bangle.on('touch', function() {
      if(page == 2){
        g.clear();
        Bangle.drawWidgets();
      }
    });
  }
  if(directionLR==1){
    drawPage(1);
  }
});
