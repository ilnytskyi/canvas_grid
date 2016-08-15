class Grid {
    cx:Element;
    config:Object;
    points:Array;

    constructor(config:Object) {
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

    setCustomConfig(config:Object) {
        for (var item in config) {
            this.config[item] = config[item];
        }
    }

    setCanvas(id:string) {
        var cx = document.getElementById(id);
        if (!cx) {
            let canvas = document.createElement('canvas');
            canvas.id = id;
            canvas.width = this.config.width;
            canvas.height = this.config.height;
            document.body.appendChild(canvas);
            cx = document.getElementById(id);
        }
        this.cx = cx.getContext('2d');
    }

    generatePoints() {
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
    }

    putPoint(point:Point) {
        let x = point.x - this.config.pointSize / 2;
        let y = point.y - this.config.pointSize / 2;
        this.cx.fillRect(x, y, this.config.pointSize, this.config.pointSize);
    }

    renderPoints() {
        if (!this.config.showPoints) return;
        this.points.forEach((row) => {
            row.forEach((point) => {
                this.putPoint(point);
            })
        })
    }

    drawLine(line:Line) {
        this.cx.beginPath();
        this.cx.strokeStyle = this.config.lineColor;
        this.cx.lineWidth = this.config.lineWidth;
        this.cx.moveTo(line.from.x, line.from.y);
        this.cx.lineTo(line.to.x, line.to.y);
        this.cx.stroke();
    }

    renderLines() {
        if (!this.config.showLines) return;
        this.points.forEach((row, i) => {
            //vertical
            row.forEach((point, j) => {
                if (j + 1 >= this.config.countRows) return;
                var lineV = new Line(this.points[i][j], this.points[i][j + 1]);
                this.drawLine(lineV);

            });
            //horizontal
            row.forEach((point, j) => {
                if (i + 1 >= this.config.countColumns) return;
                var lineH = new Line(this.points[i][j], this.points[i + 1][j]);
                this.drawLine(lineH);


            });
            //shake
            row.forEach((point, j) => {
                if (j + 1 >= this.config.countRows || i + 1 >= this.config.countColumns) return;
                var p1 = this.points[i][j];
                var p2 = this.points[i][j];
                if (j % 2 == 1 && (i-1 > 0)) {
                    p1 = this.points[i][j];
                    p2 = this.points[i + 1][j + 1];
                }
                var lineS = new Line(p1, p2);
                this.drawLine(lineS);

            });
        })
    }

    init() {
        this.generatePoints();
        this.renderPoints();
        this.renderLines();
    }
}
