let yOffset = window.pageYOffset + (this.window.innerHeight)

let swivelList = document.querySelectorAll(".swivels")
let imageList = document.querySelectorAll(".head_image")

let text = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o']

animateSwivel(swivelList, 0)
animateHeaderImage(imageList, 0)
animateText(text, 0)
