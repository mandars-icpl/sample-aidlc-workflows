# anime.js Animation Strategy

**Project**: CloudTrail Security Monitoring UI
**Created**: 2025-01-04T00:43:00Z
**Reference**: animejs-detailed-implementation-doc.md

---

## Installation & Setup

### Package Installation
```bash
npm install animejs
```

### Import Strategy
```javascript
// ES6 Import (Recommended)
import anime from 'animejs/lib/anime.es.js';
```

---

## Animation Categories

### 1. Page Transitions

#### Page Entry Animation
```javascript
// src/animations/pageTransitions.js
import anime from 'animejs/lib/anime.es.js';

export function animatePageEntry(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    easing: 'easeOutQuad'
  });
}

export function animatePageExit(element) {
  return anime({
    targets: element,
    opacity: [1, 0],
    translateY: [0, -30],
    duration: 400,
    easing: 'easeInQuad'
  }).finished;
}
```

#### Route Transition Timeline
```javascript
export function createRouteTransition(exitElement, enterElement) {
  const tl = anime.timeline({
    easing: 'easeOutExpo'
  });

  tl
    .add({
      targets: exitElement,
      opacity: [1, 0],
      translateX: [0, -50],
      duration: 300
    })
    .add({
      targets: enterElement,
      opacity: [0, 1],
      translateX: [50, 0],
      duration: 400
    }, '-=100');

  return tl;
}
```

### 2. Card & Component Animations

#### Staggered Card Entrance
```javascript
// src/animations/cardAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateCardGrid(cardElements) {
  anime({
    targets: cardElements,
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.9, 1],
    duration: 600,
    delay: anime.stagger(80, {start: 200}),
    easing: 'easeOutQuad'
  });
}

export function animateCardHover(element) {
  anime({
    targets: element,
    scale: 1.03,
    boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
    duration: 200,
    easing: 'easeOutQuad'
  });
}

export function animateCardHoverOut(element) {
  anime({
    targets: element,
    scale: 1,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    duration: 200,
    easing: 'easeOutQuad'
  });
}
```

#### Loading Pulse Animation
```javascript
export function animateCardLoading(element) {
  return anime({
    targets: element,
    opacity: [0.6, 1],
    scale: [0.98, 1],
    duration: 1200,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad'
  });
}
```

### 3. Alert & Notification Animations

#### Critical Alert Pulse
```javascript
// src/animations/alertAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateCriticalAlert(element) {
  return anime({
    targets: element,
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(211, 47, 47, 0.7)',
      '0 0 0 10px rgba(211, 47, 47, 0)',
      '0 0 0 0 rgba(211, 47, 47, 0)'
    ],
    duration: 1500,
    loop: true,
    easing: 'easeOutQuad'
  });
}

export function animateAlertSlideIn(element) {
  anime({
    targets: element,
    translateX: [300, 0],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutCubic'
  });
}

export function animateAlertBadge(badgeElement) {
  anime({
    targets: badgeElement,
    scale: [0, 1],
    rotate: ['180deg', '0deg'],
    duration: 400,
    easing: 'easeOutBack'
  });
}
```

### 4. Chart Animations

#### Chart Reveal Animation
```javascript
// src/animations/chartAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateChartReveal(chartContainer) {
  const bars = chartContainer.querySelectorAll('.recharts-bar-rectangle');
  const lines = chartContainer.querySelectorAll('.recharts-line-curve');
  
  anime({
    targets: bars,
    scaleY: [0, 1],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(50),
    easing: 'easeOutElastic(1, .8)'
  });

  anime({
    targets: lines,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200,
    easing: 'easeInOutSine'
  });
}

export function animateChartUpdate(chartContainer) {
  anime({
    targets: chartContainer.querySelectorAll('.recharts-bar, .recharts-line'),
    scale: [0.95, 1],
    duration: 400,
    easing: 'easeOutQuad'
  });
}
```

#### Pie Chart Segments
```javascript
export function animatePieChart(segments) {
  anime({
    targets: segments,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 600,
    delay: anime.stagger(100, {from: 'center'}),
    easing: 'easeOutBack'
  });
}
```

### 5. Counter Animations

#### Animated Number Counter
```javascript
// src/animations/counterAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateCounter(element, from, to, duration = 1000) {
  const obj = { value: from };
  
  anime({
    targets: obj,
    value: to,
    duration,
    round: 1,
    easing: 'easeOutQuad',
    update: function() {
      element.textContent = obj.value.toLocaleString();
    }
  });
}

export function animateMultipleCounters(counters) {
  counters.forEach((counter, index) => {
    const obj = { value: counter.from };
    
    anime({
      targets: obj,
      value: counter.to,
      duration: 1200,
      delay: index * 100,
      round: 1,
      easing: 'easeOutExpo',
      update: function() {
        counter.element.textContent = obj.value.toLocaleString();
      }
    });
  });
}
```

### 6. Gauge & Progress Animations

