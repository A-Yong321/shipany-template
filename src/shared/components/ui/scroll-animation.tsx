"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  stagger?: boolean;
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px", // Optimization: trigger animation earlier for better perceived performance
  });

  // Respect user's reduced motion preference (accessibility)
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, we still render motion.div to keep tree consistent (prevent hydration mismatch),
  // but we force the "visible" state immediately or use zero-duration transitions.
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { x: 30, y: 0 };
      case "right":
        return { x: -30, y: 0 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
       // if reduced motion, don't move
      ...(shouldReduceMotion ? { x: 0, y: 0 } : getInitialPosition()),
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        // If reduced motion, we can just default to visible, but framer motion handles "animate" updates well.
        // To be safe and instant, we can rely on duration: 0.
        animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
        className={className}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...(shouldReduceMotion ? { x: 0, y: 0 } : getInitialPosition()),
        filter: "blur(4px)",
      }}
      animate={
        // Force visible if shouldReduceMotion
        isInView || shouldReduceMotion
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              ...getInitialPosition(),
              filter: "blur(4px)",
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
