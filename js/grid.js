/*canvas grid*/
function Point(x,y,color) {
    if (typeof x != 'number' && typeof x != 'number') throw new Error('Invalid type of argument');
    var self = this;
    this.x = null || x;
    this.y = null || y;
    this.color = null || color;
    return this;
}
function Line(from,to,color,width) {
    if (!(from instanceof Point && to instanceof Point)) throw new Error('Invalid type of argument');
    this.from = null || from;
    this.to = null || to;
    this.color = null || color;
    this.width = null || width;
    return this;
}
var config = {
    selector: 'canvas#canvas',
    width: screen.width,
    height: screen.height,
    dispersion: 60, //55
    lineWidth: 0.25,
    showLines: true,
    showDots: true,
    fillColor: '#000',
    pointWidth: 1,
    pointHeight: 1,
    countPointRows: 15,
    countPointsCols: 15,
    points: []
}
function generatePoints() {
    var points = [];
    for (var i = 0; i < config.countPointRows; i++) {
        for (var j = 0; j < config.countPointsCols; j++) {
            var point = new Point(
                i * (config.width) / config.countPointRows + Math.floor((Math.random() * config.dispersion) - config.dispersion),
                j * (config.height) / config.countPointsCols + Math.floor((Math.random() * config.dispersion) - config.dispersion)
            );
            points[i][j] = point;
        }
    }
    config.points = points;
}
function putPoint(cx,point) {
    cx.fillRect(point.x,point.y,config.pointWidth,config.pointHeight);
}
function drawGrid(config) {
     var canvas = document.getElementById('canvas');
     var cx = canvas.getContext("2d");
     cx.fillStyle = config.fillColor;

    // var p1 = new Point(1,1);
    // var p2 = new Point(2,2);
    //
    // putPoint(cx,p1);
    // putPoint(cx,p2);
    // console.log(cx);
}

window.onload = function () {
    generatePoints();
    drawGrid(config);
}

console.log(new Point(1,2));
console.log(new Point(3,2).y);
var p1 = new Point(1,1);
var p2 = new Point(2,2);
console.log(new Line(p1,p2));
