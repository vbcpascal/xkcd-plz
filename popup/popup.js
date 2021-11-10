const rndxkcd = document.getElementById("rndxkcd");
const explain = document.getElementById("explain");

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
  chrome.tabs.create({ "url": url });
}

function explainThePage() {
  chrome.tabs.query({ active: true, currentWindow: true },
    function (tabs) {
      var url = tabs[0].url;
      var index = xkcdIndex(url);
      if (index) {
        url = "https://explainxkcd.com/" + index;
        chrome.tabs.create({ "url": url });
      }
    }
  );
}

if (explain) {
  explain.onclick = function () {
    explainThePage();
  }
}

if (rndxkcd) {
  rndxkcd.onclick = function () {
    randomPage();
  }
}