# anime.js Detailed Implementation Guide

## Installation & Setup

### Via NPM/Yarn
```bash
npm install animejs
# or
yarn add animejs
```

### ES6 Import (Recommended)
```javascript
import anime from 'animejs/lib/anime.es.js';
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
```

## Core Concepts Deep Dive

### 1. Basic Animation Structure

Every anime.js animation consists of:
- **Targets**: What to animate
- **Properties**: What changes
- **Property Parameters**: How it changes
- **Animation Parameters**: Control the animation

```javascript
anime({
  targets: '.element',        // What to animate
  translateX: 250,           // What changes
  duration: 2000,            // How long
  easing: 'easeInOutQuad',   // How it moves
  loop: true                 // Additional control
});
```

### 2. Targets in Detail

#### CSS Selectors
```javascript
// Single class
anime({ targets: '.box', translateX: 250 });

// Multiple classes
anime({ targets: '.box, .circle', translateX: 250 });

// Complex selectors
anime({ targets: 'div > .child:nth-child(odd)', translateX: 250 });

// Attribute selectors
anime({ targets: '[data-animate="true"]', translateX: 250 });
```

#### DOM Elements
```javascript
// Single element
const element = document.querySelector('.box');
anime({ targets: element, translateX: 250 });

// NodeList
const elements = document.querySelectorAll('.item');
anime({ targets: elements, translateX: 250 });

// Array of elements
const array = [element1, element2, element3];
anime({ targets: array, translateX: 250 });
```

#### JavaScript Objects
```javascript
// Custom object animation
const myObject = {
  charged: '0%',
  cycles: 0,
  score: 0
};

anime({
  targets: myObject,
  charged: '100%',
  cycles: 130,
  score: 10000,
  round: 1,
  easing: 'linear',
  update: function() {
    document.querySelector('.charge').innerHTML = myObject.charged;
    document.querySelector('.cycles').innerHTML = myObject.cycles;
    document.querySelector('.score').innerHTML = myObject.score;
  }
});
```

### 3. Properties Deep Dive

#### Transform Properties
```javascript
anime({
  targets: '.transform-demo',
  
  // Translation
  translateX: 270,           // Move horizontally
  translateY: 150,           // Move vertically
  translateZ: 100,           // Move in 3D space
  
  // Rotation
  rotate: '1turn',           // 360 degrees
  rotateX: '45deg',         // X-axis rotation
  rotateY: '45deg',         // Y-axis rotation
  rotateZ: '45deg',         // Z-axis rotation
  
  // Scale
  scale: 2,                  // Uniform scale
  scaleX: 2,                // Horizontal scale
  scaleY: 1.5,              // Vertical scale
  scaleZ: 3,                // 3D scale
  
  // Skew
  skew: '15deg',            // Uniform skew
  skewX: '15deg',           // Horizontal skew
  skewY: '10deg',           // Vertical skew
  
  duration: 3000
});
```

#### CSS Properties
```javascript
anime({
  targets: '.css-demo',
  
  // Dimensions
  width: '100%',
  height: '200px',
  maxWidth: '500px',
  
  // Spacing
  padding: '20px',
  margin: '10px 20px',
  
  // Position
  top: '50px',
  left: '100px',
  
  // Colors
  backgroundColor: '#FFF',
  color: 'rgb(255, 0, 0)',
  borderColor: 'hsl(200, 50%, 50%)',
  
  // Typography
  fontSize: '2rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  
  // Effects
  opacity: 0.5,
  filter: 'blur(5px) brightness(1.5)',
  boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
  
  // Borders
  borderRadius: '50%',
  borderWidth: '5px',
  
  duration: 2000
});
```

