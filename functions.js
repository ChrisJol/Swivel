function animateHeaderImage(imageList, index){
    if(index < imageList.length)
    {
        let image = imageList[index]

        image.classList.add("head_image_intro")
        setTimeout(function(){
            image.style.transform = 'translateX(0)'
            image.style.opacity = 1;
            image.classList.remove("head_image_intro")

            switch(image.id)
            {
                case "glasses": 
                    image.style.animationDuration = "3s"
                    break
                case "keyboard":
                    image.style.animationDuration = "4s"
                    break
                case "planner":
                    image.style.animationDuration = "3.5s"
                    break
            }

            image.classList.add("head_image_animation")
        }, 750)

        setTimeout(function(){
            animateHeaderImage(imageList, index + 1)
        }, 200)   
    }

}

function bezier(t){
    let p = (3 * Math.pow(1-t, 2) * t) + (3 * (1 - t) * Math.pow(t, 2)) + (Math.pow(t, 3))
    return p
}

function animateSwivel(swivelList, index){
    let swivel = swivelList[index]

    if(index < swivelList.length)
    {
        swivel.classList.add("swivel_intro")
        setTimeout(function(){
            swivel.classList.remove("swivel_intro")
            swivel.style.opacity = 1
            swivel.classList.add("swivel_animation")
            if(swivel.id == "s4") swivel.style.animationDirection = "reverse"
        }, 1000)

        setTimeout(function(){
            animateSwivel(swivelList, index + 1)
        }, 300)
    }
}