const $settings = document.querySelector('#settings'),
  $statistics = document.querySelector('#statistics'),
  $container = document.querySelector('#container'),
  $btnNewGame = document.querySelector('#new-game'),
  $btnResetStatistics = document.querySelector('#reset-statistics'),
  data = {
    counter: 0,
    winsX: 0,
    winsO: 0,
  },
  animationList = ['scale', 'rotate-z', 'rotate-x', 'rotate-y']

init()
renderStatistics()
renderSettings()
watchColors(initSetColors())
renderAnimationList(animationList)

$btnNewGame.addEventListener('click', startNewGame)
$btnResetStatistics.addEventListener('click', resetStatistics)