#### SVG Attributes
```javascript
// Circle animation
anime({
  targets: 'circle',
  cx: [50, 250],
  cy: [50, 150],
  r: [20, 80],
  fill: ['#FF0000', '#00FF00'],
  stroke: ['#000', '#FFF'],
  strokeWidth: [2, 10],
  duration: 2000
});

// Path morphing
anime({
  targets: '.morph-path',
  d: [
    { value: 'M 100 100 Q 200 50 300 100' },
    { value: 'M 100 100 Q 200 150 300 100' }
  ],
  easing: 'easeInOutQuad',
  duration: 2000,
  loop: true,
  direction: 'alternate'
});

// Line drawing
anime({
  targets: '.path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500
});
```

### 4. Property Parameters

#### From-To Values
```javascript
anime({
  targets: '.element',
  translateX: [100, 250],      // From 100 to 250
  opacity: [0, 1],              // From 0 to 1
  scale: [0.5, 1],              // From 0.5 to 1
  duration: 1000
});
```

#### Specific Property Settings
```javascript
anime({
  targets: '.element',
  translateX: {
    value: 250,
    duration: 800,
    delay: 100,
    easing: 'easeInOutQuart'
  },
  rotate: {
    value: '1turn',
    duration: 1200,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  }
});
```

#### Function-Based Values
```javascript
anime({
  targets: '.el',
  translateX: function(el, i) {
    return 50 + (i * 50);
  },
  rotate: function() {
    return anime.random(-360, 360);
  },
  duration: function() {
    return anime.random(1200, 1800);
  },
  delay: function(el, i) {
    return i * 100;
  }
});
```

### 5. Animation Parameters

#### Duration & Delay
```javascript
anime({
  targets: '.element',
  translateX: 250,
  
  duration: 3000,              // 3 seconds
  delay: 1000,                 // Start after 1 second
  endDelay: 1000,              // Wait 1 second before loop/end
  
  // Staggered delays
  delay: anime.stagger(100),   // Incremental delay
  delay: anime.stagger(100, {start: 500}), // Start after 500ms
  delay: anime.stagger(100, {from: 'center'}), // From center
  delay: anime.stagger(100, {from: 'last'}), // Reverse order
  delay: anime.stagger(100, {direction: 'reverse'}), // Reverse
  
  // Grid stagger
  delay: anime.stagger(100, {
    grid: [14, 5],
    from: 'center',
    axis: 'x'
  })
});
```

#### Easing Functions
```javascript
// Linear
anime({ targets: '.el', translateX: 250, easing: 'linear' });

// Penner functions
anime({ targets: '.el', translateX: 250, easing: 'easeInQuad' });
anime({ targets: '.el', translateX: 250, easing: 'easeOutQuad' });
anime({ targets: '.el', translateX: 250, easing: 'easeInOutQuad' });
anime({ targets: '.el', translateX: 250, easing: 'easeOutElastic' });
anime({ targets: '.el', translateX: 250, easing: 'easeOutBounce' });

// Cubic Bezier
anime({ 
  targets: '.el', 
  translateX: 250, 
  easing: 'cubicBezier(.5, .05, .1, .3)' 
});

// Spring
anime({
  targets: '.el',
  translateX: 250,
  easing: 'spring(1, 80, 10, 0)'
});

// Steps
anime({
  targets: '.el',
  translateX: 250,
  easing: 'steps(10)'
});

// Custom easing
anime({
  targets: '.el',
  translateX: 250,
  easing: function(el, i, total) {
    return function(t) {
      return Math.pow(Math.sin(t * (i + 1)), total);
    }
  }
});
```

### 6. Timeline System

#### Basic Timeline
```javascript
// Create timeline
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

// Add animations
tl
  .add({
    targets: '.el1',
    translateX: 250
  })
  .add({
    targets: '.el2',
    translateX: 250
  })
  .add({
    targets: '.el3',
    translateX: 250
  });
```

