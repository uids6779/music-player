;(function (root) {
    /**
     * set background of body using GaussBlur
     * set album bg
     * @param {*} src 
     */
    function renderBg(src) {
        root.blurImg(src);

        const img = document.querySelector('.songImg img');
        img.src = src;
    }
    /**
     * render song name, author and album
     * @param {*} data 
     */
    function renderInfo(data) {
        const title = document.querySelector('.songInfo h2');
        const author = document.querySelector('.songInfo .author');
        const album = document.querySelector('.songInfo .album');
        title.innerHTML = data.name;
        author.innerHTML = data.singer;
        album.innerHTML = data.album;
    }
    /**
     * render if current song is liked
     * @param {*} isLike 
     */
    function renderFavorite(isLike) {
        const control = document.querySelector('.control').children;
        control[0].className = isLike? 'liked' : '';
        
    }

    function render(data) {
        renderBg(data.image);
        renderInfo(data);
        renderFavorite(data.isLike);
    }

    root.render = render;
})(window.player || (window.player = {}))