var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var PointCollection = (function () {
    function PointCollection() {
    }
    PointCollection.prototype.push = function (point) {
        this.points.push(point);
    };
    return PointCollection;
}());
var Line = (function () {
    function Line(from, to) {
        this.from = from;
        this.to = to;
    }
    return Line;
}());
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    return Triangle;
}(Shape));
var Grid = (function () {
    function Grid(config) {
        this.config = {
            id: 'grid',
            countColumns: 20,
            countRows: 20,
            pointDispersion: 50,
            width: screen.width,
            height: screen.height,
            fps: 29,
            pointColor: '#000',
            lineColor: '#ccc',
            lineWidth: 1,
            background: '#59ADDF',
            showPoints: true,
            showLines: true,
            pointSize: 2
        };
        this.setCustomConfig(config);
        this.setCanvas(this.config.id);
    }
    Grid.prototype.setCustomConfig = function (config) {
        for (var item in config) {
            this.config[item] = config[item];
        }
    };
    Grid.prototype.setCanvas = function (id) {
        var cx = document.getElementById(id);
        if (!cx) {
            var canvas = document.createElement('canvas');
            canvas.id = id;
            canvas.width = this.config.width;
            canvas.height = this.config.height;
            document.body.appendChild(canvas);
            cx = document.getElementById(id);
        }
        this.cx = cx.getContext('2d');
    };
    Grid.prototype.generatePoints = function () {
        var points = [];
        for (var i = 0; i < this.config.countRows; i++) {
            var x = i * this.config.width / this.config.countRows;
            var row = [];
            for (var j = 0; j < this.config.countColumns; j++) {
                var y = j * this.config.height / this.config.countColumns;
                row.push(new Point(x, y));
            }
            points.push(row);
        }
        this.points = points;
    };
    Grid.prototype.putPoint = function (point) {
        this.cx.fillRect(point.x, point.y, this.config.pointSize, this.config.pointSize);
    };
    Grid.prototype.renderPoints = function () {
        var _this = this;
        if (!this.config.showPoints)
            return;
        this.points.forEach(function (row) {
            row.forEach(function (point) {
                _this.putPoint(point);
            });
        });
    };
    Grid.prototype.drawLine = function (line) {
        this.cx.beginPath();
        this.cx.strokeStyle = this.config.lineColor;
        this.cx.lineWidth = this.config.lineWidth;
        this.cx.moveTo(line.from.x, line.from.y);
        this.cx.lineTo(line.to.x, line.to.y);
        this.cx.stroke();
    };
    Grid.prototype.renderLines = function () {
        var _this = this;
        if (!this.config.showLines)
            return;
        this.points.forEach(function (row, i) {
            row.forEach(function (point, j) {
                if (j + 1 >= _this.config.countRows)
                    return;
                var lineV = new Line(_this.points[i][j], _this.points[i][j + 1]);
                _this.drawLine(lineV);
            });
            row.forEach(function (point, j) {
                if (i + 1 >= _this.config.countColumns)
                    return;
                var lineH = new Line(_this.points[i][j], _this.points[i + 1][j]);
                _this.drawLine(lineH);
            });
        });
    };
    Grid.prototype.init = function () {
        this.generatePoints();
        this.renderPoints();
        this.renderLines();
    };
    return Grid;
}());
var p1 = new Point(1, 2);
var p2 = new Point(4, 8);
var p3 = new Point(5, 2);
console.log(p1);
var l1 = new Line(p1, p2);
console.log(l1);
var t1 = new Triangle(p1, p2, p3);
console.log(t1);
var g = new Grid({
    id: 'canvas',
    width: 900,
    height: 900
});
g.init();
//# sourceMappingURL=init.js.map