import React, { useEffect, useRef } from "react";

const InfiniteScroll = ({ fetchMore }) => {
  const containnerRef = useRef();
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchMore();
      }
    }, options);
    observer.observe(containnerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={containnerRef}></div>;
};

export default InfiniteScroll;
