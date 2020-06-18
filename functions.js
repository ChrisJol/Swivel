function animateHeaderImage({image, timing, duration}){
    let start = performance.now();

    requestAnimationFrame(function animateHeaderImage(time){
        let timeFraction = (time - start) / duration;
        let progress = timing(timeFraction)

        progress = ((progress * 1000) - 1000)
        image.style.transform = `translateX(${progress}px)`

        if(timeFraction > 1) image.classList.add("head_image_animation")
        else requestAnimationFrame(animateHeaderImage);
    })
}

function bezier(t){
    let p = (3 * Math.pow(1-t, 2) * t) + (3 * (1 - t) * Math.pow(t, 2)) + (Math.pow(t, 3))
    return p
}

function animateSwivel({swivel, duration}){
    let start = performance.now();

    requestAnimationFrame(function animateSwivel(time){
        let timeFraction = (time - start) / duration;
        
        swivel.style.opacity = timeFraction;

        if(timeFraction <= 1) requestAnimationFrame(animateSwivel);
    })
}