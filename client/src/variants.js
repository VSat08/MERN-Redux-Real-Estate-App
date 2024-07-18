
export const fadeIn = (direction, delay, opacity = 0, scale = 1.2) => {
  const getOffset = (dir) => {
    const offset = 40;
    switch (dir) {
      case "up":
        return { y: offset, x: 0 };
      case "down":
        return { y: -offset, x: 0 };
      case "left":
        return { y: 0, x: offset };
      case "right":
        return { y: 0, x: -offset };
      case "up-left":
        return { y: offset, x: offset };
      case "up-right":
        return { y: offset, x: -offset };
      case "down-left":
        return { y: -offset, x: offset };
      case "down-right":
        return { y: -offset, x: -offset };
      default:
        return { y: 0, x: 0 };
    }
  };

  const { y, x } = getOffset(direction);

  return {
    hidden: {
      y,
      x,
      opacity: opacity,
      scale: scale,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.15, 0.15, 0.15, 0.75],
      },
    },
  };
};

export const fadeOut = (direction, delay = 0, opacity = 0, scale = 1) => {
  const getOffset = (dir) => {
    const offset = 100;
    switch (dir) {
      case "up":
        return { y: offset, x: 0 };
      case "down":
        return { y: -offset, x: 0 };
      case "left":
        return { y: 0, x: offset };
      case "right":
        return { y: 0, x: -offset };
      case "up-left":
        return { y: offset, x: offset };
      case "up-right":
        return { y: offset, x: -offset };
      case "down-left":
        return { y: -offset, x: offset };
      case "down-right":
        return { y: -offset, x: -offset };
      default:
        return { y: 0, x: 0 };
    }
  };

  const { y, x } = getOffset(direction);

  return {
    hidden: {
      y,
      x,
      opacity: 1,
      scale: 1,
    },
    show: {
      y: 0,
      x: 0,
      opacity: opacity,
      scale: scale,
      transition: {
        type: "spring",
        duration: 1.5,
        delay: delay,
        easeOut: [0.85, 0.85, 0.95],
      },
    },
  };
};

export const fadeInSpring = (direction, delay, opacity = 0, scale = 1.2) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: opacity,
      scale: scale,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 1.3,
        delay: delay,
        ease: [0.15, 0.15, 0.15, 0.75],
      },
    },
  };
};

export const container = () => {
  return {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delayChildren: 0.2,
        staggerChildren: 0.4,
      },
    },
  };
};

export const item = (direction, scale = 0) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
      scale: scale,
    },
    show: {
      scale: 1,
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "twin",
        duration: 1.2,
        ease: [0.15, 0.15, 0.15, 0.75],
      },
    },
  };
};
