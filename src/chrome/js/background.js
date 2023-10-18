function getVideoContainer() {
  const videoContainer = Array.from(
    document.getElementsByClassName("html5-video-container"),
  );
  return videoContainer.length > 0 ? videoContainer[0] : null;
}

function getVideoWrapper() {
  return getVideoContainer() ? getVideoContainer().parentNode : null;
}

function getVideoPlayer() {
  return getVideoContainer() ? getVideoContainer().firstChild : null;
}

function isAdShowing() {
  const wrapper = getVideoWrapper();
  const skipButton = getSkipButton();

  if (wrapper !== null) {
    return wrapper !== undefined && (String(wrapper.className).includes("ad-showing") || skipButton !== null);
  } else {
    return null;
  }
}

function getSkipButton() {
  const skipAdButton = Array.from(
    document.getElementsByClassName("ytp-ad-skip-button ytp-button"),
  );
  return skipAdButton.length > 0 ? skipAdButton[0] : null;
}

function waitForPlayer() {
  if (getVideoPlayer()) {
    hookVideoPlayer();
  } else {
    setTimeout(() => {
      waitForPlayer();
    }, 200);
  }
}

function hookVideoPlayer() {
  const videoPlayer = getVideoPlayer();
  videoPlayer.addEventListener("timeupdate", () => {
    getSkipButton()?.click();
  });

  setInterval(function() {
    if (isAdShowing() && isFinite(videoPlayer.duration)) {
      videoPlayer.pause();
      videoPlayer.currentTime = videoPlayer.duration - 1;
      videoPlayer.play();
      getSkipButton()?.click();
    }
  }, 1000);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    String(tab.url).indexOf("https://www.youtube.com/watch") == 0
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: waitForPlayer,
    });
  }
});
