function panelInit() {
  var panel = document.createElement("DIV");
  panel.id = "web-pp-panel";

  var inputWrapper = document.createElement("label");
  inputWrapper.innerText = "Download All";
  var downloadAll = document.createElement("INPUT");
  downloadAll.type = "checkbox";
  downloadAll.id = "download";
  downloadAll.checked = saved.downloadAll;
  downloadAll.onclick = function() {
    syncDownloadAll(this.checked);
  };
  inputWrapper.prepend(downloadAll);

  panel.appendChild(inputWrapper);

  var addCellNumber = document.createElement("button");
  addCellNumber.innerText = "+ Cell";
  addCellNumber.onclick = function () {
    var cell = prompt("Add Number in the format: +[country code][10 digits]");
    if (/^\+\d+/.test(cell)){
      addCellForSync(cell);
    }
  };

  panel.appendChild(addCellNumber);

  var backup = document.createElement("button");
  backup.innerText = "Export";
  backup.onclick = function () {
    exportStorage();
  };

  panel.appendChild(backup);

  var restore = document.createElement("button");
  restore.innerText = "Restore";
  restore.onclick = function () {
    var data = prompt("Enter data to restore");
    if (JSON.parse(data)) {
      if (confirm("Restore this date:" + data)) {
        restoreStorage(data);
      }
    } else {
      alert("Invalid JSON data");
    }
  };

  panel.appendChild(restore);

  document.body.appendChild(panel);
}

panelInit();
