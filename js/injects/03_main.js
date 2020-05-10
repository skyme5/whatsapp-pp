var syncInput = document.createElement("input");
syncInput.id = "web-pp-sync";
document.body.appendChild(syncInput);

function formatDate() {
  return new Date().toJSON().replace(/:/g, "-").split(".")[0];
}

function getURLOfMD5(wPPUrl) {
  var imgUrl = new URL(decodeURIComponent(wPPUrl));
  var imgPath = new URL(imgUrl.searchParams.get("e")).pathname.split("/").pop();

  if (imgPath == null) {
    alert("Update WhatsApp Profile Picture ?");
  }

  return { hash: md5(imgPath), str: imgPath };
}

function download(name, src, index = 10) {
  setTimeout(
    function () {
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

    var number = img.src.split("&u=").pop().split("%40")[0];
    if (number !== null) {
      var md5 = getURLOfMD5(img.src);
      if (!saved.l.includes(md5.hash)) {
        console.log(md5);
        putStorage(md5.hash);
        download(number, img.src, index);
      }
    }
  });
}

setInterval(function () {
  document.querySelectorAll("canvas.done").forEach((e) => e.remove());
  get_images();
}, 500);
