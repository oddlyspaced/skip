let testButton = document.getElementById("testButton");

testButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hookVideoPlayer,
  });
});

function hookVideoPlayer() {
  const videoContainer = Array.from(
    document.getElementsByClassName("html5-video-container")
  )[0];
  if (
    videoContainer !== undefined &&
    videoContainer.firstChild instanceof HTMLVideoElement
  ) {
    let videoPlayer = videoContainer.firstChild;
    console.log("DEBUG: found video player");
    videoPlayer.addEventListener("pause", () => {
      console.log("paused");
    });
    videoPlayer.addEventListener("play", () => {
      console.log("playing");
    });
    videoPlayer.addEventListener("timeupdate", () => {
      // if (videoPlayer.currentTime === videoPlayer.duration) {
        // get ready for skip ad button
        const skipAdButton = Array.from(
          document.getElementsByClassName("ytp-ad-skip-button ytp-button")
        )[0];
        if (skipAdButton !== undefined) {
          skipAdButton.click();
        }
      // }
      console.log("update: " + videoPlayer.currentTime);
    });

    const videoWrapper = videoContainer.parentNode;
    if (String(videoWrapper.className).includes("ad-showing")) {
      console.log(videoPlayer.duration);
      videoPlayer.currentTime = videoPlayer.duration - 3;
      videoPlayer.pause();
      videoPlayer.play();
    }
  } else {
    console.log("DEBUG: video player not found");
  }
}

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
