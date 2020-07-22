let pages = document.querySelectorAll(".page")
let navs = document.querySelectorAll(".nav")
let services = document.querySelectorAll(".service")
let packages = document.querySelectorAll(".package")
let navFull = document.querySelector(".nav_full")

let yOffset = window.pageYOffset
let media = window.matchMedia("(max-width: 800px)")


/*
 *  PAGE LOAD FUNCTION CALLS
 */
setNavPosition(yOffset, pages, navs)
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

    navFull.classList.remove("nav_expanded")
    navFull.querySelector(".nav_full_wrap").innerHTML = ""
    navFull.style.top = 0;

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
                // plus.innerHTML = "x"
            }
            else{
                packageDescription.classList.remove("open")
                // plus.innerHTML = "+"
            }
        }
    })
}

//touch events for all navs (mobile)
for(let i = 0; i < navs.length; i++)
{
    let nav = navs[i]
    nav.addEventListener("click", function(){
        expandNav(nav)
    })
}

function expandNav(nav){
    let navLinks = nav.querySelectorAll(".nav_wrap .nav_link")
    yOffset = window.pageYOffset

    if(!navFull.classList.contains("nav_expanded") && media.matches)
    {
        if(yOffset <= nav.parentElement.offsetTop)
            navFull.style.top = nav.parentElement.offsetTop + nav.offsetHeight
        else 
            navFull.style.top = yOffset + nav.offsetHeight

        navFull.classList.add("nav_expanded")
        fadeIn({ duration: 100, element: navFull})

        for(let i = 0; i < navLinks.length; i++)
        {
            let navLink = navLinks[i]
            
            if(!navLink.classList.contains("selected"))
            {
                let anchor = document.createElement("a")
                let text = document.createTextNode(navLink.innerHTML)

                anchor.classList.add("nav_link")
                anchor.appendChild(text)
                anchor.href = `#${navLink.innerHTML.toLowerCase()}`

                link = navFull.querySelector(".nav_full_wrap").appendChild(anchor)

                slideIn({ duration: 75, element: link })
            }
        }
    }
    else{
        navFull.classList.remove("nav_expanded")
        navFull.querySelector(".nav_full_wrap").innerHTML = ""
        navFull.style.top = 0;
    }
}

function slideIn({duration, element}){
    let start = performance.now()

    requestAnimationFrame(function slideIn(time){
        let progress = (time - start) / duration

        if(progress > 1) progress = 1

        element.style.marginLeft = `${progress * 2.6}rem`

        if(progress < 1) requestAnimationFrame(slideIn)
    })
}

function fadeIn({duration, element}){
    let start = performance.now()

    requestAnimationFrame(function fadeIn(time){
        let progress = (time - start) / duration

        if(progress > 1) progress = 1

        // element.style.background = `linear-gradient(0deg, rgba(242,242,242,0) 0%, rgba(242,242,242,${progress}) 50%)`
        element.style.background = `rgba(242,242,242,${progress})`

        if(progress < 1) requestAnimationFrame(fadeIn)
    })
}

//set nav position on screen size change
function mediaMatched(mediaQuery){
    let aboutPage = document.querySelector(".about")
    let aboutNav = aboutPage.querySelector(".nav")
    yOffset = window.pageYOffset

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