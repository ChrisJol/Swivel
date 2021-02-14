let nav=document.querySelector(".about_nav"),navLinks=nav.querySelector(".nav_links"),navBurger=nav.querySelector(".hamburger"),lines=navBurger.querySelectorAll(".line"),about=document.querySelector(".about"),services=document.querySelectorAll(".service"),packages=document.querySelectorAll(".package"),packagesPage=document.querySelector(".packages"),yOffset=window.pageYOffset,media=window.matchMedia("(max-width: 800px)");setNavPosition(),mediaMatched(media),media.addListener(mediaMatched),document.addEventListener("scroll",function(){yOffset=window.pageYOffset,setNavPosition(yOffset),media.matches&&closeNav()}),services.forEach(a=>expandServices(a)),packages.forEach(a=>packageButtonClicked(a)),navBurger.addEventListener("click",function(){media.matches&&(nav.classList.contains("nav_opened")?closeNav():openNav())});function openNav(){nav.classList.add("nav_opened"),navLinks.classList.add("nav-links_opened"),lines.forEach(a=>a.classList.add("lines_opened"))}function closeNav(){nav.classList.remove("nav_opened"),navLinks.classList.remove("nav-links_opened"),lines.forEach(a=>a.classList.remove("lines_opened"))}function packageButtonClicked(a){let b=a.querySelector(".arrow-left"),c=a.querySelector(".arrow-right");b.addEventListener("click",function(){let a=parseFloat(packages[0].style.transform.replace(/[^0-9\-.,]/g,""));a||(a=0),0===a?(a=-45,packagesPage.classList.remove("custom_selected"),packagesPage.classList.remove("basic_selected"),packagesPage.classList.add("premium_selected")):-22.5===a?(a+=22.5,packagesPage.classList.remove("basic_selected"),packagesPage.classList.remove("premium_selected"),packagesPage.classList.add("custom_selected")):-45==a&&(a+=22.5,packagesPage.classList.remove("premium_selected"),packagesPage.classList.remove("custom_selected"),packagesPage.classList.add("basic_selected"));for(let b=0;b<packages.length;b++)packages[b].style.transform=`translateX(${a}rem)`}),c.addEventListener("click",function(){let a=parseFloat(packages[0].style.transform.replace(/[^0-9\-.,]/g,""));a||(a=0),-45===a?(a=0,packagesPage.classList.remove("basic_selected"),packagesPage.classList.remove("premium_selected"),packagesPage.classList.add("custom_selected")):-22.5===a?(a-=22.5,packagesPage.classList.remove("custom_selected"),packagesPage.classList.remove("basic_selected"),packagesPage.classList.add("premium_selected")):0==a&&(a-=22.5,packagesPage.classList.remove("premium_selected"),packagesPage.classList.remove("custom_selected"),packagesPage.classList.add("basic_selected"));for(let b=0;b<packages.length;b++)packages[b].style.transform=`translateX(${a}rem)`})}function expandServices(a){let b=a.querySelector(".more"),c=a.querySelector(".less"),d=a.querySelector(".service_list"),e=a.querySelector(".service_desc");b.addEventListener("click",function(){a.classList.add("service_open"),d.classList.add("open"),e.querySelector(".service_desc_text").style.overflow="visible",b.remove(),services.forEach(a=>{a.querySelector(".service_list").classList.contains("open")||(a.querySelector(".service_title").classList.add("hidden"),a.querySelector(".service_desc").classList.add("hidden"))})}),c.addEventListener("click",function(){e.appendChild(b),a.classList.remove("service_open"),d.classList.remove("open"),e.querySelector(".service_desc_text").style.overflow="hidden",services.forEach(a=>{a.querySelector(".service_title").classList.remove("hidden"),a.querySelector(".service_desc").classList.remove("hidden")})})}function mediaMatched(a){let b=document.querySelector(".about");yOffset=window.pageYOffset,yOffset>=b.offsetTop&&!a.matches&&nav.classList.add("fixed")}function setNavPosition(){let a=nav.classList.contains("fixed");yOffset>=about.offsetTop&&!a?nav.classList.add("fixed"):yOffset<about.offsetTop&&a&&nav.classList.remove("fixed")}