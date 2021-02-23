//Отрисовка ячейек, установка обработчика клика, запись элементов в объект data
function init() {
  for (let i = 0; i < 9; i++) {
    const $cell = document.createElement('div')
    $cell.classList.add('cell')
    $cell.setAttribute('data-index', `${i}`)
    $cell.setAttribute('id', `cell${i}`)
    $cell.addEventListener('click', clickHandler, { once: true })
    $cell.onmousedown = () => false
    // $cell.addEventListener('mousedown', () => false)
    data[i] = i
    data[`cell${i}`] = $cell
    $container.append($cell)
  }
}

//Функции, вызываемые при клике на ячейку
function clickHandler(event) {
  cellClicked(event, getAnimationName())
  const { value, line } = checkVictory()
  if (value && line) {
    winLine(line)
    updateStatistics(value)
    removeEventListeners()
    renderStatistics()
  }
}

//Добавление стилей к ячейке при клике, запись данных в data
function cellClicked(event, name) {
  const $cell = event.target
  $cell.classList.add(`${name}-animation`)
  $cell.style.backgroundColor = '#87ceeb'
  if (data.counter % 2 === 0) {
    $cell.innerHTML = 'X'
    data[$cell.getAttribute('data-index')] = 'x'
    data.counter++
  }
  else {
    $cell.innerHTML = 'O'
    data[$cell.getAttribute('data-index')] = 'o'
    data.counter++
  }
}

//Проверка выигрыша
function checkVictory() {
  if (data['0'] == data['1'] && data['1'] == data['2']) {
    return { value: data['0'], line: [0, 1, 2] }
  }
  if (data['3'] == data['4'] && data['4'] == data['5']) {
    return { value: data['3'], line: [3, 4, 5] }
  }
  if (data['6'] == data['7'] && data['7'] == data['8']) {
    return { value: data['6'], line: [6, 7, 8] }
  }

  if (data['0'] == data['3'] && data['3'] == data['6']) {
    return { value: data['0'], line: [0, 3, 6] }
  }
  if (data['1'] == data['4'] && data['4'] == data['7']) {
    return { value: data['1'], line: [1, 4, 7] }
  }
  if (data['2'] == data['5'] && data['5'] == data['8']) {
    return { value: data['2'], line: [2, 5, 8] }
  }

  if (data['0'] == data['4'] && data['4'] == data['8']) {
    return { value: data['0'], line: [0, 4, 8] }
  }
  if (data['2'] == data['4'] && data['4'] == data['6']) {
    return { value: data['2'], line: [2, 4, 6] }
  }

  return false
}

//Добавление стилей к выигрышной линии
function winLine(line) {
  for (let i of line) {
    // data[`cell${i}`].classList.remove('clicked')
    // data[`cell${i}`].classList.add('win')
    data[`cell${i}`].style.backgroundColor = '#38e647'

  }
}

//Удаление обработчика клика ячеек
function removeEventListeners() {
  for (let i = 0; i < 9; i++) {
    data[`cell${i}`].removeEventListener('click', clickHandler)
  }
}

//Запуск новой игры
function startNewGame() {
  $container.innerHTML = ''
  data.counter = 0
  init()
  setColorAfterNewGame()
  watchColors(initSetColors())
}

// Отрисовка блока статистики
function renderStatistics() {
  $statistics.innerHTML = `
  <h3>Score Х: ${data.winsX}</h3>
  <h3>Score О: ${data.winsO}</h3>
  `
}

// Обновление статистики, запись данных в data
function updateStatistics(value) {
  if (value === 'x') data.winsX++
  if (value === 'o') data.winsO++
}

//Сброс статистики
function resetStatistics() {
  data.winsX = 0
  data.winsO = 0
  renderStatistics()
}

// Отрисовка блока настроек, установка белого цвета по умолчанию
function renderSettings() {
  $settings.innerHTML = `
    <form action="#" name="settings">
      <label for="animations">Animation list</label>
      <select name="animations" id="animation-list"></select>
      <label for="background-color">Background color</label>
      <input id="background-color" type="color" name="background-color" default="#fff">
      <label for="cell-color">Cell color</label>
      <input id="cell-color" type="color" name="cell-color">
    </form>
  `
  document.querySelector('#background-color').value = '#ffffff'
  document.querySelector('#cell-color').value = '#ffffff'
}

//Инициализация данных для цветовых инпутов 
function initSetColors() {
  return {
    background: {
      element: document.querySelector('#main'),
      input: document.querySelector('#background-color')
    },
    cell: {
      element: document.querySelectorAll('.cell'),
      input: document.querySelector('#cell-color')
    },
  }
}

//Установка обработчиков событий для цветовых инпутов (для коллекций и элементов)
function watchColors(obj) {
  for (let key in obj) {
    let { element, input } = obj[key]
    if (element.length) {
      obj[key].input.addEventListener('change', () => {
        element.forEach(element => {
          element.style.backgroundColor = input.value
        })
      })
    }
    else {
      obj[key].input.addEventListener('change', () => element.style.backgroundColor = input.value)
    }
  }
}

//Установка выбранных цветов после ререндеринга ячеек
function setColorAfterNewGame(obj = initSetColors()) {
  for (let key in obj) {
    let { element, input } = obj[key]
    if (element.length) {
      element.forEach(element => {
        element.style.backgroundColor = input.value
      })
    }
    else {
      element.style.backgroundColor = input.value
    }
  }
}

//Отрисовка списка анимаций
function renderAnimationList(arr) {
  let listHTML = ''
  for (let animation of arr) {
    listHTML += `<option value="${animation}">${animation}</option>`
  }
  document.querySelector('#animation-list').innerHTML = listHTML
}

//Получение выбранной анимации
function getAnimationName() {
  return document.querySelector('#animation-list').value
}