#### Timeline Offsets
```javascript
const tl = anime.timeline({
  duration: 500,
  easing: 'easeOutExpo'
});

tl
  // Absolute position
  .add({ targets: '.el1', translateX: 250 }, 0)
  
  // Relative to previous
  .add({ targets: '.el2', translateX: 250 }, '-=200')
  
  // Relative to timeline start
  .add({ targets: '.el3', translateX: 250 }, '+=500')
  
  // Absolute time
  .add({ targets: '.el4', translateX: 250 }, 1000);
```

#### Complex Timeline Example
```javascript
const masterTimeline = anime.timeline({
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutQuad'
});

masterTimeline
  // Opening sequence
  .add({
    targets: '.logo',
    scale: [0, 1],
    rotate: ['180deg', '0deg'],
    duration: 1000
  })
  // Title fade in
  .add({
    targets: '.title',
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800
  }, '-=400')
  // Subtitle
  .add({
    targets: '.subtitle',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600
  }, '-=400')
  // Buttons
  .add({
    targets: '.btn',
    scale: [0, 1],
    delay: anime.stagger(100),
    duration: 500
  }, '-=200');
```

### 7. Controls & Callbacks

#### Animation Instance
```javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  autoplay: false
});

// Control methods
animation.play();
animation.pause();
animation.restart();
animation.reverse();

// Seek methods
animation.seek(500);                    // Go to 500ms
animation.seek(animation.duration * 0.5); // Go to 50%

// Speed control
animation.timelineOffset = 500;
animation.playbackRate = 2;             // 2x speed
```

#### Callbacks
```javascript
anime({
  targets: '.element',
  translateX: 250,
  
  // Lifecycle callbacks
  begin: function(anim) {
    console.log('Animation started');
  },
  complete: function(anim) {
    console.log('Animation completed');
  },
  update: function(anim) {
    console.log('Progress:', Math.round(anim.progress) + '%');
  },
  
  // Loop callbacks
  loopBegin: function(anim) {
    console.log('Loop started');
  },
  loopComplete: function(anim) {
    console.log('Loop ended');
  },
  
  // Change callbacks
  change: function(anim) {
    console.log('Values changed');
  },
  changeBegin: function(anim) {
    console.log('Change started');
  },
  changeComplete: function(anim) {
    console.log('Change completed');
  }
});
```

#### Promise Integration
```javascript
// Async/await pattern
async function animationSequence() {
  await anime({
    targets: '.el1',
    translateX: 250,
    duration: 1000
  }).finished;
  
  await anime({
    targets: '.el2',
    translateY: 250,
    duration: 1000
  }).finished;
  
  console.log('All animations complete');
}

// Promise.all for parallel animations
Promise.all([
  anime({ targets: '.el1', translateX: 250 }).finished,
  anime({ targets: '.el2', translateY: 250 }).finished,
  anime({ targets: '.el3', scale: 2 }).finished
]).then(() => {
  console.log('All parallel animations complete');
});
```

### 8. Advanced Staggering

#### Multi-Property Stagger
```javascript
anime({
  targets: '.stagger-demo .el',
  translateX: anime.stagger(10, {from: 'center'}),
  translateY: anime.stagger(10, {from: 'center'}),
  rotate: anime.stagger([-360, 360]),
  delay: anime.stagger(200, {from: 'center'}),
  duration: 3000
});
```

#### Range Values
```javascript
anime({
  targets: '.el',
  translateX: anime.stagger([0, 300]), // Range from 0 to 300
  rotate: anime.stagger([-180, 180]),  // Range from -180 to 180
  easing: 'easeInOutQuad',
  delay: anime.stagger(100)
});
```

#### Grid Animations
```javascript
anime({
  targets: '.grid-item',
  scale: [
    {value: 0.1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {
    grid: [10, 10],
    from: 'center'
  })
});
```

### 9. Keyframes

