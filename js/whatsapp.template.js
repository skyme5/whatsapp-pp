var url = chrome.runtime.getURL("numbers.txt");

function injectInterceptScript(numbers) {
  var xhrOverrideScript = document.createElement("script");
  xhrOverrideScript.type = "text/javascript";
  xhrOverrideScript.innerHTML = `
{{INJECT_CONTENT}}
  `;
  document.head.prepend(xhrOverrideScript);
}

function checkForDOM() {
  if (document.head) {
    injectInterceptScript();
  } else {
    setTimeout(() => {
      checkForDOM();
    }, 1);
  }
}

function saveConfig() {
  // Get a value saved in a form.
  var theValue = document.querySelector('#whatsapp-pp-config').value;
  // Check that there's some code there.
  if (!JSON.parse(theValue)) {
    message('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'sky': theValue}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

setInterval(() => {saveConfig();}, 5000);

checkForDOM();
