let about = document.querySelector(".about")
let services = document.querySelector(".services")
let packages = document.querySelector(".packages")

let aboutNav = document.querySelector(".about_nav")
let servicesNav = document.querySelector(".services_nav")
let packagesNav = document.querySelector(".packages_nav")

let yOffset = window.pageYOffset

console.log(about.offsetTop)
console.log(about.offsetTop + about.offsetHeight)

document.addEventListener("scroll", function(){
    yOffset = window.pageYOffset

    setNavPosition(yOffset, about, aboutNav)
    setNavPosition(yOffset, services, servicesNav)
    setNavPosition(yOffset, packages, packagesNav)
})

function setNavPosition(yOffset, element, elementNav){
    if(yOffset >= element.offsetTop && yOffset < element.offsetTop + element.offsetHeight - elementNav.offsetHeight)
    {
        elementNav.style.position = "fixed"
        elementNav.style.top = "0"
        elementNav.style.bottom = "auto"
    }
    else if(yOffset < element.offsetTop)
    {
        elementNav.style.position = "absolute"
        elementNav.style.top = "0"
        elementNav.style.bottom = "auto"
    }
    else if(yOffset >= element.offsetTop + element.offsetHeight - elementNav.offsetHeight)
    {
        elementNav.style.position = "absolute"
        elementNav.style.top = "auto"
        elementNav.style.bottom = "0"
    }
}