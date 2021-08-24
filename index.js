/********************************************** */
//                CONTEXTS/references
/********************************************** */

const playerContainer = document.querySelector('.info')
const audio = document.querySelector('#audio')
const cover = document.querySelector('#cover')
const track = document.querySelector('#track')
const bar = document.querySelector('#bar')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const prevBtn = document.querySelector('#prev')
const shuffleBtn = document.querySelector('#shuffle')

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
  isShuffle  = false

/********************************************** */
//          Functions
/********************************************** */

function playPause() {
  if (isPlaying) {
    audio.pause()
    isPlaying = false
    playBtn.classList.replace('bi-pause-circle', 'bi-play-circle')
    cover.style.animationPlayState = 'paused'
  } else {
    audio.play()
    isPlaying = true
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
