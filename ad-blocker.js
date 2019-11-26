window.addEventListener("load", main, false)

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	console.log(request)
// 	if(request.message == "new-url"){
// 		console.log("URL CHANGE")
// 	}
// })

function main(evt){
	console.log("hello")

	setTimeout(runEverything, 8000)
}

function runEverything(){

	if(adInterval != null){
		clearInterval(adInterval)
		adInterval = null
	}

	var v = $(".content-video-player")[0]

	//v.currentTime = 2

	console.log("Got video")

	var duration = $(".controls__time-duration")[0].innerHTML.split(":")

	var episodeMinLength = parseInt(duration[0])

	var episodeSecLength = parseInt(duration[1])

	while (episodeMinLength == 0){
		console.log("NOT Got video duration")
		duration = $(".controls__time-duration")[0].innerHTML.split(":")
		episodeMinLength = parseInt(duration[0])
	}

	console.log("Got video duration")

	var deductablePercentage = 0.1

	var timeJumpSeconds = 2

	var adBreaks = $(".controls__ad-break.controls__ad-break")

	var adBreakPercentages = []

	for(var i = 0; i<adBreaks.length; i++){
		if(adBreaks[i].attributes.style.textContent.startsWith("left")){
			adBreakPercentages.push((parseFloat(adBreaks[i].attributes.style.textContent.split("(")[1].split("%")[0])-deductablePercentage)/100)
		}
	}

	var adInterval = null

	var currentAd = 0

	adInterval = setInterval(()=>{

		//console.log("STARTED CHECKING")

		if(v.currentTime >= ((episodeMinLength*60)+episodeSecLength)*adBreakPercentages[currentAd]){
			console.log("AD AD")
			v.currentTime = v.currentTime+timeJumpSeconds
			currentAd++
		}

		if(currentAd >= adBreakPercentages.length){
			clearInterval(adInterval)
		}

	}, 5)

	console.log(adBreakPercentages)
	console.log(episodeSecLength, episodeMinLength)

}	
