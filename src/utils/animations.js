// Elegant, premium transitions for modern architecture aesthetic
export const smoothTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
export const slowTransition = { duration: 1.8, ease: [0.16, 1, 0.3, 1] };
export const springTransition = { type: "spring", damping: 20, stiffness: 100 };

// Variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition
  }
};

export const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: smoothTransition
  }
};

export const fadeUpStaggerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ...smoothTransition, duration: 1 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const textRevealContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const textRevealChild = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export const lineDrawVertical = {
  hidden: { height: 0 },
  visible: { 
    height: "100%", 
    transition: slowTransition
  }
};

export const lineDrawHorizontal = {
  hidden: { width: 0 },
  visible: { 
    width: "100%", 
    transition: slowTransition
  }
};

// Elegant image reveal
export const imageReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const blockReveal = {
  hidden: { opacity: 0, filter: "blur(5px)" },
  visible: { 
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

// Page transition
export const pageTransition = {
  hidden: { opacity: 0, filter: "blur(5px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, filter: "blur(5px)", transition: { duration: 0.6, ease: "easeIn" } }
};