#### Risk Score Gauge
```javascript
// src/animations/gaugeAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateGaugeNeedle(needleElement, targetAngle) {
  anime({
    targets: needleElement,
    rotate: [0, targetAngle],
    duration: 1500,
    easing: 'easeOutElastic(1, .6)'
  });
}

export function animateGaugeArc(arcElement, targetValue) {
  anime({
    targets: arcElement,
    strokeDashoffset: [anime.setDashoffset, targetValue],
    duration: 1200,
    easing: 'easeInOutQuad'
  });
}

export function animateProgressBar(barElement, targetWidth) {
  anime({
    targets: barElement,
    width: [0, targetWidth + '%'],
    duration: 1000,
    easing: 'easeOutQuad'
  });
}
```

### 7. Map Marker Animations

#### Marker Drop Animation
```javascript
// src/animations/mapAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateMarkerDrop(markerElements) {
  anime({
    targets: markerElements,
    translateY: [-100, 0],
    opacity: [0, 1],
    scale: [0, 1],
    duration: 600,
    delay: anime.stagger(50, {from: 'center'}),
    easing: 'easeOutBounce'
  });
}

export function animateMarkerPulse(markerElement, severity) {
  const colors = {
    CRITICAL: 'rgba(211, 47, 47, 0.7)',
    HIGH: 'rgba(245, 124, 0, 0.7)',
    MEDIUM: 'rgba(251, 192, 45, 0.7)'
  };

  return anime({
    targets: markerElement,
    scale: [1, 1.3, 1],
    boxShadow: [
      `0 0 0 0 ${colors[severity] || colors.MEDIUM}`,
      `0 0 0 15px rgba(0,0,0,0)`,
      `0 0 0 0 rgba(0,0,0,0)`
    ],
    duration: 2000,
    loop: true,
    easing: 'easeOutQuad'
  });
}
```

### 8. Timeline Animations

#### Attack Timeline
```javascript
// src/animations/timelineAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateTimelineReveal(timelineContainer) {
  const tl = anime.timeline({
    easing: 'easeOutExpo'
  });

  // Animate timeline line
  tl.add({
    targets: timelineContainer.querySelector('.timeline-line'),
    scaleX: [0, 1],
    duration: 800
  })
  // Animate timeline events
  .add({
    targets: timelineContainer.querySelectorAll('.timeline-event'),
    opacity: [0, 1],
    translateX: [-30, 0],
    scale: [0.8, 1],
    delay: anime.stagger(100),
    duration: 500
  }, '-=400');

  return tl;
}

export function animateEventHighlight(eventElement) {
  anime({
    targets: eventElement,
    backgroundColor: ['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.3)', 'rgba(33, 150, 243, 0.1)'],
    scale: [1, 1.05, 1],
    duration: 600,
    easing: 'easeInOutQuad'
  });
}
```

### 9. Kill Chain Visualization

#### Phase Activation Animation
```javascript
// src/animations/killChainAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateKillChainPhases(phaseElements) {
  const tl = anime.timeline({
    easing: 'easeOutExpo'
  });

  phaseElements.forEach((phase, index) => {
    tl.add({
      targets: phase,
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [20, 0],
      duration: 400
    }, index * 150);
  });

  return tl;
}

export function animatePhaseConnection(lineElement) {
  anime({
    targets: lineElement,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 800,
    easing: 'easeInOutQuad'
  });
}

export function animateActivePhase(phaseElement) {
  return anime({
    targets: phaseElement,
    boxShadow: [
      '0 0 0 0 rgba(0, 255, 65, 0.7)',
      '0 0 0 20px rgba(0, 255, 65, 0)',
      '0 0 0 0 rgba(0, 255, 65, 0)'
    ],
    duration: 1500,
    loop: true,
    easing: 'easeOutQuad'
  });
}
```

### 10. Table & List Animations

#### Row Stagger Animation
```javascript
// src/animations/tableAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateTableRows(rowElements) {
  anime({
    targets: rowElements,
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 400,
    delay: anime.stagger(30),
    easing: 'easeOutQuad'
  });
}

export function animateRowHighlight(rowElement) {
  anime({
    targets: rowElement,
    backgroundColor: ['rgba(33, 150, 243, 0)', 'rgba(33, 150, 243, 0.2)', 'rgba(33, 150, 243, 0)'],
    duration: 600,
    easing: 'easeInOutQuad'
  });
}
```

### 11. Button & Interactive Elements

#### Button Click Feedback
```javascript
// src/animations/buttonAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateButtonClick(buttonElement) {
  anime({
    targets: buttonElement,
    scale: [1, 0.95, 1],
    duration: 200,
    easing: 'easeOutQuad'
  });
}

export function animateButtonLoading(buttonElement) {
  const spinner = buttonElement.querySelector('.spinner');
  
  return anime({
    targets: spinner,
    rotate: '1turn',
    duration: 1000,
    loop: true,
    easing: 'linear'
  });
}

export function animateButtonSuccess(buttonElement) {
  anime({
    targets: buttonElement,
    scale: [1, 1.1, 1],
    backgroundColor: ['#2196F3', '#4CAF50', '#2196F3'],
    duration: 600,
    easing: 'easeOutQuad'
  });
}
```

