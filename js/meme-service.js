'use strict';








// TODO - get rid of allPosses 
// TODO - in the line obj, calculate the size of the text and hold it in the obj
// TODO - render stikers from an img element in stade of creating a new img every time




// --- GLOBALS ---
var gMarked;
var gAllPosses;
var gInitState;

var gKeywords = { 'funny': 7, 'cute': 4, 'dog': 2, 'sad': 5, 'happy': 12, 'baby': 9 }

var gImgs = [
    {
        id: 0,
        url: './img/1.jpg',
        keywords: ['funny', 'trump', 'mad']
    },
    {
        id: 1,
        url: './img/2.jpg',
        keywords: ['cute', 'dogs', 'kiss', 'romantic', 'animal']
    },
    {
        id: 2,
        url: './img/3.jpg',
        keywords: ['cute', 'dogs', 'baby', 'sleep', 'animal']
    },
    {
        id: 3,
        url: './img/4.jpg',
        keywords: ['cute', 'cat', 'sleep', 'tired', 'animal']
    },
    {
        id: 4,
        url: './img/5.jpg',
        keywords: ['funny', 'cute', 'baby', 'strong']
    },
    {
        id: 5,
        url: './img/6.jpg',
        keywords: ['funny', 'big']
    },
    {
        id: 6,
        url: './img/7.jpg',
        keywords: ['cute', 'baby']
    },
    {
        id: 7,
        url: './img/8.jpg',
        keywords: ['funny', 'admiration', 'willy', 'wonka']
    },
    {
        id: 8,
        url: './img/9.jpg',
        keywords: ['funny', 'cute', 'baby', 'happy']
    },
    {
        id: 9,
        url: './img/10.jpg',
        keywords: ['funny', 'obama', 'barak', 'joy', 'laugh', 'happy']
    },
    {
        id: 10,
        url: './img/11.jpg',
        keywords: ['funny', 'romantic', 'gay', 'sport']
    },
    {
        id: 11,
        url: './img/12.jpg',
        keywords: ['motivating', 'blaming', 'chaim', 'hecht']
    },
    {
        id: 12,
        url: './img/13.jpg',
        keywords: ['cheers', 'greeting', 'rich', 'money']
    },
    {
        id: 13,
        url: './img/14.jpg',
        keywords: ['meaningful', 'badass', 'intense', 'morphius']
    },
    {
        id: 14,
        url: './img/15.jpg',
        keywords: ['explaining', 'talk']
    },
    {
        id: 15,
        url: './img/16.jpg',
        keywords: ['funny', 'omg', 'embarrassed']
    },
    {
        id: 16,
        url: './img/17.jpg',
        keywords: ['putin', 'two', 'putin']
    },
    {
        id: 17,
        url: './img/18.jpg',
        keywords: ['toy', 'imagine', 'scared', 'buzz']
    },

]
var gMeme = {
    selectedImgId: 0,
    selectedImg: {},

    selectedLineidx: 0,

    lines: [
        {
            txt: 'ENTER TEXT HERE',
            size: 45,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 80 },
            isMarked: false,
            isDragging: false,
        },
        {
            txt: 'ENTER TEXT HERE',
            size: 45,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 450 },
            isMarked: false,
            isDragging: false,
        },
    ],
}
var gStikers = {
    selectedStikerIdx: 0,
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




// --- CONTROL PANEL ---

function setText(txt) {
    // gMeme.lines[gMeme.selectedLineidx].txt = txt
    gMeme.lines[gMeme.selectedLineidx].txt = txt
}
function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineidx].size += diff
}
function setStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineidx].color = value;
}
function setFillColor(value) {
    gMeme.lines[gMeme.selectedLineidx].fillColor = value;
}
function setFont(value) {
    gMeme.lines[gMeme.selectedLineidx].font = value;
}
function getText() {
    return gMeme.lines[gMeme.selectedLineidx].txt.toUpperCase();
}
function getFontSize() {
    return gMeme.lines[gMeme.selectedLineidx].size;
}
function getStrokeColor() {
    return gMeme.lines[gMeme.selectedLineidx].color;
}
function getFillColor() {
    return gMeme.lines[gMeme.selectedLineidx].fillColor;
}
function getFont() {
    return gMeme.lines[gMeme.selectedLineidx].font;
}
function alignLeft() {
    gMeme.lines[gMeme.selectedLineidx].pos.x = 0
}
function getFullFont(){
    var size = getFontSize()
    var font = getFont()
    var fullFont = `${size}px  ${font}`;
    return fullFont
}
function alignCenter() {
    var fullFont = getFullFont()
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth) / 2
}
function alignRight() {
   var fullFont = getFullFont()
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth)
}
function createLine() {
    var numOfLines = gMeme.lines.length;
    var setY = 60 * numOfLines
    var newLine = {
        txt: 'ENTER TXET HERE',
        size: 35,
        align: 'left',
        color: getStrokeColor(),
        fillColor: getFillColor(),
        font: getFont(),
        pos: { x: 100, y: setY },
        isMarked: false,
        isDragging: false,
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineidx = gMeme.lines.length - 1;
}
function removeLine() {
    var line = gMeme.selectedLineidx;
    gMeme.lines.splice(line, 1)
}
function getTextPos() {
    return gMeme.lines[gMeme.selectedLineidx].pos
}

// --- IMAGE GALLERY ---

// function updateCurrImgId(id) {
//     gMeme.selectedImgId = id //
// }
function getImgById(id){
    var currImg = gImgs.find(img => img.id == id)

    return currImg
}
function updateCurrImg(id) {
    var img = getImgById(id)
    gMeme.selectedImg = img;
}
function getImageGallery() {
    return gImgs;
}

// --- MEME EDITOR ---

function getImg() {
    return gMeme.selectedImg;
}
function setIsDragging(ev) {    // Change isDraggging to be saved in the line Obj
    var clickedText = getClickedTextPos(ev)
    if (clickedText < 0) return
    else gAllPosses[clickedText].isDragging = true
}
function getIsDragging() {
    return gAllPosses.findIndex(pos => pos.isDragging === true)
}
function updatePos(delta) {
    var currDragging = getIsDragging()
    if (currDragging < 0) return
    var prevPos = gMeme.lines[currDragging].pos
    var newPos = { x: prevPos.x + delta.x, y: prevPos.y + delta.y }
    gMeme.lines[currDragging].pos = newPos;
}

// --- SEARCH ---

function searchKeyWords(value) {
    var filteredImgs = gImgs.filter((img) => {
        if (!value) return true
        else {
            return img.keywords.some(key => key.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }
    })
    return filteredImgs;
}

function setKeywords(value) {
    if (value in gKeywords) gKeywords[value] += 1
    else gKeywords[value] = 1
}

function getfrequentKeywords() {   // get only the 5 most frequently searched words

    var keywords = JSON.parse(JSON.stringify(gKeywords));
    var freqWords = [];
    while (Object.keys(freqWords).length < 5) {
        if (!Object.keys(keywords).length > 0) return freqWords;

        var currWord;
        var currNum = 0;
        for (const word in keywords) {
            if (keywords[word] > currNum) {
                currWord = word;
                currNum = keywords[word];
            }
        }

        freqWords.push({ keyword: currWord, searchCount: currNum })

        delete keywords[currWord];
    }
    return freqWords;
}

function getArrayOfKeywords() {
    var keywordsArr = [];
    for (const key in gKeywords) {
        keywordsArr.push({ keyword: key, searchCount: gKeywords[key] })
    }
    return keywordsArr;
}



// --- Utils ---


function getLineObjs() {
    var lines = gMeme.lines
    return lines
}
function setCurrLine(line) {
    if (line >= 0) {
        gMeme.selectedLineidx = line;
        return
    }
    var linesLength = gMeme.lines.length;
    if (gMeme.selectedLineidx < linesLength - 1) {
        gMeme.selectedLineidx++
    } else {
        gMeme.selectedLineidx = 0;
    }
}
function getCurrLine() {
    return gMeme.selectedLineidx;
}
function getTextWidth(text, font) {

    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
function setAllPosses() {
    var allPosses = gMeme.lines.map(line => {
        var txtPos = line.pos;
        var textHeight = line.size;
        var fullFont = `${line.size}px  ${line.font}`
        var textWidth = getTextWidth(line.txt, fullFont)

        return createPosObj(txtPos.x, txtPos.y, textWidth, textHeight)

    })
    gAllPosses = allPosses;
    return allPosses
}
function getAllPosses() {
    return gAllPosses
}
function createPosObj(x, y, width, height) {
    return {
        x,
        y,
        width,
        height,
        isDragging: false
    }
}
function setMarked(mark) {
    clearMarked()
    gMeme.lines[mark].isMarked = true;
    gMarked = mark;
}
function clearMarked() {
    gMeme.lines.forEach(line => line.isMarked = false)
}
function checkMark(txtPressed) {
    return gMeme.lines[txtPressed].isMarked;
}
function getClickedTextPos(ev) {
    var pos = touchHandler(ev)

    var allPosses = gAllPosses;

    var ex = pos.x;
    var ey = pos.y;
    var txtPressed = allPosses.findIndex(pos => {
        return ex > +pos.x
            && ex < +(pos.x + pos.width)
            && ey > +(pos.y - pos.height)
            && ey < +pos.y
    })
    return txtPressed
}



function saveInitState() {
    gInitState = JSON.parse(JSON.stringify(gMeme));
}
function setInitState() {
    gMeme = JSON.parse(JSON.stringify(gInitState));
    cleanStikersFromCanvas()


}
function saveImg() {
    if (!localStorage.getItem('my-canvas')) savedImgs = [];
    else var savedImgs = JSON.parse(localStorage.getItem('my-canvas'))

    savedImgs.push(gCanvas.toDataURL())
    var str = JSON.stringify(savedImgs)
    localStorage.setItem('my-canvas', str)
}
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }


// --- STIKERS ---

function getStikerId(stiker) {  // Gets the id from the element's dataset
    return stiker.dataset.stiker
}
function updateCurrStiker(stiker) { // Update isSelected on stiker property to true
    gStikers.selectedStiker = stiker; //element

    var stikerId = getStikerId(stiker);
    updateIsSelected(stikerId)
    updateSelectedStikerIdx(stikerId)
}
function clearIsSelected() {
    gStikers.stikers.forEach(stiker => stiker.isSelected = false)
}
function updateIsSelected(stikerId) {
    clearIsSelected()
    gStikers.stikers[stikerId].isSelected = true
}
function updateSelectedStikerIdx(idx) {
    gStikers.selectedStikerIdx = idx;
}
function getSelectedId() {  // RETURN THE STIKER WITH THE PROPERTY isSelected = true
    var selectedStiker = gStikers.stikers.find(stiker => stiker.isSelected)
    if (selectedStiker) return selectedStiker.id;

}
function updateStikerOnCanvas(ev) { // add a new stiker to the stikersOnCanvas Array
    var stikerPos = _createStikerPos(ev)
    gStikers.stikersOnCanvas.push(stikerPos)
}
function _createStikerPos(ev) { // creates a new stiker position object to be added to the stikersOnCanvas array
    var stikerId = getSelectedId();
    var stiker = getStikerById(stikerId) // stiker obj
    var pos = touchHandler(ev)
    return {
        id: stiker.id,
        element: getStiker(),
        pos: { x: pos.x - 50, y: pos.y -50 },

        isSelected: false,
    }
}
function getClickedStikerPos(ev) {  // return the clicked stiker idx
    var pressPos = touchHandler(ev)
    var stikerPosses = gStikers.stikersOnCanvas.map(stiker => stiker.pos) // returns an array of all stikers idx position on the canvas

    var ex = pressPos.x;
    var ey = pressPos.y;  // mouse pressed position

    var stikerPressedIdx = stikerPosses.findIndex(pos => {
        return ex > +pos.x
            && ex < +(pos.x + 100)
            && ey < +(pos.y + 100)
            && ey > +pos.y
    })

    return stikerPressedIdx  // returns the array idx of the pressed stiker by it's position on the canvas
}
function getStiker() { // returns the stiker object by the selectedStikerIdx in gStikers object
    var currStiker = gStikers.selectedStiker;
    return currStiker
}
function getStikers() { // return stikers array
    return gStikers.stikers;
}
function getStikersOnCanvas() {
    return gStikers.stikersOnCanvas
}
function getStikerById(id) {
    return gStikers.stikers.find(stiker => stiker.id === id)

}
function cleanStikersFromCanvas() {
    clearIsSelected()
    gStikers.selectedStikerIdx = 0;
    gStikers.stikersOnCanvas = [];
}