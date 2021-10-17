const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 画面のサイズ変動があった時に高さを再計算する
window.addEventListener('resize', setFillHeight);

// 初期化
setFillHeight();

let app = new Vue({
    el: "#app",
    data: {
        items: exItems,
        prevTime: 0,
        timer: 0,
        activeBtn: undefined // undefined or 0 or 1
    },
    created: function() {
        console.log('created!');
        var time_0 = this.items[0].time;
        this.items[0].timeStr = this.dateString(time_0); 
        var time_1 = this.items[1].time;
        this.items[1].timeStr = this.dateString(time_1);
    },
    // `methods` オブジェクトの下にメソッドを定義する
    methods: {
        btnClick: function(btn_id){
            if (this.activeBtn == undefined) {
                this.start(btn_id);
            }else if (btn_id == this.activeBtn) {
                this.stop(btn_id);
            } else {
                var opposite = (btn_id == 1) ? 0 : 1;
                this.stop(opposite); // 他方をストップ
                this.start(btn_id); 
            }
        },
        start: function (btn_id) {
            this.items[btn_id].executing = true;
            this.items[this.opposite(btn_id)].executing = false;
            this.activeBtn = btn_id;
            this.prevTime = new Date();
            this.startCount(btn_id);
        },
        stop: function (btn_id) {
            this.activeBtn = undefined;
            this.items[btn_id].executing = false;
            this.stopCount();
        },
        opposite: function(btn_id) {
            var result = (btn_id == 0) ? 1 : 0;
            return result;
        },
        dateString: function(time) {
            const sec = Math.floor(time/1000)%60;
            const min = Math.floor(time/1000/60)%60;
            const hours = Math.floor(time/1000/60/60)%24;
            return hours.toString().padStart(2, "0") + " : " + min.toString().padStart(2, "0") + " : " + sec.toString().padStart(2, "0");
        },
        startCount: function(btn_id) {
            this.timer = setInterval(this.displayTime, 1000, btn_id);
            console.log(this.timer);
        },
        displayTime: function(btn_id) {
            var now = new Date();
            var diff = now - this.prevTime;
            this.prevTime = now;
            var time = this.items[btn_id].time;
            time += diff;
            console.log(time);
            this.items[btn_id].time = time;
            this.items[btn_id].timeStr = this.dateString(time);
        },
        stopCount: function() {
            clearInterval(this.timer);
        }
        
    }
});
