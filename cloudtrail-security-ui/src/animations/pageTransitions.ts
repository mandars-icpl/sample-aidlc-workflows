import anime from 'animejs';

export const fadeInUp = (target: string | HTMLElement) => {
  return anime({
    targets: target,
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutCubic',
  });
};

export const fadeIn = (target: string | HTMLElement) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutQuad',
  });
};
