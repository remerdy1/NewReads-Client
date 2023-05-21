import React, {useState} from "react";
import styles from "./Carousel.module.css";

export const CarouselSlide = ({children, width}) =>{
    return(
        <div className={styles.carouselSlide} style={{width: width}}>
            {children}
        </div>
    );
}

export const Carousel = ({children}) =>{
    const [activeIndex, setActiveIndex] = useState(0);

    const childrenArray = React.Children.toArray(children);

    const updateIndex = newIndex =>{
        if(newIndex < 0){
            newIndex = 0;
        } else if(newIndex >= childrenArray.length){
            newIndex = childrenArray.length - 1;
        }

        setActiveIndex(newIndex);
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.inner} style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                {React.Children.map(children, (child, index) =>{
                    return React.cloneElement(child, {width: "100%", key: index});
                })}
            </div>

            <div className={styles.indicators}>
                {childrenArray.map((child, index) => <button key={index} className={`${styles.indicator} ${activeIndex === index ? styles.active : ""}` } onClick={() => updateIndex(index)}></button>)}
                {/*todo arrows */}
                {/* <button className="btnPrimary" onClick={() => updateIndex(activeIndex - 1)}>Prev</button>
                <button className="btnPrimary" onClick={() => updateIndex(activeIndex + 1)}>Next</button> */}
            </div>
            
        </div>
    );
}