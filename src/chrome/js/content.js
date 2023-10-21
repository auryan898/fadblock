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

  if (wrapper == null) {
    return null;
  } else {
    return wrapper !== undefined && (String(wrapper.className).includes("ad-showing"));
  }
}

function getSkipButton() {
  const skipAdButton = Array.from(
    document.getElementsByClassName("ytp-ad-skip-button ytp-button"),
  );
  return skipAdButton.length > 0 ? skipAdButton[0] : null;
}

function waitForPlayer() {
  setInterval(function() {
    getSkipButton()?.click();
    let videoPlayer = getVideoPlayer()
    if (!videoPlayer && isAdShowing() && isFinite(videoPlayer.duration)) {
      videoPlayer.pause();
      videoPlayer.currentTime = videoPlayer.duration - 1;
      videoPlayer.play();
      getSkipButton()?.click();
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    return true
});
