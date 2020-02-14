'use strict';

function onInit(){
    loadMemes()
}   

function loadMemes(){
        var myImgs = JSON.parse(localStorage.getItem('my-canvas'))
            
        var strHTMLs = ``
            myImgs.forEach(img => {
                strHTMLs += `<img class="saved-meme" src="${img}" />`
            })
            document.querySelector('.img-gallery-container').innerHTML = strHTMLs;
}