#### Property Keyframes
```javascript
anime({
  targets: '.element',
  translateX: [
    { value: 100, duration: 500 },
    { value: 200, duration: 500, delay: 500 },
    { value: 100, duration: 500, delay: 500 }
  ],
  translateY: [
    { value: 50, duration: 500 },
    { value: -50, duration: 500, delay: 1000 },
    { value: 0, duration: 500, delay: 500 }
  ],
  rotate: [
    { value: 90, duration: 300, easing: 'easeInOutSine' },
    { value: -90, duration: 300, easing: 'easeInOutSine' },
    { value: 0, duration: 400, easing: 'easeInOutSine' }
  ]
});
```

#### Animation Keyframes
```javascript
anime({
  targets: '.element',
  keyframes: [
    {translateY: -40, scale: 1.2},
    {translateX: 250, scale: 1},
    {translateY: 40, scale: 1.2},
    {translateX: 0, scale: 1},
    {translateY: 0, scale: 1}
  ],
  duration: 4000,
  loop: true
});
```

### 10. SVG Advanced

#### Path Drawing Animation
```javascript
// Setup path
const path = document.querySelector('.path');
const pathLength = path.getTotalLength();

// Prepare path for animation
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength;

// Draw animation
anime({
  targets: '.path',
  strokeDashoffset: [pathLength, 0],
  easing: 'easeInOutQuad',
  duration: 2000,
  direction: 'alternate',
  loop: true
});
```

#### Morphing Paths
```javascript
anime({
  targets: '#morphing-demo .polymorph',
  points: [
    { value: '70 41 118.574 59.369 111.145 132.631 60.855 132.631 53.426 59.369' },
    { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 20.426 60.369' },
    { value: '70 57 136.574 54.369 89.145 100.631 28.855 100.631 38.426 54.369' },
    { value: '70 24 119.574 60.369 100.145 117.631 39.855 117.631 20.426 60.369' }
  ],
  easing: 'easeOutQuad',
  duration: 2000,
  loop: true
});
```

#### Motion Path
```javascript
const path = anime.path('.motion-path');

anime({
  targets: '.element',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 2000,
  loop: true
});
```

### 11. Real-World Examples

#### Loading Animation
```javascript
function createLoader() {
  const tl = anime.timeline({
    loop: true,
    easing: 'easeInOutQuad'
  });
  
  tl
    .add({
      targets: '.loader-dot',
      translateY: -30,
      duration: 400,
      delay: anime.stagger(100)
    })
    .add({
      targets: '.loader-dot',
      translateY: 0,
      duration: 400,
      delay: anime.stagger(100)
    });
  
  return tl;
}
```

#### Card Hover Effect
```javascript
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({
      targets: card,
      scale: 1.05,
      boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
      duration: 300,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: card.querySelector('.card-image'),
      scale: 1.1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    anime({
      targets: card,
      scale: 1,
      boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
      duration: 300,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: card.querySelector('.card-image'),
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
});
```

#### Text Animation
```javascript
// Split text into spans
function wrapLetters(selector) {
  const textWrapper = document.querySelector(selector);
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, 
    "<span class='letter'>$&</span>");
}

wrapLetters('.animated-text');

// Animate letters
anime({
  targets: '.animated-text .letter',
  opacity: [0, 1],
  translateY: [40, 0],
  translateZ: 0,
  duration: 1000,
  delay: anime.stagger(50),
  easing: 'easeOutExpo'
});
```

#### Menu Animation
```javascript
const menuTimeline = anime.timeline({
  autoplay: false,
  easing: 'easeOutQuart'
});

menuTimeline
  .add({
    targets: '.menu-overlay',
    opacity: [0, 1],
    duration: 300
  })
  .add({
    targets: '.menu-item',
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 600,
    delay: anime.stagger(100)
  }, '-=200');

// Toggle menu
document.querySelector('.menu-btn').addEventListener('click', () => {
  if (menuTimeline.reversed) {
    menuTimeline.reverse();
  } else {
    menuTimeline.play();
  }
  menuTimeline.reversed = !menuTimeline.reversed;
});
```

