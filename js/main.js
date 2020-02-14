'use strict';

function onInit(){
    loadMemes()
}   

function loadMemes(){
        var myImgs = JSON.parse(localStorage.getItem('my-canvas'))
            
        console.log('My Images -> ',myImgs)
        var strHTMLs = ``
            myImgs.forEach(img => {
                // var myImg = document.createElement('IMG')
                strHTMLs += `<img class="saved-meme" src="${img}" />`
                // document.querySelector('#my-img').src = myImg;   
            })
            document.querySelector('.img-gallery-container').innerHTML = strHTMLs;
}