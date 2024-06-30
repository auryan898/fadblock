function play_handler() {
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, "play");
        // do something with response here, not outside the function
        // console.log(response);
    })();
}
function pause_handler() {
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, "pause");
        // do something with response here, not outside the function
        // console.log(response);
    })();
}
function end_handler() {
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, "end");
        // do something with response here, not outside the function
        // console.log(response);
    })();
}

document.getElementById("fadblock-control-play").addEventListener("click", play_handler)
document.getElementById("fadblock-control-pause").addEventListener("click", pause_handler)
document.getElementById("fadblock-control-end").addEventListener("click", end_handler)