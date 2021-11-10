if (typeof msBrowser !== 'undefined') {
  chrome = msBrowser;
} else if (typeof browser !== 'undefined') {
  chrome = browser;
}

function xkcdIndex(url) {
  var format = /.*xkcd\.com\/([0-9]+).*/;
  var res = format.exec(url);
  if (res) return res[1];
  else return null;
}

function randomPage() {
  var max = 2539
  var index = Math.floor(Math.random() * max) + 1;
  var url = "https://xkcd.com/" + index;

  chrome.tabs.query({ active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.create({ "url": url, "index": tabs[0].index + 1 });
    }
  );
}

function explainThePage() {
  chrome.tabs.query({ active: true, currentWindow: true },
    function (tabs) {
      var tab = tabs[0];
      var url = tab.url;
      var xindex = xkcdIndex(url);
      if (xindex) {
        url = "https://explainxkcd.com/" + xindex;
        chrome.tabs.create({ "url": url, "index": tab.index + 1 });
      }
    }
  );
}

document.getElementById("rndxkcd").addEventListener("click", randomPage);
document.getElementById("explain").addEventListener("click", explainThePage);