#### Scroll-Based Animation
```javascript
function animateOnScroll() {
  const elements = document.querySelectorAll('.scroll-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 1000,
          easing: 'easeOutQuad',
          delay: entry.target.dataset.delay || 0
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
}

animateOnScroll();
```

#### Particle System
```javascript
function createParticles() {
  const container = document.querySelector('.particles');
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    container.appendChild(particle);
  }
  
  anime({
    targets: '.particle',
    translateX: () => anime.random(-500, 500),
    translateY: () => anime.random(-500, 500),
    scale: () => anime.random(0.5, 1.5),
    opacity: [0, 1, 0],
    duration: () => anime.random(2000, 4000),
    delay: () => anime.random(0, 2000),
    loop: true,
    easing: 'easeInOutQuad'
  });
}
```

### 12. Performance Tips

#### Optimize Selectors
```javascript
// ❌ Bad - queries DOM multiple times
anime({ targets: '.element', translateX: 100 });
anime({ targets: '.element', translateY: 100 });

// ✅ Good - cache selector
const element = document.querySelector('.element');
anime({ targets: element, translateX: 100 });
anime({ targets: element, translateY: 100 });
```

#### Use Transform Instead of Position
```javascript
// ❌ Bad - triggers layout
anime({
  targets: '.element',
  left: '250px',
  top: '100px'
});

// ✅ Good - GPU accelerated
anime({
  targets: '.element',
  translateX: 250,
  translateY: 100
});
```

#### Batch Animations
```javascript
// ❌ Bad - multiple animation instances
elements.forEach(el => {
  anime({ targets: el, translateX: 250 });
});

// ✅ Good - single animation instance
anime({
  targets: elements,
  translateX: 250,
  delay: anime.stagger(100)
});
```

### 13. Helper Functions

#### anime.random()
```javascript
anime({
  targets: '.element',
  translateX: () => anime.random(-200, 200),
  translateY: () => anime.random(-200, 200),
  rotate: () => anime.random(0, 360),
  scale: () => anime.random(0.5, 2)
});
```

#### anime.get()
```javascript
// Get current values
const currentX = anime.get('.element', 'translateX');
const currentScale = anime.get('.element', 'scale');
const currentOpacity = anime.get('.element', 'opacity');
```

#### anime.set()
```javascript
// Set values instantly
anime.set('.element', {
  translateX: 100,
  scale: 0,
  opacity: 0
});
```

#### anime.remove()
```javascript
// Remove targets from running animations
anime.remove('.element');
```

### 14. Custom Animations Library

```javascript
// animations.js
export const animations = {
  fadeIn: (targets, delay = 0) => anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay,
    easing: 'easeOutQuad'
  }),
  
  slideIn: (targets, direction = 'left') => {
    const axis = ['left', 'right'].includes(direction) ? 'X' : 'Y';
    const value = ['left', 'up'].includes(direction) ? -100 : 100;
    
    return anime({
      targets,
      [`translate${axis}`]: [value, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuart'
    });
  },
  
  bounce: (targets) => anime({
    targets,
    translateY: [
      { value: -30, duration: 200 },
      { value: 0, duration: 500, elasticity: 600 }
    ],
    scaleX: [
      { value: 1.1, duration: 200 },
      { value: 1, duration: 500, elasticity: 600 }
    ],
    scaleY: [
      { value: 0.9, duration: 200 },
      { value: 1, duration: 500, elasticity: 600 }
    ]
  }),
  
  pulse: (targets) => anime({
    targets,
    scale: [1, 1.05, 1],
    duration: 1000,
    loop: true,
    easing: 'easeInOutQuad'
  }),
  
  shake: (targets) => anime({
    targets,
    translateX: [
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: 0, duration: 100 }
    ],
    easing: 'easeInOutQuad'
  })
};
```

This detailed guide provides everything you need to implement sophisticated animations with anime.js. Each section includes practical examples that can be directly used in your projects. The library's flexibility allows for everything from simple transitions to complex choreographed sequences, making it perfect for creating visually stunning and interactive websites.