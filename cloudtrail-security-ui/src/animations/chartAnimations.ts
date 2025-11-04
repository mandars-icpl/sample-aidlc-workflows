import anime from 'animejs';

export const animateChart = (target: string | HTMLElement) => {
  return anime({
    targets: target,
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 800,
    easing: 'easeOutCubic',
  });
};
