import anime from 'animejs';

export const cardEntrance = (target: string | HTMLElement, delay = 0) => {
  return anime({
    targets: target,
    translateY: [20, 0],
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 500,
    delay,
    easing: 'easeOutCubic',
  });
};

export const staggerCards = (targets: string) => {
  return anime({
    targets,
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 600,
    delay: anime.stagger(100),
    easing: 'easeOutCubic',
  });
};
