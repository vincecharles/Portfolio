import React, { useRef, useState, useEffect } from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ children, itemWidth = 400 }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.carousel} style={{ maxWidth: itemWidth }}>
      <div className={styles.carouselContainer} ref={containerRef}>
        {React.Children.map(children, (child, idx) => (
          <div className={styles.carouselItem} key={idx}>
            {child}
          </div>
        ))}
      </div>
      {totalItems > 1 && (
        <>          <button 
            className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
          >
            &#8592;
          </button>
          <button 
            className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} 
            onClick={handleNext}
            disabled={currentIndex === totalItems - 1}
            style={{ opacity: currentIndex === totalItems - 1 ? 0.5 : 1 }}
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
}
