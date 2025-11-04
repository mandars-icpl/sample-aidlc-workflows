import anime from 'animejs';

export const animateGauge = (target: string | HTMLElement, percentage: number) => {
  return anime({
    targets: target,
    strokeDashoffset: [anime.setDashoffset, percentage],
    duration: 1200,
    easing: 'easeInOutQuad',
  });
};
