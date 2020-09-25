let pages = document.querySelectorAll(".page")
let nav = document.querySelector(".about_nav")
let about = document.querySelector(".about")
let services = document.querySelectorAll(".service")
let packages = document.querySelectorAll(".package")
let links = document.querySelectorAll(".link")

let packagesPage = document.querySelector(".packages")
let packagesList = packagesPage.querySelectorAll(".package")
let packageBtnLeft = packagesPage.querySelectorAll(".arrow-left")
let packageBtnRight = packagesPage.querySelectorAll(".arrow-right")
let packagesHeader = packagesPage.querySelector(".packages_header")
let packagesText = packagesPage.querySelector(".packages_text")

let yOffset = window.pageYOffset
let media = window.matchMedia("(max-width: 800px)")


/*
 *  PAGE LOAD FUNCTION CALLS
 */
setNavPosition(yOffset)
mediaMatched(media)

/*
 * EVENT LISTENER ASSIGNMENTS
 */

 //calls 'mediaMatched' function on change between mobile and desktop displays
media.addListener(mediaMatched)

//calls animation functions on each scroll frame
document.addEventListener("scroll", function(){
    yOffset = window.pageYOffset //read screen's current y position
    setNavPosition(yOffset)
})

//touch events for all services
services.forEach(service => expandServices(service))


if(!media.matches)
{
    for(let i = 0; i < packageBtnLeft.length; i++)
{
    packageBtnLeft[i].addEventListener("click", function(){
        let offset = parseFloat(packagesList[0].style.transform.replace(/[^0-9\-.,]/g, ''))

        if(!offset) offset = 0

        if(offset == 0) //premium
        {
            offset = -45

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset == -22.5) //custom
        {
            offset = offset + 22.5

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset == -45) //basic
        {
            offset = offset + 22.5
            
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")

        }
   
        for(let j = 0; j < packagesList.length; j++) packagesList[j].style.transform = `translateX(${offset}rem)`
    })

    packageBtnRight[i].addEventListener("click", function(){
        let offset = parseFloat(packagesList[0].style.transform.replace(/[^0-9\-.,]/g, ''))

        if (!offset) offset = 0

        if(offset == -45) //custom
        {
            offset = 0

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset == -22.5) //premium
        {
            offset = offset - 22.5

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset == 0) //basic
        {
            offset = offset - 22.5

            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")
        }
    
        for(let j = 0; j < packagesList.length; j++) packagesList[j].style.transform = `translateX(${offset}rem)`
    })
}
}


/*
 * FUNCTIONS
 */

function expandServices(service){
    let more = service.querySelector(".more")
    let less = service.querySelector(".less")
    let serviceList = service.querySelector(".service_list")
    let serviceDesc = service.querySelector(".service_desc")

    more.addEventListener("click", function(){
        service.classList.add("service_open")
        serviceList.classList.add("open")
        serviceDesc.querySelector(".service_desc_text").style.overflow = "visible"
        more.remove()

        services.forEach(service_to_be_hidden => {
            if(!service_to_be_hidden.querySelector(".service_list").classList.contains("open"))
            {
                service_to_be_hidden.querySelector(".service_title").classList.add("hidden")
                service_to_be_hidden.querySelector(".service_desc").classList.add("hidden")
            }
        })
    })

    less.addEventListener("click", function(){
        serviceDesc.appendChild(more)
        service.classList.remove("service_open")
        serviceList.classList.remove("open")
        serviceDesc.querySelector(".service_desc_text").style.overflow = "hidden"

        services.forEach(service_to_be_hidden => {
            service_to_be_hidden.querySelector(".service_title").classList.remove("hidden")
            service_to_be_hidden.querySelector(".service_desc").classList.remove("hidden")
        })
    })
}

//set nav position on screen size change
function mediaMatched(mediaQuery){
    let aboutPage = document.querySelector(".about")
    yOffset = window.pageYOffset

    if(yOffset >= aboutPage.offsetTop && !mediaQuery.matches)
    {
        nav.classList.add("fixed")
        nav.classList.remove("bottom")
    }
}

//set whether nav is fixed or absolutely positioned based on scroll position
function setNavPosition(yOffset){
    let fixed = nav.classList.contains("fixed")

    if(yOffset >= about.offsetTop && !fixed)
    {
        nav.classList.remove("bottom")
        nav.classList.add("fixed")
    }
    else if(yOffset < about.offsetTop && fixed)
    {
        nav.classList.remove("fixed")
        nav.classList.remove("bottom")
    }
}