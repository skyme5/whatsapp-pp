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

checkForDOM();
