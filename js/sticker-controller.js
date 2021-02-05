
function onCreateStikers() {  // create the img element on control panel
  var stikers = getStickers()
  var strHTMLs =
    stikers.map(stiker => {
      return `<img src="${stiker.url}" alt="" data-stiker="${stiker.id}" class="stiker pointer" onmousedown="onStikerSelect(this)" ontouchstart="onStikerSelect(this)" draggable="true">`
    }).join('');
  var elStikers = document.querySelector('.stikers');
  elStikers.innerHTML = strHTMLs;
}

function onRenderStiker(sticker) {
  var elSticker = sticker.element;
  var { x, y } = sticker.pos
  gCtx.drawImage(elSticker, x, y, 100, 100)
}

function onRenderStikers() {  // When the img is rendered this function rerenders the stikers on the canvas
  var stikersOnCanvas = getStickersOnCanvas();
  stikersOnCanvas.forEach(sticker => {
    onRenderStiker(sticker)
  })
}

function onStikerSelect(elStiker) { // When stiker is pressed on control panel
  updateCurrStiker(elStiker)
}

function dropStiker(ev) {
  var selectedStiker = getSelectedSticker()
  if (!selectedStiker) return
  var pos = getTouchPos(ev)
  var newSticker = addStickerToCanvas(pos)
  onRenderStiker(newSticker)
  clearIsSelected()
}