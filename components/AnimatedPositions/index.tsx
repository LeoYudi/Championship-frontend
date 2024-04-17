import React, { useState, useLayoutEffect, useEffect } from 'react';

import usePrevious from '@/contexts/usePrevious';
import calculateBoundingBoxes from '@/contexts/calculateBoundingBoxes';

const AnimatedPositions = ({ children }: any) => {
  const [boundingBox, setBoundingBox] = useState<any>({});
  const [prevBoundingBox, setPrevBoundingBox] = useState<any>({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, (child) => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInY = firstBox.top - lastBox.top;

        if (changeInY)
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = "0s";

            requestAnimationFrame(() => {
              domNode.style.transform = '';
              domNode.style.transition = "500ms";
            })
          });
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return children;
};

export { AnimatedPositions };
