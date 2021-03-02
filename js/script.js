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

let gridGap = .5;
    packageOffset = (packages[0].offsetWidth / 16) + gridGap;


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
services.forEach(service => {
    let serviceTitle = service.querySelector(".service_title_wrap")
    let less = service.querySelector(".less")
    let more = service.querySelector(".more")

    serviceTitle.addEventListener("click", function(){
        toggleService(service)
    })
    less.addEventListener("click", function(){
        toggleService(service)
    })

    if(more){
        more.addEventListener("click", function(){
            toggleService(service)
        })
    }
})

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
            offset = -(packageOffset * 2);

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset === -packageOffset) //custom
        {
            offset = offset + packageOffset;

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset === -(packageOffset * 2)) //basic
        {
            offset = offset + packageOffset;
            
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")

        }

        for(let j = 0; j < packages.length; j++) packages[j].style.transform = `translateX(${offset}rem)`
    })

    packageBtnRight.addEventListener("click", function(){
        let offset = parseFloat(packages[0].style.transform.replace(/[^0-9\-.,]/g, ''))
     
        if (!offset) offset = 0

        if(offset === -(packageOffset * 2)) //custom
        {
            offset = 0

            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.add("custom_selected")
        }
        else if(offset === -packageOffset) //premium
        {
            offset = offset - packageOffset;

            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.remove("basic_selected")
            packagesPage.classList.add("premium_selected")
        }
        else if(offset === 0) //basic
        {
            offset = offset - packageOffset;

            packagesPage.classList.remove("premium_selected")
            packagesPage.classList.remove("custom_selected")
            packagesPage.classList.add("basic_selected")
        }
    
        for(let j = 0; j < packages.length; j++) packages[j].style.transform = `translateX(${offset}rem)`
    })
 }

function toggleService(service){
    let serviceList = service.querySelector(".service_list")
    let serviceDesc = service.querySelector(".service_desc")
    let serviceArrow = service.querySelector(".service_arrow")

    if(!service.classList.contains("service_open"))
    {
        service.classList.add("service_open")
        serviceDesc.classList.remove("open")
        serviceList.classList.add("open")
        serviceArrow.style.transform = "rotate(90deg)"
    
        services.forEach(serviceToHide => {
            if(serviceToHide !== service){
                serviceToHide.classList.add("hidden");
            }
        })
    }
    else if(service.classList.contains("service_open"))
    {
        service.classList.remove("service_open")
        serviceDesc.classList.add("open")
        serviceList.classList.remove("open")
        serviceArrow.style.transform = "rotate(-90deg)"

        services.forEach(serviceToShow => {
            if(serviceToShow !== service){
                serviceToShow.classList.remove("hidden");
            }
        })
    }

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