### 12. Modal & Dialog Animations

#### Modal Entry/Exit
```javascript
// src/animations/modalAnimations.js
import anime from 'animejs/lib/anime.es.js';

export function animateModalOpen(modalElement, backdropElement) {
  const tl = anime.timeline({
    easing: 'easeOutExpo'
  });

  tl
    .add({
      targets: backdropElement,
      opacity: [0, 1],
      duration: 300
    })
    .add({
      targets: modalElement,
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [50, 0],
      duration: 400
    }, '-=150');

  return tl;
}

export function animateModalClose(modalElement, backdropElement) {
  const tl = anime.timeline({
    easing: 'easeInExpo'
  });

  tl
    .add({
      targets: modalElement,
      opacity: [1, 0],
      scale: [1, 0.8],
      translateY: [0, 50],
      duration: 300
    })
    .add({
      targets: backdropElement,
      opacity: [1, 0],
      duration: 200
    }, '-=100');

  return tl;
}
```

---

## React Integration Patterns

### useEffect Hook Integration
```javascript
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

function DashboardCard({ data }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }, []);

  return <div ref={cardRef}>{/* content */}</div>;
}
```

### Custom Animation Hook
```javascript
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export function useCardEntrance(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay,
        easing: 'easeOutQuad'
      });
    }
  }, [delay]);

  return ref;
}

// Usage
function MyCard() {
  const cardRef = useCardEntrance(200);
  return <div ref={cardRef}>{/* content */}</div>;
}
```

### Animation on Data Change
```javascript
function MetricsCard({ count }) {
  const countRef = useRef(null);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (countRef.current && prevCountRef.current !== count) {
      const obj = { value: prevCountRef.current };
      
      anime({
        targets: obj,
        value: count,
        duration: 1000,
        round: 1,
        easing: 'easeOutQuad',
        update: () => {
          countRef.current.textContent = obj.value.toLocaleString();
        }
      });

      prevCountRef.current = count;
    }
  }, [count]);

  return <span ref={countRef}>{count}</span>;
}
```

---

## Animation Timing & Coordination

### Recommended Durations
- **Micro-interactions**: 150-250ms (button clicks, hovers)
- **Component entrance**: 400-600ms (cards, modals)
- **Page transitions**: 600-800ms (route changes)
- **Data updates**: 800-1200ms (charts, counters)
- **Complex sequences**: 1500-2000ms (timelines, kill chains)

### Easing Recommendations
- **Entrance**: `easeOutQuad`, `easeOutCubic`, `easeOutExpo`
- **Exit**: `easeInQuad`, `easeInCubic`
- **Bounce effects**: `easeOutBounce`, `easeOutElastic`
- **Smooth transitions**: `easeInOutQuad`, `easeInOutCubic`
- **Linear progress**: `linear`

### Stagger Patterns
```javascript
// Sequential (one after another)
delay: anime.stagger(100)

// From center outward
delay: anime.stagger(100, {from: 'center'})

// Grid pattern
delay: anime.stagger(100, {grid: [5, 4], from: 'center'})

// Reverse order
delay: anime.stagger(100, {direction: 'reverse'})
```

---

## Performance Optimization

### Animation Cleanup
```javascript
useEffect(() => {
  const animation = anime({
    targets: '.element',
    translateX: 250,
    loop: true
  });

  return () => {
    animation.pause();
    animation.seek(0);
  };
}, []);
```

### Conditional Animations
```javascript
// Only animate on first mount
const hasAnimated = useRef(false);

useEffect(() => {
  if (!hasAnimated.current && elementRef.current) {
    animateCardEntrance(elementRef.current);
    hasAnimated.current = true;
  }
}, []);
```

### Reduced Motion Support
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateWithAccessibility(element) {
  if (prefersReducedMotion) {
    // Instant transition
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  } else {
    // Animated transition
    anime({
      targets: element,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      easing: 'easeOutQuad'
    });
  }
}
```

---

## Color Palette Integration

### Animated Color Transitions
```javascript
import { colorPalette } from '../utils/colors';

// Severity-based color animation
export function animateSeverityChange(element, severity) {
  const colors = {
    CRITICAL: colorPalette.critical,
    HIGH: colorPalette.high,
    MEDIUM: colorPalette.medium,
    LOW: colorPalette.low
  };

  anime({
    targets: element,
    backgroundColor: colors[severity],
    duration: 400,
    easing: 'easeOutQuad'
  });
}

// Theme color pulse
export function animateThemePulse(element) {
  anime({
    targets: element,
    backgroundColor: [
      colorPalette.blue,
      colorPalette.neonGreen,
      colorPalette.blue
    ],
    duration: 2000,
    loop: true,
    easing: 'easeInOutQuad'
  });
}
```

---
