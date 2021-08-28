/********************************************** */
//                CONTEXTS/references
/********************************************** */

const playerContainer = document.querySelector('.info'),
audio = document.querySelector('#audio'),
cover = document.querySelector('#cover'),
track = document.querySelector('#track'),
bar = document.querySelector('#bar'),
playBtn = document.querySelector('#play'),
nextBtn = document.querySelector('#next'),
prevBtn = document.querySelector('#prev'),
shuffleBtn = document.querySelector('#shuffle'),
vol = document.querySelector('#vol'),
volSlider = document.querySelector('#vol-slider')


/********************************************** */
//          Variables and constants
/********************************************** */
/** all files you only have to change the extension using js **/
const orgMedia = [
  'August Diaries',
  'Conkarah',
  'Blood In The Water',
  'Baila',
  'Devil Inside Me',
  'Gypsy Waltz',
  'Love Not War',
  'Around The World',
  'You Do Not Need To Ask',
  'No Regrets',
  'Reflection',
  'Run Free',
  'Se Te Nota',
  'Triplo Max',
  'Such A Whore',
  'TKN',
]

let media = [...orgMedia]

let index = 0,
  isPlaying = false,
  isShuffle  = false,
  isMuted = false,
  currentVolume = volSlider.value

  /********************************************** */
//          Functions
/********************************************** */

function playPause() {
  updateVolume()
  if (isPlaying) {
    audio.pause()
    isPlaying = false
    document.body.style.animationPlayState = 'paused'
    playBtn.classList.replace('bi-pause-circle', 'bi-play-circle')
    cover.style.animationPlayState = 'paused'
  } else {
    audio.play()
    isPlaying = true
    document.body.style.animationPlayState = 'running'
    playBtn.classList.replace('bi-play-circle', 'bi-pause-circle')
    cover.style.animationPlayState = 'running'
  }
}

function nextSong() {
  isPlaying = false
  if (index === media.length - 1) {
    index = 0
  } else {
    index++
  }
  audio.src = `./songs/${media[index]}.mp3`
  cover.src = `./covers/${media[index]}.jpg`
  track.innerHTML = media[index]
  playPause()
}
function prevSong() {
  isPlaying = false
  if (index === 0) {
    index = media.length - 1
  } else {
    index--
  }
  audio.src = `./songs/${media[index]}.mp3`
  cover.src = `./covers/${media[index]}.jpg`
  track.innerHTML = media[index]
  playPause()
}

function shuffleSong() {
  playPause()
  let temp = []
  while(temp.length <= orgMedia.length){
    let ind = Math.floor(Math.random() * orgMedia.length)
      temp.push(orgMedia[ind])
  }
  
  media = isShuffle ? [...orgMedia] : temp
  isShuffle = !isShuffle
  shuffleBtn.style.color = isShuffle ? '#f5b041' : '#7e8c96'

  if (index === 0) {
    index = media.length - 1
  } else {
    index--
  }
  audio.src = `./songs/${media[index]}.mp3`
  cover.src = `./covers/${media[index]}.jpg`
  track.innerHTML = media[index]
  playPause()
}

function updateTime(e) {
  audio.currentTime = (audio.duration * e.target.value) / 100
}

function showVolPanel(e){
  volSlider.style.display = 'block'
}
function hideVolPanel(e){
  setTimeout(() => {
    volSlider.style.display = 'none'
  }, 1000);
}

function updateVolume(e) {
  audio.volume = volSlider.value/100
}

function muteUnmute(e){
  if(!isMuted){
    currentVolume = volSlider.value
    audio.volume = 0
    vol.classList.replace('bi-volume-up','bi-volume-mute')
    volSlider.value = 0
  }else{
    audio.volume = currentVolume/100
    volSlider.value = currentVolume
    vol.classList.replace('bi-volume-mute','bi-volume-up')
  
  }
  isMuted = !isMuted
}

/** to keep updating the progressBar every second (1000ms) */
setInterval(() => {
  bar.value = (100 * audio.currentTime) / audio.duration
}, 1000)

/********************************************** */
//          Event Listeners
/********************************************** */
playBtn.addEventListener('click', playPause)
nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)
shuffleBtn.addEventListener('click', shuffleSong)
audio.addEventListener('ended', nextSong)
bar.addEventListener('click', updateTime)
vol.addEventListener('mouseenter',showVolPanel)
volSlider.addEventListener('mouseleave',hideVolPanel)
vol.addEventListener('click',muteUnmute)
volSlider.addEventListener('click',updateVolume)
