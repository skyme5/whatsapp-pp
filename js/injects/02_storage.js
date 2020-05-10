if (localStorage.getItem("sky") === null) {
  localStorage.setItem("sky", JSON.stringify({ l: [] }));
}

var saved = getStorage();

function putStorage(md5hah) {
  saved.l.push(md5hah);
  var str = JSON.stringify(saved);
  localStorage.setItem("sky", str);
  syncInput.value = str;
}

function getStorage() {
  return JSON.parse(localStorage.getItem("sky"));
}
