//this does nothing

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "autofill") {
      chrome.tabs.executeScript({ file: "autoFillz.js" });
    }
  });
  