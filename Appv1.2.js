//Connection
var BANGLE_CODE = `
Bangle.on('accel',function(a) {
  var d = [
    "A",
    Math.round(a.x*100),
    Math.round(a.y*100),
    Math.round(a.z*100)
    ];
  Bluetooth.println(d.join(","));
})
`;

// When we click the connect button...
var connection;
document.getElementById("btnConnect").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }
  // Connect
  Puck.connect(function(c) {
    if (!c) {
      alert("Couldn't connect!");
      return;
    }
    connection = c;
    // Handle the data we get back, and call 'onLine'
    // whenever we get a line
    var buf = "";
    connection.on("data", function(d) {
      buf += d;
      var l = buf.split("\n");
      buf = l.pop();
      l.forEach(onLine);
    });
    // First, reset the Bangle
    connection.write("reset();\n", function() {
      // Wait for it to reset itself
      setTimeout(function() {
        // Now upload our code to it
        connection.write("iphone",
          function() { console.log("Ready..."); });
      }, 1500);
    });
  });
});

// When we get a line of data, check it and if it's
// from the accelerometer, update it
function onLine(line) {
  console.log("RECEIVED:"+line);
  var panic=true;
}


let page = 0;
function drawPage(p){
  if(p == 1){
    g.setColor(0,0,0).fillRect(0,0,230,230);
    g.setColor(255,255,255);
    g.setFont("Vector:20");
    g.drawString("Custom message\ngoes here", 5, 50);
    page = 1;
  } else if(p == 2){
    g.setColor(0,0,0).fillRect(0,0,230,230);
    g.setColor(0,200,0).fillCircle(87.5,87.5,50);
    page = 2;
  }
}


//Main app
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
