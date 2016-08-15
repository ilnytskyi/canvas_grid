class Grid {
    cx:Element;
    config:Object;
    points:PointCollection;

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
            background: '#59ADDF'


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
        this.cx = cx;
    }

    generatePoints() {
        for (var i = 0; i < this.config.countRows; i++) {
            var x = this.config.width / i;
            for (var j = 0; j < this.config.countColumns; j++) {
                var y = 0 || this.config.height / j;
                console.log(x + ', ' + y);
            }
        }
    }

    init() {
        this.generatePoints();
    }
}
