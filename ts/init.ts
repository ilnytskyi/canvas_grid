let p1 = new Point(1,2);
let p2 = new Point(4,8);
let p3 = new Point(5,2);
console.log(p1);

let l1 = new Line(p1, p2);
console.log(l1);

let t1 = new Triangle(p1,p2,p3);
console.log(t1);

var g = new Grid({
    id: 'canvas',
    width: 900,
    height: 900
});
g.init();