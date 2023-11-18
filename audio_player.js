let title = document.getElementById('title')
let slider = document.getElementById('duration_slider')
let avatar_song = document.getElementById('avatar_song')
let present = document.getElementById('present')
let total = document.getElementById('total')
let artist = document.getElementById('artist')
let playOrPause = document.getElementById('play')
let volume = document.getElementById('volume')
let volumeShow = document.getElementById('volume_show')
let volume_level = 1
let timer
let index_song = 0
let song = document.getElementById('audio')
let playSong = false
let auto = document.getElementById('auto_icon')
let mode = 1
let listSong = [
    {
        name: "BlackJack",
        path: "https://vnno-vn-5-tf-a128-zmp3.zmdcdn.me/e56880dcdfdb114500a4cdc29fce8130?authen=exp=1700409179~acl=/e56880dcdfdb114500a4cdc29fce8130/*~hmac=d4775677954daa81fd395ca1f2d99f98&fs=MHx3ZWJWNXwxNC4xOTEdUngMTY2LjU",
        img: "https://photo-playlist-zmp3.zmdcdn.me/s2/mixtape?src=HavwqN7EYmrDGr6VBegSG044GDzimDv000H6tstVtLa0KalQODlHNGzM6zjWXOPJN5eHr3A8YGLO1nBJBuRC15H1GDXan8KtJqPCxsAFs7rO2m2eSy-RDqiB0AWZpvjvJnK3_IB7comPJLV-8yV8UaCQL_Cfb9fx4aTLhIcTrNS04LdhUuwI8rP71h5DmCbYVs46iMiYVG&cv=1&size=thumb/240_240",
        singer: "Soobin Hoang Son, Binz"
    },
    {
        name: "You & Me",
        path: "https://a128-zmp3.zmdcdn.me/1592c9689ccdcabf407998132db3da64?authen=exp=1700409430~acl=/1592c9689ccdcabf407998132db3da64/*~hmac=6b79d908f0509605ef37a663f92cdde1&fs=MHx3ZWJWNXwxNC4xOTEdUngMTY2LjU",
        img: "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/0/e/d/2/0ed20794e6572a20f57cd15393aca3f1.jpg",
        singer: "Jennie"
    },
    {
        name: "id-072019",
        path: "https://firebasestorage.googleapis.com/v0/b/crudstudent-7e27a.appspot.com/o/image%2FW-n%20-%20id%20072019%20-%203107%20ft%20267.mp3?alt=media&token=033c4ea8-ade5-4e44-9057-69c7bda086ff",
        img: "https://img.freepik.com/free-photo/liquid-marbling-paint-texture-background-fluid-painting-abstract-texture-intensive-color-mix-wallpaper_1258-82940.jpg",
        singer: "W/n"
    }
]
let imageUrl = 'https://img.freepik.com/free-photo/liquid-marbling-paint-texture-background-fluid-painting-abstract-texture-intensive-color-mix-wallpaper_1258-82940.jpg'
document.body.style.backgroundImage = `url(${imageUrl})`
function loadSong(index_song) {
    // song.innerHTML = '<audio id="audio"><source type="audio/mpeg" src="'+ listSong[index_song].path +'"></audio>'
    song.src = listSong[index_song].path
    title.innerText = listSong[index_song].name
    artist.innerText = listSong[index_song].singer
    avatar_song.src = listSong[index_song].img
    present.innerHTML = index_song + 1
    total.innerHTML = listSong.length
    timer = setInterval(rangeSlider, 1000)
}
loadSong(index_song)
function playAndPause() {
    playSong = !playSong
    if(playSong) {
        song.play()
        playOrPause.innerHTML='<button id="play"><i class="bi bi-pause"></i></i></button>'
    }
    else {
        song.pause()
        playOrPause.innerHTML='<button id="play"><i class="bi bi-play"></i></i></button>'
    }
}

function modeChange() {
    if (mode < 3) {
        mode += 1
    } else {
        mode = 1
    }
    switch (mode) {
        case 1: auto.className = "bi bi-repeat"
            break
        case 2: auto.className = "bi bi-repeat-1"
            break
        case 3: auto.className = "bi bi-shuffle"
            break
        default: auto.className = "bi bi-repeat"
    }
}

function rangeSlider() {
    switch (mode) {
        case 1: {
            sliderDefault()
            song.loop = false
            if ((song.currentTime/song.duration)*100 === 100) {
                playSong = !playSong
                playOrPause.innerHTML='<button id="play"><i class="bi bi-play"></i></i></button>'
            }
            break
        }
        case 2: {
            sliderDefault()
            song.loop = true
            break
        }
        case 3:
            sliderDefault()
            song.loop = false
            if ((song.currentTime/song.duration)*100 === 100) {
                nextSong()
            }
            break
        default: {
            sliderDefault()
            song.loop = false
            if ((song.currentTime/song.duration)*100 === 100) {
                playSong = !playSong
                playOrPause.innerHTML='<button id="play"><i class="bi bi-play"></i></i></button>'
            }
        }
    }
}

function sliderDefault() {
    let position = 0
    if(!isNaN(song.duration)){
        position = (song.currentTime/song.duration)*100
        slider.value = position
    }
}
function rangeChange() {
    let slider_change = (song.duration*slider.value)/100
    song.currentTime = slider_change
}
function volumeChange() {
    volume_level = volume.value/100
    volumeShow.innerText = (Math.floor(volume_level*100)).toString()
    song.volume = volume_level
    if (song.volume !== 0) {
        document.getElementById('volume_icon').className = "bi bi-volume-up"
    } else {
        document.getElementById('volume_icon').className = "bi bi-volume-mute"
    }
}
function mute() {
    if (song.volume !== 0) {
        song.volume = 0
        document.getElementById('volume_icon').className = "bi bi-volume-mute"
    } else {
        song.volume = volume_level
        document.getElementById('volume_icon').className = "bi bi-volume-up"
    }
}

function nextSong() {
    if (index_song < listSong.length - 1) {
        index_song += 1
        loadSong(index_song)
        playSong = false
        playAndPause()
    }
    else {
        index_song = 0
        loadSong(index_song)
        playSong = false
        playAndPause()
    }
}
function prevSong() {
    if (index_song > 0) {
        index_song -= 1
        loadSong(index_song)
        playSong = false
        playAndPause()
    }
    else {
        index_song = listSong.length-1
        loadSong(index_song)
        playSong = false
        playAndPause()
    }
}
