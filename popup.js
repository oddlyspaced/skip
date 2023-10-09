let testButton = document.getElementById("testButton");

testButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: seekAd,
  });
});

function seekAd() {
  console.log("DEBUG: reaching");
  const htmlVideoContainers = Array.from(
    document.getElementsByClassName("html5-video-container")
  );
  if (htmlVideoContainers.length === 0) {
    console.log("DEBUG: No video players found!");
  } else if (htmlVideoContainers.length > 1) {
    console.log("DEBUG: Multiple video containers found!");
  } else {
    console.log("DEBUG: Found video player");
    let videoContainer = htmlVideoContainers[0].parentNode;
    let videoPlayer = htmlVideoContainers[0].firstChild;
    //  ad-created ad-showing ad-interrupting
    if (String(videoContainer.className).includes("ad-showing")) {
      console.log("DEBUG: AD is being shown, trying to skip...");
      videoPlayer.currentTime = 99999;
      // setTimeout(() => {
      //   let [tab] = chrome.tabs.query({ active: true, currentWindow: true });
      //   chrome.scripting.executeScript({
      //     target: { tabId: tab.id },
      //     function: skipAd,
      //   });
      // }, 500);
    }
  }
}

// function skipAd() {
//   console.log("DEBUG: reaching 2");
//   const htmlSkipAdButtons = Array.from(
//     document.getElementsByClassName("ytp-ad-skip-button ytp-button")
//   );
//   if (htmlSkipAdButton.length === 0) {
//     console.log("DEBUG: No skip button found!");
//   } else if (htmlVideoContainers.length > 1) {
//     console.log("DEBUG: Multiple skip buttons found!");
//   } else {
//     console.log("DEBUG: Found skip button");
//     const skipAdButton = htmlSkipAdButtons[0];
//     skipAdButton.click();
//   }
// }
