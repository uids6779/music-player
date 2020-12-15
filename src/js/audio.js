;(function (root) {

    function AudioManager () {
        this.audio = new Audio(); //创建一个audio实例
        this.status = 'pause';  //歌曲状态
    }

    AudioManager.prototype = {
        //加载音乐
        load(src) {
            this.audio.src = src; //设置音乐路径
            this.audio.load();  // 加载音乐
        },
        //播放音乐
        play() {
            this.audio.play();
            this.status = 'play';
        },
        //暂停音乐
        pause() {
            this.audio.pause();
            this.status = 'pause';
        },
        //播放完成的事件
        end(fn) {
            this.audio.onended = fn;
        },
        //跳转到播放的某个时间点
        playTo(time) {
            this.audio.currentTime = time;  //unit: s
        }
    }

    root.music = new AudioManager();

})(window.player || (window.player = {}))