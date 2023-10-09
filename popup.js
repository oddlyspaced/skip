let testButton = document.getElementById("testButton");

testButton.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getVideoPlayer
  }) 
});

function getVideoPlayer() {
  console.log("reaching")
  Array.from(document.getElementsByClassName("html5-video-container")).forEach((element) => {
    let mainVideoContainer = element.parentNode;
    let videoPlayer = element.firstChild;
    console.log(mainVideoContainer.id);
    console.log(mainVideoContainer.className);
    console.log(videoPlayer.className);
    videoPlayer.play();
    videoPlayer.currentTime = 9999999;
  })
}