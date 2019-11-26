chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.tabs.sendMessage(tabId, {
		message: "new-url",
		url: changeInfo.url
	})
})