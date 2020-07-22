let pages = document.querySelectorAll(".page")
let navs = document.querySelectorAll(".nav")
let services = document.querySelectorAll(".service")
let packages = document.querySelectorAll(".package")

let yOffset = window.pageYOffset
let media = window.matchMedia("(max-width: 800px)")


/*
 *  PAGE LOAD FUNCTION CALLS
 */
setNavPosition(yOffset, pages, navs)
if(media.matches) loadNav(yOffset, pages)
mediaMatched(media)


/*
 * EVENT LISTENER ASSIGNMENTS
 */

 //calls 'mediaMatched' function on change between mobile and desktop displays
media.addListener(mediaMatched)

//calls animation functions on each scroll frame
document.addEventListener("scroll", function(){
    yOffset = window.pageYOffset //read screen's current y position

    setNavPosition(yOffset, pages, navs)
    // if(media.matches) loadNav(yOffset, pages)
    // else updateSelected(yOffset, pages, navs)
})

//touch events for all services (mobile only)
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

//touch events for all packages (mobile only)
for(let i = 0; i < packages.length; i++)
{
    let package = packages[i]
    let plus = package.querySelector(".package_title .package_plus")
    let packageDescription = package.querySelector(".package_desc")

    package.addEventListener("click", function(){
        if(media.matches)
        {
            if(!packageDescription.classList.contains("open"))
            {
                packageDescription.classList.add("open")
                plus.innerHTML = "x"
            }
            else{
                packageDescription.classList.remove("open")
                plus.innerHTML = "+"
            }
        }
    })
}

//set nav position on screen size change
function mediaMatched(mediaQuery){
    let aboutPage = document.querySelector(".about")
    let aboutNav = aboutPage.querySelector(".nav")
    yOffset = window.pageYOffset

    loadNav(yOffset, pages)
    for(let i = 0; i < packages.length; i++)
    {
        packages[i].classList.remove("package_clicked")
        packages[i].classList.remove("selected")
    }

    if(yOffset >= aboutPage.offsetTop && !mediaQuery.matches)
    {
        aboutNav.classList.add("fixed")
        aboutNav.classList.remove("bottom")
    }
}

//set whether nav is fixed or absolutely positioned based on scroll position
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

//if on mobile display, update load bar on each nav relative to scroll position
function loadNav(yOffset, pageList){
    for(let i = 1; i < pageList.length; i++)
    {
        let page = pageList[i]
        let navLoader = page.querySelector(".nav .nav_wrap .nav_load-bar")

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

//updates the nav's selected link based on scroll position
function updateSelected(yOffset, pageList, navList){
    for(let i = 0; i < pageList.length; i++)
    {
        let page = pageList[i+1]
        let nav = navList[i]

        if(page != null && nav != null)
        {
            if(yOffset >= page.offsetTop && yOffset < page.offsetTop + page.offsetHeight && !nav.classList.contains("selected"))
            {
                console.log("test")
                nav.classList.add("selected")
            }
            else if((yOffset > page.offsetTop + page.offsetHeight || yOffset < page.offsetTop) && nav.classList.contains("selected"))
            {
                nav.classList.remove("selected")
            }
        }
    }
}