let pages = document.querySelectorAll(".page")
let navs = document.querySelectorAll(".nav")
let services = document.querySelectorAll(".service")
let packages = document.querySelectorAll(".package")

let yOffset = window.pageYOffset
let packageOffset = 0

let mobile = false
let media = window.matchMedia("(max-width: 750px)")

document.addEventListener("scroll", function(){
    yOffset = window.pageYOffset

    setNavPosition(yOffset, pages, navs)
    if(media.matches)
        loadNav(yOffset, pages)
})

for(let i = 0; i < services.length; i++)
{
    let service = services[i]
    let plus = service.children[0].children[1]
    let serviceDescription = service.children[1]

    service.addEventListener("click", function(){
        if(media.matches)
        {
            if(!serviceDescription.classList.contains("open"))
            {
                serviceDescription.classList.add("open")
                plus.innerHTML = "x"
            }
            else
            {
                serviceDescription.classList.remove("open")
                plus.innerHTML = "+"
            }
        }
    })
}

for(let i = 0; i < packages.length; i++)
{
    let package = packages[i]

    package.addEventListener("click", function(){
        if(package.classList.contains("custom") && !package.classList.contains("selected") && media.matches)
        {
            package.classList.add("selected")
            packages[1].classList.remove("selected")
            packages[1].classList.add("package_clicked")
            packages[2].classList.add("package_clicked")
        }
        else if(package.classList.contains("basic") && !package.classList.contains("selected") && media.matches)
        {
            packages[0].classList.remove("selected")
            package.classList.add("selected")
            package.classList.remove("package_clicked")
            packages[2].classList.add("package_clicked")
        }
        else{
            packages[0].classList.remove("selected")
            packages[1].classList.remove("selected")
            packages[1].classList.remove("package_clicked")
            packages[2].classList.remove("package_clicked")
        }
    })
}

function setNavPosition(yOffset, elementList, navList){

    let element, nav
    for(let i = 0; i < elementList.length; i++)
    {
        element = elementList[i+1]
        nav = navList[i]

        if(element != null & nav != null)
        {
            let fixed = nav.classList.contains("fixed")

            if(yOffset >= element.offsetTop && yOffset < element.offsetTop + element.offsetHeight - nav.offsetHeight && !fixed)
            {
                nav.classList.remove("bottom")
                nav.classList.add("fixed")
            }
            else if(yOffset < element.offsetTop && fixed)
            {
                nav.classList.remove("fixed")
                nav.classList.remove("bottom")
            }
            else if(yOffset >= element.offsetTop + element.offsetHeight - nav.offsetHeight && fixed && media.matches)
            {
                nav.classList.remove("fixed")
                nav.classList.add("bottom")
            }
        }
    }
}

function loadNav(yOffset, pageList){
    for(let i = 1; i < pageList.length; i++)
    {
        let page = pageList[i]
        let navLoader = page.querySelector(".nav").querySelector(".nav_load-bar")

        let duration = (yOffset - page.offsetTop) / page.offsetHeight

        if(duration <= 0)
        {
            navLoader.style.width = 0
        }
        else if(duration > 0)
        {
            navLoader.style.width = `${duration * 100}%`
        }
        else
        {
            navLoader.style.width = '100%'
        }
    }
}