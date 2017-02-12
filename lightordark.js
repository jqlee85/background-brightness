function getImageLightness(imageSrc,imgObject,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness,imgObject);
    }
}

function checkItems(imgSelector,textSelector) {

  var threshold = 127;

  // Check each item
  $(imgSelector).each(function(){
    var imgObject = $(this);
    var bg = imgObject.css('background-image');
    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");

    var lightness = getImageLightness( bg, imgObject ,function(brightness,imgObject){

        console.log(brightness);
        if (brightness < threshold) {
          console.log('Dark');
          imgObject.find(textSelector).addClass('lightordark-dark');
        } else {
          console.log('Light');
          imgObject.find(textSelector).addClass('lightordark-light');
        }
    });

  });

}

$('document').ready(function(){

  checkItems('.example','.example-text');


});
