(function (root) {

    function ListManager(data) {
        this.data = data;
        this.list = []; //存储所有歌曲DOM对象
        this.songList = document.querySelector('.songList');
        this.closeBtn = this.songList.querySelector('.close');
    }

    ListManager.prototype = {
        /**
         * 渲染列表内容，并绑定事件
         */
        renderList() {
            const dt = document.createElement('dt');
            const dl = document.querySelector('.songList dl');
            dt.innerHTML = '播放列表';
            dl.appendChild(dt);
            this.data.forEach((ele, index) => {
                const dd = document.createElement('dd');
                dd.innerHTML = ele.name;
                dl.appendChild(dd);
                this.list.push(dd);

                //给每个dd绑定点击事件，切换选中的状态
                dd.addEventListener('touchend', () => {
                    this.changeActive(index);
                })
            });

            this.changeActive(0); //默认第一首为激活状态

            //绑定关闭事件
            this.closeBtn.addEventListener('touchend', () => {
                this.slideDown();
            });

            //渲染完成后，把列表向下移动隐藏
            this.slideDown();
        },
        /**
         * 点击列表按钮时，显示列表界面
         */
        slideUp() {
            this.songList.style.transition = `all 0.5s`;
            this.songList.style.transform = `translateY(0)`;
        },
        /**
         * 隐藏列表页面
         */
        slideDown() {
            this.listHeight = this.songList.offsetHeight; //得到当前列表的高度
            this.songList.style.transform = `translateY(${this.listHeight}px)`;
        },
        /**
         * 点击后切换选中的状态
         */
        changeActive(val) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].className = '';
            }
            this.list[val].className = 'active';
        }
    }

    root.listManager = ListManager;

})(window.player || (window.player = {}))