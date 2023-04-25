const baseUrl = 'https://webdev.alphacamp.io/api/lyrics/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const navPanel = document.querySelector('.navbar-brand')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}
// 新增網頁圖片並用cover讓圖片覆蓋整個網頁畫面
document.body.style.backgroundImage = "url(https://live.staticflickr.com/65535/52828336898_7cff779349_h.jpg)"
document.body.style.backgroundSize = "cover"
//用函式打包，顯示歌曲列表 
function displaySongList() {
  const songs = album.tracks
  let navHtml = ''
  //先建立左邊欄位的歌曲列表
  songs.forEach(song => {
    navHtml += `
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="pill" href="#" role="tab">${song}</a>
      </li>
    `
  })
  songList.innerHTML = navHtml
}
//函式打包，顯示右側歌詞內容
function displayLyric(song, lyric) {
  lyricsPanel.innerHTML = `
        <h2>${song}</h2>
        <pre>${lyric}</pre>
      `
}
// 設定回首頁的設定
function returnMainPage() {
  displaySongList()
  lyricsPanel.innerHTML = ""
}
// const songs = album.tracks
// let navHtml = ''
// //先建立左邊欄位的歌曲列表
// songs.forEach(song => {
//   navHtml += `
//     <li class="nav-item">
//       <a class="nav-link" href="#" role="tab">${song}</a>
//     </li>
//   `
// })
// songList.innerHTML = navHtml

// (for of)的寫法
// for (const song of songs) {
//   navHtml += `
//     <li class="nav-item">
//       <a class="nav-link" href="#" role="tab">${song}</a>
//     </li>
//   `
// }
// 監聽點擊事件
songList.addEventListener('click', function (event) {
  const songName = event.target.textContent
  const target = event.target
  const activeItem = document.querySelector('#song-list .active')
  const url = `${baseUrl}${album.artist}/${songName}.json`
  //如果沒有用bootstrap的toggle功能，就必須手動移除目前有active的屬性 
  // if (activeItem) {
  //   activeItem.classList.remove('active')
  // }
  // 點擊到加上active class屬性，並向axios發出url請求
  if (target.matches('.nav-link')) {
    // target.classList.add('active')
    axios.get(url)
      .then(response => {
        // handle success
        // 將兩個連續出現的換行符換成一個，去除多餘的空白換行，讓歌詞閱讀更清楚
        const lyric = response.data.lyrics.replaceAll("\n\n", "\n")
        displayLyric(songName, lyric)
        // lyricsPanel.innerHTML = `
        //   <h2>${songName}</h2>
        //   <pre>${lyric}</pre>
        // `             
      })
      .catch(error => console.log(error))
  }
})
// 點擊ADELE 25回首頁功能
navPanel.addEventListener('click', function (event) {
  returnMainPage()
})
displaySongList()