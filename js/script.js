let nav = document.querySelector(".about_nav"),
    navLinks = nav.querySelector(".nav_links"),
    navBurger = nav.querySelector(".hamburger"),
    lines = navBurger.querySelectorAll(".line"),
    about = document.querySelector(".about"),
    services = document.querySelectorAll(".service"),
    packages = document.querySelectorAll(".package"),
    packagesPage = document.querySelector(".packages"),
    yOffset = window.pageYOffset,
    media = window.matchMedia("(max-width: 800px)")


/*
 *  PAGE LOAD FUNCTION CALLS
 */
setNavPosition()
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

    if(media.matches){
        closeNav()
    }
})

//touch events for all services
services.forEach(service => expandServices(service))

//click events for all packages
packages.forEach(packageElement => packageButtonClicked(packageElement))

navBurger.addEventListener("click", function(){
    if(media.matches)
    {
        if(nav.classList.contains("nav_opened")) closeNav()
        else openNav()
    }
})

/*
 * FUNCTIONS
 */
 function openNav(){
    nav.classList.add("nav_opened")
    navLinks.classList.add("nav-links_opened")
    lines.forEach(line => line.classList.add("lines_opened"))
 }

 function closeNav(){
    nav.classList.remove("nav_opened")
    navLinks.classList.remove("nav-links_opened")
    lines.forEach(line => line.classList.remove("lines_opened"))
 }

 function packageButtonClicked(packageElement){
    let packageBtnLeft = packageElement.querySelector(".arrow-left")
    let packageBtnRight = packageElement.querySelector(".arrow-right")

    packageBtnLeft.addEventListener("click", function(){
        let offset = parseFloat(packages[0].style.transform.replace(/[^0-9\-.,]/g, ''))
     
        if (!offset) offset = 0

        if(offset === 0) //premium
        {
            offset = -45

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset === -22.5) //custom
        {
            offset = offset + 22.5

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset === -45) //basic
        {
            offset = offset + 22.5
            
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")

        }

        for(let j = 0; j < packages.length; j++) packages[j].style.transform = `translateX(${offset}rem)`
    })

    packageBtnRight.addEventListener("click", function(){
        let offset = parseFloat(packages[0].style.transform.replace(/[^0-9\-.,]/g, ''))
     
        if (!offset) offset = 0

        if(offset === -45) //custom
        {
            offset = 0

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset === -22.5) //premium
        {
            offset = offset - 22.5

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset === 0) //basic
        {
            offset = offset - 22.5

            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")
        }
    
        for(let j = 0; j < packages.length; j++) packages[j].style.transform = `translateX(${offset}rem)`
    })
 }

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
    }
}

//set whether nav is fixed or absolutely positioned based on scroll position
function setNavPosition(){
    let fixed = nav.classList.contains("fixed")

    if(yOffset >= about.offsetTop && !fixed)
    {
        nav.classList.add("fixed")
    }
    else if(yOffset < about.offsetTop && fixed)
    {
        nav.classList.remove("fixed")
    }
}