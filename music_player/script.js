/* 
1. render - Done
2. scroll top - Done
3. play/pause/seek - Done
4. CD rotate - Done
5. Next/ prev - Done
6. Random - Done
7. Next / Repeat when ended - Done
8. Active song - Done
9. Scroll active song into view - Done
10. play song when click - 1:28:00
- Đưa những song đã hát vào 1 array > Khi phát hết những bài chưa phát > clear array bắt đầu lại => tránh tình trạng phát lại những bài đã phát

*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.dashboard .cd');
const audio = $('audio');
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd .cd-thumb');
const progress = $('#progress');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playList');

const app = {
    songs: [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/music/Nevada-Vicetone-4494556.mp3',
            image: './assets/image/Nevada-Vicetone-4494556.jpg'
        },
        {
            name: 'Animals',
            singer: 'Maroon 5',
            path: './assets/music/Animals-Maroon5-3334407.mp3',
            image: './assets/image/Animals-Maroon5-3334407.jpg'
        },
        {
            name: 'Summer Time',
            singer: 'K391',
            path: './assets/music/SummerTime-K391-4163084.mp3',
            image: './assets/image/SummerTime-K391-4163084.jpg'
        },
        {
            name: 'Reality Mix',
            singer: 'LostFrequencies',
            path: './assets/music/RealityMix-LostFrequencies-4948696.mp3',
            image: './assets/image/RealityMix-LostFrequencies-4948696.jpg'
        },
        {
            name: 'Are You With Me Radio Edit',
            singer: 'LostFrequencies',
            path: './assets/music/AreYouWithMeRadioEdit-LostFrequencies-3745590.mp3',
            image: './assets/image/AreYouWithMeRadioEdit-LostFrequencies-3745590.jpg'
        },
        {
            name: 'Sugar',
            singer: 'Maroon5',
            path: './assets/music/Sugar-Maroon5-3338455.mp3',
            image: './assets/image/Sugar-Maroon5-3338455.jpg'
        },
        {
            name: 'Counting Stars',
            singer: 'OneRepublic',
            path: './assets/music/CountingStars-OneRepublic-5506215.mp3',
            image: './assets/image/CountingStars-OneRepublic-5506215.jpg'
        },
        {
            name: 'Something Just Like This',
            singer: 'TheChainsmokers, Coldplay',
            path: './assets/music/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3',
            image: './assets/image/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.jpg'
        },
        {
            name: 'Appologize',
            singer: 'JacsonDerulo',
            path: './assets/music/Appologize-JacsonDerulo_sdpa.mp3',
            image: './assets/image/Appologize-JacsonDerulo_sdpa.jpg'
        },
        {
            name: 'My Love',
            singer: 'Westlife',
            path: './assets/music/MyLove-Westlife-5406564.mp3',
            image: './assets/image/MyLove-Westlife-5406564.jpg'
        },
        {
            name: 'Killing Me Softly',
            singer: 'Joseph Vincent',
            path: './assets/music/KillingMeSoftly-JosephVincent-5943250.mp3',
            image: './assets/image/KillingMeSoftly-JosephVincent-5943250.jpg'
        },
        {
            name: 'Fly Me To The Moon',
            singer: 'Olivia',
            path: './assets/music/FlyMeToTheMoon-Olivia_h5bm.mp3',
            image: './assets/image/FlyMeToTheMoon-Olivia_h5bm.jpg'
        },
    ],

    currentIndex: 0,

    isPlaying: false,

    isRandom: false,

    isRepeat: false,

    playedSongs: [],

    render: function () {
        $('.playlist').innerHTML = this.songs.map((song, index) => {
            return `
            <div class="song" onclick = "app.handleClickSong(${index})" >
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`;
        }).join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        }
        );
    },

    handelEvent: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;
        //Fuction handel random and repeat song
        const handelRandomRepeat = function () {
            if (_this.isRepeat) {
                _this.loadCurrentSong();
            } else if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
        };

        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ],
            {
                duration: 10000, //10 second
                iterations: Infinity //lặp vô hạn
            });
        cdThumbAnimate.pause();

        //Xử lý khi phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrollTop;
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;
        }

        //Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        //Xử lý song được play - Chỉ khi song thực sự play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        //Xử lý khi song bị pause - chỉ khi song thực sự pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        //Khi tiến độ thay đổi
        audio.ontimeupdate = function () {
            const totalTime = audio.duration;
            const audioCurrentTime = audio.currentTime;
            if (totalTime) {
                const progressPercent = Math.floor(audioCurrentTime * 100 / totalTime);
                progress.value = progressPercent;
            }
        }

        //Xử lý khi tua song
        progress.oninput = function () {
            const totalTime = audio.duration;
            if (totalTime) {
                const seekTime = progress.value * totalTime / 100;
                audio.currentTime = seekTime;
            }
        }

        //Xử lý khi next song - Có thêm css cho button, khác với original video
        nextBtn.onclick = function () {
            nextBtn.classList.add('active');

            setTimeout(function () {
                nextBtn.classList.remove('active');
            }, 100);

            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.scrollToActiveSong();
        }

        //Xử lý khi previous song - Có thêm css cho button
        prevBtn.onclick = function () {
            prevBtn.classList.add('active');

            setTimeout(function () {
                prevBtn.classList.remove('active');
            }, 100);

            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.scrollToActiveSong();
        }

        //Xử lý khi random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        //Xử lý khi next kết thúc song
        audio.onended = function () {
            handelRandomRepeat();
        }

        //Xử lý khi repeat -  1 bài - 1 danh sách
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        //Xử lý active khi song isPlaying
        audio.onloadstart = function () {
            const currentPlaySong = $$('.song');
            const activedSong = $('.song.active');
            if (activedSong) {
                activedSong.classList.remove('active');
            }
            currentPlaySong[_this.currentIndex].classList.add('active');
        }

        //Xử lý khi click song name
        

    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            const activeSong = $('.song.active');
            if (this.currentIndex <= 3) {
                activeSong.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            } else {
                activeSong.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 350);

    },

    loadCurrentSong: function () {
        heading.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    randomSong: function () {
        //Xử lý random chống trùng bài hiện tại và những bài đã phát
        let newRandomIndex;
        if (this.playedSongs.length >= this.songs.length) {
            this.playedSongs = [];
        }
        do {
            newRandomIndex = Math.floor(Math.random() * this.songs.length);
        } while (newRandomIndex === this.currentIndex || this.playedSongs.includes(newRandomIndex));

        this.currentIndex = newRandomIndex;
        this.playedSongs.push(newRandomIndex);
        this.loadCurrentSong();
    },

    handleClickSong: function (index) {
        this.currentIndex = index;
        this.loadCurrentSong();
        audio.play();
    },

    start: function () {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties();
        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handelEvent();
        //2 hàm trên liên quan đến định nghĩa và xử lý nên ta sẽ để trên cùng

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playlist
        this.render();
    }
}

app.start();