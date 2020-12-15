(function (root) {

    function Index(len) {
        this.defaultIndex = 0; // 页面初始化时索引为0
        this.curIndex = 0;  // 当前播放歌曲的索引
        this.len = len;        // 歌曲数组的长度
    }

    Index.prototype = {
        //返回上一首歌曲的索引值
        prev() {
            return this.getValue(-1);
        },
        //返回下一首歌曲的索引值
        next(){
            return this.getValue(1);
        },
        /**
         * 解决边界越界问题
         * @param {*} val val为1时，代表下一首；val为-1时，代表上一首
         */
        getValue(val) {
            this.curIndex = (this.curIndex + val + this.len) % this.len;
            return this.curIndex;
        }
    }

    root.indexManager = Index;

})(window.player || (window.player = {}))