(function ($, player) {

    function MusicPlayer() {
        this.songList = null; //存储数据
        this.timer = null; //图片旋转定时器
    }

    MusicPlayer.prototype = {
        /**
         * initiate musicPlayer's functions
         */
        init() {
            this.getDom();
            this.getData('../mock/data.json');
        },
        /**
         * get DOM from page
         */
        getDom() {
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelector('.control').children;
        },
        /**
         * using ajax to get songs data
         */
        getData(url) {
            $.ajax({
                url: url,
                method: 'get',
                success: (data) => {
                    this.songList = data; //存储数据
                    this.indexManager = new player.indexManager(data.length); //实例化索引管理器，需要放在其他功能前面，因为要用到里面的当前歌曲索引值
                    this.listMusic(); //歌曲列表
                    this.loadMusic(this.indexManager.defaultIndex); //加载音乐
                    this.musicControl(); //控制音乐, 绑定点击事件
                },
                error: () => {
                    console.log('obtain data failed');
                }
            });
        },
        /**
         * 加载音乐
         */
        loadMusic(index) {
            player.render(this.songList[index]); //渲染当前歌曲背景页面
            player.music.load(this.songList[index].audioSrc); //根据当前索引加载音乐
        },
        /**
         * 控制音乐，绑定点击事件
         */
        musicControl() {
            const _this = this;
            //上一首
            this.controlBtns[1].addEventListener('touchend', () => {
                this.controlBtns[2].className = 'playing';
                this.loadMusic(this.indexManager.prev());
                this.listManager.changeActive(this.indexManager.curIndex);//点击上一首时，联动到列表中，改变样式
                player.music.play();
                this.imgRotate(0);
            });

            //控制播放、暂停
            this.controlBtns[2].addEventListener('touchend', function () {
                if (player.music.status == 'play') { //歌曲正在播放，按下后暂停播放
                    this.className = '';
                    player.music.pause();
                    _this.imgStopRotate();
                } else { //歌曲没有播放，按下后开始播放
                    this.className = 'playing';
                    player.music.play();
                    _this.imgRotate(_this.record.dataset.rotate || 0);
                }
            });

            //下一首
            this.controlBtns[3].addEventListener('touchend', () => {
                this.controlBtns[2].className = 'playing';
                this.loadMusic(this.indexManager.next());
                this.listManager.changeActive(this.indexManager.curIndex);//点击下一首时，联动到列表中，改变样式
                player.music.play();
                this.imgRotate(0);
            });
        },
        /**
         * 歌曲列表功能
         */
        listMusic() {
            this.listManager = new player.listManager(this.songList);
            this.listManager.renderList();  // 渲染列表
            //给每一个歌曲绑定点击事件
            this.listManager.list.forEach((ele, index) => {
                ele.addEventListener('touchend', () => {
                    //判断当前点击的歌曲是否是目前正在播放的歌曲
                    if(index == this.indexManager.curIndex) {
                        return;
                    }
                    this.loadMusic(index);
                    this.controlBtns[2].className = 'playing';
                    player.music.play();
                    this.indexManager.curIndex = index; //当在列表中切换到对应歌曲后，要修改curIndex的值到到当前索引
                    //点击歌曲播放后隐藏列表
                    this.listManager.slideDown();  
                })
            });
            this.controlBtns[4].addEventListener('touchend', () => {
                this.listManager.slideUp();
            });
        },

        /**
         * 图片旋转
         * @param {*} deg 
         */

        imgRotate(deg) {
            clearInterval(this.timer);

            this.timer = setInterval(() => {
                deg = +deg + 0.2;
                this.record.style.transform = `rotate(${deg}deg)`;
                this.record.dataset.rotate = deg; //将旋转的角度保存到标签上，当前歌曲暂停后再次播放，以该值为基础继续旋转
            }, 1000 / 60);

        },
        /**
         * 停止图片旋转
         */
        imgStopRotate() {
            clearInterval(this.timer);
        }
    }

    const musicPlayer = new MusicPlayer();
    musicPlayer.init();

})(window.Zepto, window.player)