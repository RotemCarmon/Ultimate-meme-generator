var gStikers = {
  // selectedStikerIdx: 0,
  selectedStiker: null,
  stikers: [
    {
      id: 0,
      url: './stikers/1.png',
      isSelected: false
    },
    {
      id: 1,
      url: './stikers/2.png',
      isSelected: false
    },
    {
      id: 2,
      url: './stikers/3.png',
      isSelected: false
    },
    {
      id: 3,
      url: './stikers/4.png',
      isSelected: false
    },
    {
      id: 4,
      url: './stikers/5.png',
      isSelected: false
    },
    {
      id: 5,
      url: './stikers/6.png',
      isSelected: false
    },

  ],
  stikersOnCanvas: []
}

function getStickerEl() { // returns the stiker object by the selectedStikerIdx in gStikers object
  var currStiker = gStikers.selectedStiker;
  return currStiker
}

function getStikerId(stiker) {  // Gets the id from the element's dataset
  return stiker.dataset.stiker
}


// -- STICKER ON CANVAS

function getStickersOnCanvas() {
  return gStikers.stikersOnCanvas
}

function getStikerOnCanvasById(id) {
  var stickersOnCanvas = getStickersOnCanvas();
  return stickersOnCanvas.find(sticker => sticker.id === id);
}

function addStickerToCanvas(pos) {// add a new stiker to the stikersOnCanvas Array
  var renderdSticker = _createStikerOnCanvasObj(pos)
  gStikers.stikersOnCanvas.push(renderdSticker)
  return renderdSticker;
}

function updateStikerOnCanvas(pos) { // add a new stiker to the stikersOnCanvas Array
  var renderdSticker = _createStikerOnCanvasObj(pos)
  gStikers.stikersOnCanvas.push(renderdSticker);
}

function getClickedStikerIdx({ x, y }) {  // return the clicked stiker idx
  var stikerPosses = gStikers.stikersOnCanvas.map(stiker => stiker.pos) // returns an array of all stikers idx position on the canvas

  return stikerPosses.findIndex(pos => {
    return x > +pos.x
      && x < +(pos.x + 100)
      && y < +(pos.y + 100)
      && y > +pos.y
  })
}

function cleanStikersFromCanvas() {
  clearIsSelected()
  gStikers.stikersOnCanvas = [];
}

function _createStikerOnCanvasObj(pos) { // creates a new stiker position object to be added to the stikersOnCanvas array
  var sticker = getSelectedSticker() // stiker obj
  return {
    id: makeId(),
    stickerId: sticker.id,
    element: getStickerEl(),
    pos: { x: pos.x - 50, y: pos.y - 50 }
  }
}

// -- STICKERS MODEL
function getStickers() { // return stikers array
  return gStikers.stikers;
}

function getStickerById(stikerId) {
  return gStikers.stikers.find(stiker => stiker.id === stikerId)
}

function updateCurrStiker(elStiker) { // Saves the Sticker Element as the selected sticker
  gStikers.selectedStiker = elStiker; //element
  var stikerId = getStikerId(elStiker);
  updateIsSelected(stikerId)
}


// -- STICKER SELECT --
function updateIsSelected(stikerId) { // Update isSelected on stiker property to true
  clearIsSelected()
  var currStiker = getStickerById(+stikerId);
  currStiker.isSelected = true
}

function getSelectedSticker() {  // RETURN THE STIKER WITH THE PROPERTY isSelected = true
  return gStikers.stikers.find(stiker => stiker.isSelected)
}

function clearIsSelected() {
  gStikers.stikers.forEach(stiker => stiker.isSelected = false)
}
