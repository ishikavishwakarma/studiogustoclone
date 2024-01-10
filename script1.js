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
function loadrun() {
    var cir = document.querySelector("#cir")

    var progressStartvalue = -100;
    var progressEndvalue = 730;
    speed = -500;

    var progress = setInterval(() => {
        progressStartvalue++;

        cir.style.background = `conic-gradient(white ${progressStartvalue * .5}deg,#0f0f0f 0deg)`
        if (progressStartvalue == progressEndvalue) {
            clearInterval(progress);
        }
    }, speed);
}
function text(){
    document.querySelectorAll(".reveal").forEach(function(elem){
      let spanChild1 = document.createElement("span");
      let spanChild2 = document.createElement("span");
  
      spanChild1.classList.add("child1");
      spanChild2.classList.add("child2");
  
      spanChild1.textContent = elem.textContent;
      spanChild2.textContent = elem.textContent;
  
      elem.innerHTML = "";
    elem.appendChild(spanChild1);
    elem.appendChild(spanChild2);
  
  })
  }
  function textanim(){
    var reveal = document.querySelector(".reveal");
    var child1 = document.querySelector(".child1");
    var child2 = document.querySelector(".child2");
    reveal.addEventListener("mouseenter",function(){
       // console.log("pahrg");
       child1.style.transform = "translateY(-100%)";
       child2.style.transform = "translateY(-100%)";
    
    })
    reveal.addEventListener("mouseleave",function(){
       // console.log("pahrg");
       child1.style.transform = "translateY(0%)";
       child2.style.transform = "translateY(0%)";
    })
    }
    function cursor(){
        document.onmousemove = e => {
            document.querySelector('pointer').style.cssText = `top: ${e.clientY}px; left: ${e.clientX}px`;
        }
    }
    function cursor1(){
        window.addEventListener("mousemove",(dets)=>{
            gsap.to("#cursor",{
                x:dets.clientX,
                y:dets.clientY,
            ease: Bounce.easeOut

            })
        })
        
    }

   
init();
cursor();
gsap.from("#nav",{
    y:-100,
    duration:1,
    delay:6.5
})  
var lastScrollTop = 0;
navbar = document.getElementById("nav");
window.addEventListener("scroll",function(){
   var scrollTop = window.pageYOffset || document
   .documentElement.scrollTop;
   if (scrollTop > lastScrollTop){
       navbar.style.top = "-10vh";
   }else{
       navbar.style.top = "0";
   }
   lastScrollTop = scrollTop; 
}) 
loadrun();
text();
cursor1();


var video = document.querySelectorAll(".video");
var tl = gsap.timeline();
tl.to("#cir", {
    delay: 5,
    duration: 1,
    scale: 0,
    ease: Expo.Inout
})
.to("#circle", {
        clipPath: "circle(100% at 50% 50%)",
}, "same")

.to("#page3>#hi", {
        x: 400,
        duration: 2,
        scrollTrigger: {
            trigger: "#page3>#hi",
            scroller: "#main",
            start: "top 70%",
            end: "top 0%",
            scrub: 2
        }
    })
.to("#page3>#hj", {
        x: -650,
        duration: 2,
        scrollTrigger: {
            trigger: "#page3>#hi",
            scroller: "#main",
            start: "top 50%",
            end: "top 0%",
            scrub: 2
        }
    })
.from(".para", {
        y: -70,
        opacity: 0,
        scrollTrigger: {
            trigger: ".para",
            scroller: "#main",
            start: "top 90%",
            end: "top 40%",
            scrub: 2
        }
    })
video.forEach(function(dets){
    gsap.from(dets, {
        duration: .5,
        clipPath: "inset(31% 32% 36% 37%)",
        scrollTrigger: {
            trigger: dets,
            scroller: "#main",
            start: "top 60%",
            // markers:true,
          end: "top 45%",
            scrub: 1,
        }
    })
})

// textanim();
var h1 = document.querySelector("#page2 h1");
var clutter = "";
 h1.textContent.split("").forEach(function(e){
    clutter += `<span>${e}</span>`;
    // console.log(clutter)
 })
h1.innerHTML = clutter;

tl.to("#page2 h1 span",{
    opacity:1,
    stagger:2,
    scrollTrigger:{
        trigger:"#page2",
        scroller:"#main",
        start:"top 75%",
        end:"top 0%",
        scrub:1,
        // markers :true, 
        // pin:true
    }
})  
    // gsap.to("#e1", {
    //  x:-100,duration:4,
    //  repeat:-1,
    // })


// tl.from("#page2>h1",{
//     opacity:0,

//     onStart:function(){
//         $('#page2>h1').textillate({
//              in: {
//                  effect: 'fadeInUp',
//                  callback:function(){
//                     $('#page2>h1').textillate('out');
//                  }
//                  },
//              out:{ effect: 'fadeOutUp'}
//             });
//     },
  
// })

  

