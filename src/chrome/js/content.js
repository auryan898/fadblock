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
    document.getElementsByClassName("ytp-ad-skip-button ytp-button")
  ).concat(Array.from(document.getElementsByClassName("ytp-ad-skip-button-modern ytp-button")));
  return skipAdButton.length > 0 ? skipAdButton[0] : null;
}

function fastForwardAd() {
  let videoPlayer = getVideoPlayer()
  if (videoPlayer != null && isAdShowing() && isFinite(videoPlayer.duration)) {
    videoPlayer.currentTime = videoPlayer.duration - 1.0;
    videoPlayer.pause();
    videoPlayer.play();
  }
}

function skipAnyAds() {
  fastForwardAd();
  getSkipButton()?.click();
}

function performSkip() {
  setTimeout(function () {
    skipAnyAds()
    performSkip();
  }, 2000);
}

function waitForPlayer() {
  if (getVideoContainer() != null) {
    performSkip();
  } else {
    setTimeout(waitForPlayer, 1000);
  }
}
// let buttonPlay = document.getElementById("fadblock-control-play")
// let buttonPause = document.getElementById("fadblock-control-pause")

// buttonPlay.addEventListener("click", () => {
//   getVideoPlayer()?.play()
//   console.log("hello")
// })
// buttonPause.addEventListener("click", () => {
//   getVideoPlayer()?.pause()
// })

// waitForPlayer();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let videoPlayer = getVideoPlayer()
  switch (message) {
    case "play":
      videoPlayer?.play()
      break
    case "pause":
      videoPlayer?.pause()
      break
    case "end":
      getSkipButton()?.click()
      try {
        videoPlayer.currentTime = videoPlayer.duration - 1.0;
      } catch {
        
      }
      break
    default:
  }
  return false
});
