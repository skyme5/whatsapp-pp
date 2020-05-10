function getMD5OfImageSrc(wPPUrl) {
  var imgUrl = new URL(decodeURIComponent(wPPUrl));
  var imgSrc = new URL(imgUrl.searchParams.get("e")).pathname.split("/").pop();

  if (imgSrc == null) {
    alert("Update WhatsApp Profile Picture ?");
  }

  return md5(imgSrc);
}

function download(name, src, index = 10) {
  setTimeout(() => {
      var imgI = new Image();
      imgI.setAttribute("crossOrigin", "anonymous");
      imgI.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.style.opacity = 0;
        canvas.style.position = "fixed";
        canvas.style.top = "1000px";
        canvas.width = this.width;
        canvas.height = this.height;

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);

        var ctx = canvas.getContext("2d");
        ctx.drawImage(imgI, 0, 0);

        var dataURL = canvas.toDataURL("image/jpg");
        canvas.className = "done";
        imgI = null;

        var link = document.createElement("a");
        link.download = ["+" + name, formatDate(), "WPP"].join("_");
        link.href = dataURL;
        link.click();
      };
      imgI.src = src;
    },
    100 + index * 250,
    name,
    src
  );
}

var list = [];

function get_images() {
  document.querySelectorAll("img").forEach((img, index) => {
    if (img.src.indexOf("https://web.whatsapp.com/pp?e=") < 0) return;

    var cellNumber = img.src.split("&u=").pop().split("%40")[0];

    if (cellNumber === null) return;
    if (!saved.downloadAll && !saved.downloadOnly.includes(cellNumber)) return;

    var md5Sum = getMD5OfImageSrc(img.src);
    var md5Cell = md5(cellNumber);
    console.log(md5Sum, md5Cell, saved.cellToMD5[md5Cell] !== md5Sum)
    if (saved.cellToMD5[md5Cell] !== md5Sum) {
      cellToMD5PutStorage(md5Cell, md5Sum);
      download(cellNumber, img.src, index);
    }
  });
}

setInterval(function () {
  console.info('Scanning for Profile Pic');
  document.querySelectorAll("canvas.done").forEach((e) => e.remove());
  get_images();
}, 500);
