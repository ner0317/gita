let strings = document.querySelectorAll(".strings")
let audio = document.querySelector("audio")

for (let i =0 ; i < strings.length; i++) {
	strings[i].addEventListener("click", () => {
		audio.src = `sfx/guitar-string-${i + 1}.mp3`
		audio.play()
	})
}

