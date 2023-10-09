let changeColor = document.getElementById("testButton");

changeColor.addEventListener("click", async () => {
  chrome.storage.sync.set({ inputtag: "div" });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setBorderColor,
  });
});

function setBorderColor() {
  chrome.storage.sync.get("inputtag", ({ inputtag }) => {
    document.querySelectorAll(inputtag).forEach((element) => {
      element.style.border = "1px solid red";
    });
  });
}
