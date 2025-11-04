import anime from 'animejs';

export const animateCounter = (element: HTMLElement, targetValue: number) => {
  const obj = { value: 0 };
  return anime({
    targets: obj,
    value: targetValue,
    duration: 1500,
    easing: 'easeOutExpo',
    round: 1,
    update: () => {
      element.textContent = obj.value.toString();
    },
  });
};
