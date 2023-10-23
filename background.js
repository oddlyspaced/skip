function listenAndSkipAds() {
  skipAds();
  setTimeout(() => {
    listenAndSkipAds()
  }, 100);
}

function skipAds() {
  const htmlVideoContainers = Array.from(document.getElementsByClassName("html5-video-container"));
  if (htmlVideoContainers.length === 0) {
    console.log("skip: no video containers found");
  }
  else if (htmlVideoContainers.length > 1) {
    console.log("skip: multiple video containers found?")
  }
  else {
    console.log("skip: video container found")
    const htmlVideoContainer = htmlVideoContainers[0];
    const parentWrapper = htmlVideoContainer.parentNode;
    console.log("skip: " + parentWrapper);
    if (parentWrapper !== null || parentWrapper !== undefined) {
      console.log("skip: checking if ad is playing...")
         if (String(parentWrapper.className).includes("ad-showing")) {
          console.log("skip: ad is playing, trying to skip...")
          Array.from(htmlVideoContainer.children).forEach((element) => {
            if (element.tagName === "VIDEO") {
              console.log("skip: video player found")
              const videoPlayer = element;
              videoPlayer.currentTime = 99999;
              const skipAdButtons = Array.from(document.getElementsByClassName("ytp-ad-skip-button ytp-button"));
              if (skipAdButtons.length > 0) {
                skipAdButtons[0].click();
              } 
            }
          });
         }
    }
    else {
      console.log("skip: else?")
    }
  }
}

chrome.tabs?.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && String(tab.url).includes("https://www.youtube.com/watch")) {
    console.log("youtube video loaded");
    chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: listenAndSkipAds,
          }); 
  }
})