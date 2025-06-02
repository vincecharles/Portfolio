import React, { useRef } from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ children, itemWidth = 400 }) {
  const containerRef = useRef(null);
  const currentIndex = useRef(0);

  const updateCarousel = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${currentIndex.current * itemWidth}px)`;
    }
  };

  const handlePrev = () => {
    if (currentIndex.current > 0) {
      currentIndex.current--;
      updateCarousel();
    }
  };

  const handleNext = () => {
    if (currentIndex.current < React.Children.count(children) - 1) {
      currentIndex.current++;
      updateCarousel();
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer} ref={containerRef}>
        {React.Children.map(children, (child, idx) => (
          <div className={styles.carouselItem} style={{ minWidth: itemWidth }}>{child}</div>
        ))}
      </div>
      <button className={styles.carouselBtn + " " + styles.carouselBtnPrev} onClick={handlePrev}>&#8592;</button>
      <button className={styles.carouselBtn + " " + styles.carouselBtnNext} onClick={handleNext}>&#8594;</button>
    </div>
  );
}
