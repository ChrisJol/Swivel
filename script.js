let yOffset = window.pageYOffset + (this.window.innerHeight)
let glasses = document.querySelector("#glasses")
let keyboard = document.querySelector("#keyboard")
let planner = document.querySelector("#planner")

let swivelList = document.querySelectorAll(".swivels")

animateHeaderImage({
    image: glasses,
    timing: bezier,
    duration: 1000
})

animateHeaderImage({
    image: keyboard,
    timing: bezier,
    duration: 1200
})

animateHeaderImage({
    image: planner,
    timing: bezier,
    duration: 800
})

console.log(swivelList)
for(let i = 0; i < swivelList.length; i++){
    animateSwivel({
        swivel: swivelList[i],
        duration: 800
    })
}
