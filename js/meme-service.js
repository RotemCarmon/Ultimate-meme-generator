'use strict';

// --- GLOBALS ---
// var gMarked;
var gInitState;

var gKeywords = { 'funny': 7, 'cute': 4, 'dog': 2, 'sad': 5, 'happy': 10, 'baby': 9 }

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



// --- CONTROL PANEL ---

function setText(txt) {
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
function getFullFont() {
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

function getImgById(id) {
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
function updatePos(delta) {
    var currDragging = getLineIsDragging()
    if (!currDragging) return
    var prevPos = currDragging.pos
    var newPos = { x: prevPos.x + delta.x, y: prevPos.y + delta.y }
    currDragging.pos = newPos;
}

function setLineIsDragging(pos) {    // Change isDraggging to be saved in the line Obj
    var clickedLine = getClickedLine(pos)
    if (!clickedLine) return
    else clickedLine.isDragging = true
}
function getLineIsDragging() {
    return gMeme.lines.find(line => line.isDragging)
}
function clearIsDragging() {
    gMeme.lines.forEach(line => line.isDragging = false)
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


function getLinesArray() {
    var lines = gMeme.lines
    return lines
}
function getLineIdx(currLine) {
    var lines = getLinesArray();
    return lines.findIndex(line => line.pos === currLine.pos) // checks by pointers - is it ok?
}
function setCurrLine(line) {
    var lineIdx = getLineIdx(line)
    if (lineIdx === -1) return
    gMeme.selectedLineidx = lineIdx;
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
function setMarked(line) {
    clearMarked()
    line.isMarked = true;
    // gMarked = line;
}
function clearMarked() {
    gMeme.lines.forEach(line => line.isMarked = false)
}
function isMarked(txtPressed) {
    return txtPressed.isMarked;
}
function calcMarkSize(line) {
    var textHeight = line.size;
    var fullFont = `${line.size}px  ${line.font}`
    var textWidth = getTextWidth(line.txt, fullFont)
    var markSize = { x: line.pos.x, y: line.pos.y, width: textWidth, height: textHeight }
    return markSize;
}
function getClickedLine({ x, y }) {

    var lines = getLinesArray()
    return lines.find(line => {
        var markSize = calcMarkSize(line);

        return (x > +markSize.x
            && x < +(markSize.x + markSize.width)
            && y > +(markSize.y - markSize.height)
            && y < +markSize.y)
    })
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