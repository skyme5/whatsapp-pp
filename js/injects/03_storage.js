const STORAGE = "sky";

if (localStorage.getItem(STORAGE) === null) {
  localStorage.setItem(
    STORAGE,
    JSON.stringify({ cellToMD5: {}, downloadOnly: [], downloadAll: false })
  );
}

var syncExt = document.createElement('input');
syncExt.id = 'whatsapp-pp-config';

document.body.appendChild(syncExt);

var saved = getStorage();

function commitStorage() {
  var settings = JSON.stringify(saved);
  localStorage.setItem(STORAGE, settings);
  syncExt.value = settings;
}

function cellToMD5PutStorage(md5Cell, md5hah) {
  saved.cellToMD5[md5Cell] = md5hah;
  commitStorage();
}

function getStorage() {
  return JSON.parse(localStorage.getItem(STORAGE));
}

function exportStorage() {
  var storage = localStorage.getItem(STORAGE);

  var a = document.createElement("a");
  a.download = "WhatsApp Profile Picture_" + formatDate() + ".json";
  a.href = "data:base64," + storage;
  a.click();
}

function restoreStorage(dataStr) {
  localStorage.setItem(STORAGE, dataStr);
}

function addCellForSync(cellNumber) {
  saved.downloadOnly.push(cellNumber);
  commitStorage();
}

function syncDownloadAll(downloadAll) {
  saved.downloadAll = downloadAll;
  commitStorage();
}
