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
        this.points = [p1, p2, p3];
    }
    return Triangle;
}(Shape));
var Grid = (function () {
    function Grid(config) {
        this.config = {
            id: 'grid',
            countColumns: 20,
            countRows: 20,
            pointDispersion: 34,
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
            var row = [];
            for (var j = 0; j < this.config.countColumns; j++) {
                var x = i * this.config.width / this.config.countRows + Math.floor((Math.random() * this.config.pointDispersion) - this.config.pointDispersion) + this.config.pointDispersion;
                var y = j * this.config.height / this.config.countColumns + Math.floor((Math.random() * this.config.pointDispersion) - this.config.pointDispersion) + this.config.pointDispersion;
                row.push(new Point(x, y));
            }
            points.push(row);
        }
        this.points = points;
    };
    Grid.prototype.putPoint = function (point) {
        var x = point.x - this.config.pointSize / 2;
        var y = point.y - this.config.pointSize / 2;
        this.cx.fillRect(x, y, this.config.pointSize, this.config.pointSize);
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
            //vertical
            row.forEach(function (point, j) {
                if (j + 1 >= _this.config.countRows)
                    return;
                var lineV = new Line(_this.points[i][j], _this.points[i][j + 1]);
                _this.drawLine(lineV);
            });
            //horizontal
            row.forEach(function (point, j) {
                if (i + 1 >= _this.config.countColumns)
                    return;
                var lineH = new Line(_this.points[i][j], _this.points[i + 1][j]);
                _this.drawLine(lineH);
            });
            //snake
            row.forEach(function (point, j) {
                if (j + 1 >= _this.config.countRows || i + 1 >= _this.config.countColumns)
                    return;
                var p1 = _this.points[i][j];
                var p2 = _this.points[i][j];
                if (i % 2 == 0 && j % 2 == 0) {
                    p1 = _this.points[i][j];
                    p2 = _this.points[i + 1][j + 1];
                }
                else if (i % 2 == 0 && j % 2 == 1) {
                    p1 = _this.points[i + 1][j];
                    p2 = _this.points[i][j + 1];
                }
                else if (i % 2 == 1 && j % 2 == 0) {
                    p1 = _this.points[i][j + 1];
                    p2 = _this.points[i + 1][j];
                }
                else if (i % 2 == 1 && j % 2 == 1) {
                    p1 = _this.points[i][j];
                    p2 = _this.points[i + 1][j + 1];
                }
                var lineS = new Line(p1, p2);
                _this.drawLine(lineS);
            });
        });
    };
    Grid.prototype.init = function () {
        this.generatePoints();
        this.renderLines();
        this.renderPoints();
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