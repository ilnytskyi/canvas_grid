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
    cx: document.querySelector('canvas#canvas'),
    width: screen.width,
    height: screen.height,
    dispersion: 60, //55
    lineWidth: 0.25,
    showLines: true,
    showDots: true,
    fillColor: '#000917',
    points: []
}
console.log(new Point(1,2));
console.log(new Point(3,2).y);
var p1 = new Point(1,1);
var p2 = new Point(2,2);
console.log(new Line(p1,p2));
