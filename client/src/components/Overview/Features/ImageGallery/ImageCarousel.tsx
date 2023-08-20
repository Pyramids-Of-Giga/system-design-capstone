import React, { useEffect } from 'react';

function ImageCarousel({up, toggleUp, down, toggleDown, currentStyle, img, setImg, styles, setCurrentStyle}) {
  const carousel = document.getElementById("image-carousel");
  const createPhotoList = () => {
    let photoList = [];
    // adds all photos to photoList
    styles.forEach((style) => {
      // adds all style photos if > 1
      if (style.photos.length > 1) {
        let stylePhotos = style.photos.map((photo, i) => {
          return <img
          className={currentStyle.style_id === style.style_id ? "active-img" : ""}
          src={photo.url}
          alt={`${style.name} ${i}`}
          key={`${style.style_id} ${i}`}
          onClick={(e) => {
            setImg(e.target.src);
            if (currentStyle.style_id !== style.style_id) {
              setCurrentStyle(style);
            }
          }}
          draggable="false"/>
        })
        photoList.concat(stylePhotos);
      } else {
        // adds this style's photo to photoList
        photoList.push(
          <img
          className={currentStyle.style_id === style.style_id ? "active-img" : ""}
          src={style.photos[0].url}
          alt={style.name}
          key={style.style_id}
          onClick={(e) => {
            setImg(e.target.src);
            if (currentStyle.name !== style.name) {
              setCurrentStyle(style);
            }
          }}
          draggable="false"/>
        )
      }
    })
    return photoList;
  }
  // useEffect for if next or previous is selected
  useEffect(() => {
    if (up) {
      //  translate the carousel
      console.log(parseFloat(carousel.dataset.prevPercentage));
      if (styles.length > 7 && (parseFloat(carousel.dataset.prevPercentage) - 14) > -((styles.length - 7) * 14)) {
        console.log('we got here ?');
        carousel.classList.toggle("carousel-translate-up");
        carousel.classList.toggle("carousel-translate-up");
        carousel.dataset.prevPercentage = parseFloat(carousel.dataset.prevPercentage) - 14;
      }
      // change style if it's not the first style
      if (currentStyle.style_id !== styles[0].style_id) {
        let nextStyle;
        for (let i = 1; i < styles.length; i++) {
          if (currentStyle.style_id === styles[i].style_id) {
            nextStyle = styles[i - 1];
            break;
          }
        }
        setCurrentStyle(nextStyle);
      }
      toggleUp(!up);
    } else if (down) {
      console.log(parseFloat(carousel.dataset.prevPercentage));
      if ((parseFloat(carousel.dataset.prevPercentage) + 14) < 0) {
        console.log('we got here ?');
        carousel.classList.toggle("carousel-translate-down");
        carousel.classList.toggle("carousel-translate-down");
        carousel.dataset.prevPercentage = parseFloat(carousel.dataset.prevPercentage) + 14;
      }
      if (currentStyle.style_id !== styles[styles.length - 1].style_id) {
        let nextStyle;
        for (let i = 0; i < styles.length - 1; i++) {
          if (currentStyle.style_id === styles[i].style_id) {
            nextStyle = styles[i + 1];
            break;
          }
        }
        setCurrentStyle(nextStyle);
      }
      toggleDown(!down);
    }
  }, [up, down])
  return (
    <div
    id="image-carousel"
    data-mouse-down-at="0"
    data-prev-percentage="0"
    onMouseUp={() => {
      carousel.dataset.mouseDownAt = "0";
      carousel.dataset.prevPercentage = carousel.dataset.percentage;
    }}
    onMouseDown={(e) => {
      // tracks when you've moused down in the carousel and updates position
      carousel.dataset.mouseDownAt = e.clientY
    }}
    onMouseMove={(e) => {
      if (carousel.dataset.mouseDownAt === "0") {
        return;
      }
      // tracks how far you've moved your mouse vertically from where you first moused down
      const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientY;
      // percent gives how far along the carousel you should be based on how far you've moved your mouse
      const percentage = (mouseDelta / (window.innerHeight / 2)) * (-100);
      // adjusts percentage based on previous percentage
      let nextPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;
      // ensures you don't go beyond the limits of the carousel
      // limits based on how many images you add
      nextPercentage = Math.min(nextPercentage, 0);
      if (styles.length > 7) {
        nextPercentage = Math.max(nextPercentage, -((styles.length - 7) * 14));
      } else {
        nextPercentage = 0;
      }
      // intermediate value to update prev percentage on mouse up
      carousel.dataset.percentage = nextPercentage;
      // move the carousel based on percentage
      carousel.style.transform = `translate(0, ${nextPercentage}%)`;
    }}>
      {createPhotoList()}
    </div>
  );
}

export default ImageCarousel;
