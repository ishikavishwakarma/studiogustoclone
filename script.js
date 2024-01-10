function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
function loadrun(){
    var cir = document.querySelector("#cir")
    
    var progressStartvalue = -100;
    var progressEndvalue = 730;
    speed = .01;
    
    var progress = setInterval(() => {
        progressStartvalue++;
     
        cir.style.background = `conic-gradient(white ${progressStartvalue * .5}deg,#0f0f0f 0deg)`
        if(progressStartvalue ==  progressEndvalue){
            clearInterval(progress);
        }
    },speed);
    }
init();
loadrun();
// cursor();
var tl = gsap.timeline();
tl.to("#cir",{
    delay:5.6,
    duration:1,
    scale:0,
    ease:Expo.Inout
})
.to("#circle",{
    clipPath: "circle(100% at 50% 50%)",

},"same")
.to("#page3>#hi",{
    x:300,
    duration:2,
    scrollTrigger:{
        trigger:"#page3>#hi",
        scroller:"#main",
        start:"top 80%",
        end:"top 5%",
        scrub:2
    }})
.to("#page3>#hj",{
    x:-550,
    duration:2,
    scrollTrigger:{
        trigger:"#page3>#hi",
        scroller:"#main",
        start:"top 60%",
        end:"top 0%",
        scrub:2
    }})
 .from(".para",{
    y:-50,
    opacity:0,
    scrollTrigger:{
        trigger:".para",
        scroller:"#main",
        start:"top 90%",
        end:"top 50%",
        scrub:2
    }
 })   
 .from(".video",{
    duration:1,
   clipPath: "inset(31% 32% 36% 37%)",
   scrollTrigger:{
    trigger:".video",
    scroller:"#main",
    start:"top 90%",
    // markers:true,
    end:"top 65%",
    scrub:2,
}
 })  


