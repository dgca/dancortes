---
title: Carousels pt. - Building a JS carousel from the ground up
excerpt: In this post, we'll go through the process of creating an image carousel from the ground up using HTML, CSS, and Javascript.
---

I recently [built a website](http://www.kevinhsia.com/) for my friend Kevin to promote his skills, one of them being photography. He asked for an image carousel to show off some of his photos—so, instead of picking up one of the thousands of existing image carousel libraries, I decided to roll my own. You know, for kicks.

Check the carousel in action [right here](http://www.kevinhsia.com/photo/).

Since my [last post about carousels](/web-design/2015/05/17/how-to-make-carousel-only-html-css-no-javascript.html) got lot of attention, I decided to write this post you now find yourself reading.

I wanted to keep the markup dead simple because, when I was starting out with web dev, I actually found a lot of the carousel libraries out there to be overly complicated, some with really weird markup requirements. So, after some thought, I came up with the following structure for the markup:

```html
<div id="fancy-carousel">
  <img src="./images/01.jpg" alt="Alt text goes here :-)" />
  <img src="./images/02.jpg" alt="Alt text goes here :-o" />
  <img src="./images/03.jpg" alt="Alt text goes here ;-p" />
</div>
```

So, basically, I have a `div` with the `id` _fancy-carousel_, I put images in it, and the JavaScript does all the work for me. No data attributes or complicated markup structure. After everything is put together, it looks something like this:

```dangerouslySetInnerHTML
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="dgca" data-slug-hash="zqZqpN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Fancy Carousel">
  <span>See the Pen <a href="https://codepen.io/dgca/pen/zqZqpN">
  Fancy Carousel</a> by Daniel Cortes (<a href="https://codepen.io/dgca">@dgca</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
```

<br />

So what’s happening is the JS finds our `div#fancy-carousel`, creates two new `div`s, each stacked on top of each other, and uses the top (as in z-order) one to house the controls—the previous and next arrows.

The `div` underneath (let’s call it the ‘display `div`’) is responsible for displaying the current image. I created an array out of the image sources, which is then applied as the display `div`’s background image. When the next arrow is clicked, the next image source in the array is set as the display `div`’s background. Clicking the previous arrow sets the background image to the previous item in the array.

One thing I wanna point out is that a _fancy-carousel–active_ class is being added to the main carousel wrapper, and a _hide_ class is being added to the `img` elements as they go through the `for` loop that creates the array of image sources. This is so we can conditionally style the carousel if the JS runs. If you open up the Codepen example on the Codepen site and delete all the JS code, you’ll see that the images render how they would normally render on the page.

So here’s the final JS code, with comments to explain what’s going on.

```js
var fancyCarousel = document.getElementById("fancy-carousel");
if (fancyCarousel && fancyCarousel.hasChildNodes()) {
  // Create the divs that we'll be adding to the DOM to create our markup structure
  // imagesWrapper will display the image via its backgroundImage CSS property
  // controlsWrapper will contain the previous and next arrows
  var imagesWrapper = document.createElement("div");
  var controlsWrapper = document.createElement("div");
  var prevArrow = document.createElement("div");
  var nextArrow = document.createElement("div");
  // Add classes to our markup so we can style it later
  fancyCarousel.classList.add("fancy-carousel--active");
  imagesWrapper.classList.add("fancy-carousel__images-wrapper");
  controlsWrapper.classList.add("fancy-carousel__controls-wrapper");
  prevArrow.classList.add("fancy-carousel__prev-arrow");
  nextArrow.classList.add("fancy-carousel__next-arrow");
  // Add the previous and next arrow divs to the controlsWrapper
  controlsWrapper.appendChild(prevArrow);
  controlsWrapper.appendChild(nextArrow);
  // Add the imagesWrapper and controlsWrapper to the carousel wrapper
  fancyCarousel.appendChild(imagesWrapper);
  fancyCarousel.appendChild(controlsWrapper);

  // Create an array out of the source attribute of any images in the carousel
  // Add a 'hide' class to the image as they're being iterated on
  var childNodes = fancyCarousel.childNodes;
  var imagesArray = [];
  for (var i = 0; i < childNodes.length; i++) {
    var currentNode = childNodes[i];
    if (currentNode.nodeName === "IMG") {
      imagesArray.push(currentNode.src);
      currentNode.classList.add("hide");
    }
  }

  // Set the imagesWrapper's background image to the first image in the imagesArray
  imagesWrapper.style.backgroundImage = `url(${imagesArray[0]})`;

  // Here we begin setting up the logic for transitioning between images
  // First step, set up some variables for the current image index,
  // and the number of images in the images array
  var currentImage = 0;
  var numberOfImages = imagesArray.length;

  // Set up event listeners to call the handleSlideshowArrow() function
  // when the arrows are clicked
  prevArrow.addEventListener("click", function () {
    handleSlideshowArrow("prev");
  });
  nextArrow.addEventListener("click", function () {
    handleSlideshowArrow("next");
  });

  // Let's use those currentImage and numberOfImages variables from up there
  // If 'prev' arrow is clicked, decrease currentImage by one,
  // else if 'next' arrow is clicked increase currentImage by one
  // ...plus some extra logic so that we don't go into the negatives
  // or get to an index that doesn't exist
  function handleSlideshowArrow(val) {
    if (val === "prev") {
      if (currentImage > 0) {
        currentImage--;
      } else {
        currentImage = numberOfImages - 1;
      }
    } else if (val === "next") {
      if (currentImage < numberOfImages - 1) {
        currentImage++;
      } else {
        currentImage = 0;
      }
    }
    // Alright, so we're not actually going to be going to the next image
    // in this function, but we're going to add a 'fade-out' class to our
    // imagesWrapper so that we can have a nice fade transition from item
    // to item
    imagesWrapper.classList.add("fade-out");
    // And we're going to add an event listener that's going to do the
    // transitioning as soon as the fade out transition ends, so let's go
    // into that function below
    imagesWrapper.addEventListener("transitionend", handleTransitionEnd);
  }

  function handleTransitionEnd() {
    // So since our fade out transition has ended, we can remove the event listener
    imagesWrapper.removeEventListener("transitionend", handleTransitionEnd);
    // We set the background image to the current image in the imagesArray
    imagesWrapper.style.backgroundImage =
      "url(" + imagesArray[currentImage] + ")";
    // And we remove the fade-out class, which is gonna make our image fade back in
    imagesWrapper.classList.remove("fade-out");
  }
}
// And there we go, that's it for the JS
// Next up, the SCSS
```

```scss
// Since we're going to be stacking divs on top of each other, we have
// to make the main wrapper position relative
.fancy-carousel--active {
  background-color: #49708a;
  height: 300px;
  overflow: hidden;
  position: relative;

  // And those images that we added a 'hide' class to—well, we're not gonna
  // totally hide them with 'display: none' or 'visibility: hidden', because
  // we still want screen readers to know about them
  .hide {
    left: 100%;
    position: absolute;
    top: 100%;
  }
}

// Stack the images and controls wrapper, and make
// them the same size as the main container
.fancy-carousel__images-wrapper,
.fancy-carousel__controls-wrapper {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

// Let's center those images in the images wrapper,
// and set our fade out transition which is what the
// event handler listens to so that it switches out
// the images when the image is fully transparent
.fancy-carousel__images-wrapper {
  background-position: 50% 50%;
  background-size: cover;
  opacity: 1;
  transition: opacity 0.25s;

  &.fade-out {
    opacity: 0;
  }
}

// Here we set up the base styles of the previous and next arrows
.fancy-carousel__prev-arrow,
.fancy-carousel__next-arrow {
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
  height: 30px;
  opacity: 0.35;
  position: absolute;
  top: 50%;
  transition: opacity 0.25s;
  transform: translateY(-50%);
  width: 30px;

  &:hover {
    opacity: 0.55;
  }

  // And we make the arrows themselves out of pseudoelements
  &::before {
    border-bottom: 3px solid white;
    border-left: 3px solid white;
    content: "";
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 10px;
  }
}

// Position the arrows
.fancy-carousel__prev-arrow {
  left: 5px;

  &::before {
    transform: translateY(-50%) translateX(-30%) rotate(45deg);
  }
}

.fancy-carousel__next-arrow {
  right: 5px;

  &::before {
    transform: translateY(-50%) translateX(-60%) rotate(225deg);
  }
}
// And that's it!
```

So yeah, there you go. HTML, SCSS, and vanilla JS carousel! I’m pretty happy with how this turned out. It works super well on mobile as well as desktop, gracefully degrades if someone doesn’t have JS turned on for whatever reason, and is super easy to integrate.

That said, there are three things I want to do to improve this. For one, we don’t need to load all the images right away. Ideally, the images would load as they’re needed. Secondly, I would like to add swipe support so that you don’t have to tap the arrows on touchscreens. Finally, I’d like to make the whole thing class-based instead of ID based. As is, this wouldn’t work if you needed more than one carousel on screen at a time.

Well, that’s it for this post! If you read this far, thanks for sticking with this and I hope you learned something from this write-up.
