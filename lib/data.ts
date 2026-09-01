export interface TrendItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'eco' | 'dark' | 'minimal' | 'micro' | '3d' | 'typo' | 'immersive';
  icon: string;
  color: string;
  gradient: [string, string];
  stats: { label: string; value: string }[];
  tags: string[];
  featured: boolean;
  tips: string[];
}

export const trends: TrendItem[] = [
  {
    id: '1',
    title: 'Eco-Design',
    subtitle: 'Sustainable Interfaces',
    description: 'Eco-design in 2026 focuses on reducing digital carbon footprint through optimized color palettes (dark mode saves up to 47% battery on OLED), minimal data transfers, and efficient animations. Designers now calculate the energy cost of every pixel.',
    category: 'eco',
    icon: 'leaf',
    color: '#2D5A27',
    gradient: ['#2D5A27', '#4A7C3F'],
    stats: [
      { label: 'Battery Saved', value: '47%' },
      { label: 'Data Reduced', value: '30%' },
      { label: 'Adoption', value: '82%' },
    ],
    tags: ['Sustainability', 'Dark Mode', 'Optimization', 'OLED'],
    featured: true,
    tips: [
      'Use dark backgrounds with high-contrast accents',
      'Optimize image sizes and use vector graphics',
      'Minimize network requests with smart caching',
      'Prefer CSS transforms over layout changes',
    ],
  },
  {
    id: '2',
    title: 'Dark Mode 2.0',
    subtitle: 'Adaptive Darkness',
    description: 'Beyond simple dark backgrounds, 2026 dark mode features dynamic elevation through subtle color variations, automatic ambient light adaptation, and OLED-safe pure blacks with warm undertones to reduce eye strain.',
    category: 'dark',
    icon: 'moon',
    color: '#7B61FF',
    gradient: ['#1A1A2E', '#0D0D0F'],
    stats: [
      { label: 'Eye Strain', value: '-40%' },
      { label: 'Sleep Quality', value: '+25%' },
      { label: 'User Pref', value: '78%' },
    ],
    tags: ['Accessibility', 'OLED', 'Ambient', 'Comfort'],
    featured: true,
    tips: [
      'Use layered dark surfaces with subtle tonal shifts',
      'Implement automatic ambient light detection',
      'Avoid pure #000000 — use warm dark tones',
      'Ensure WCAG 4.5:1 contrast ratio for all text',
    ],
  },
  {
    id: '3',
    title: 'Neo-Minimalism',
    subtitle: 'Less is More, More is Less',
    description: '2026 minimalism embraces extreme whitespace with intentional content density moments. Interfaces breathe with 40%+ whitespace, then compress into information-rich views when needed. The result is visual calm with cognitive clarity.',
    category: 'minimal',
    icon: 'remove-circle',
    color: '#E8E4DC',
    gradient: ['#F5F5F0', '#E8E4DC'],
    stats: [
      { label: 'Whitespace', value: '42%' },
      { label: 'Focus', value: '+35%' },
      { label: 'Clutter', value: '-60%' },
    ],
    tags: ['Whitespace', 'Simplicity', 'Clarity', 'Focus'],
    featured: true,
    tips: [
      'Start with 50% whitespace and reduce as needed',
      'Use typography hierarchy instead of borders',
      'Limit UI elements to 5 per screen area',
      'Embrace negative space as a design element',
    ],
  },
  {
    id: '4',
    title: 'Micro-Interactions',
    subtitle: 'Delight in Details',
    description: 'Every tap, swipe, and state change in 2026 carries purposeful animation. Micro-interactions provide immediate feedback, guide attention, and create emotional connections. From button morphing to scroll physics, motion is the new UI.',
    category: 'micro',
    icon: 'flash',
    color: '#FF6B35',
    gradient: ['#FF6B35', '#FF8C42'],
    stats: [
      { label: 'Engagement', value: '+45%' },
      { label: 'Errors', value: '-30%' },
      { label: 'Satisfaction', value: '92%' },
    ],
    tags: ['Animation', 'Feedback', 'Motion', 'Delight'],
    featured: false,
    tips: [
      'Keep animations under 300ms for responsiveness',
      'Use spring physics for natural movement feel',
      'Animate layout changes, not just opacity',
      'Provide haptic feedback alongside visual cues',
    ],
  },
  {
    id: '5',
    title: '3D & Spatial UI',
    subtitle: 'Depth Without Glasses',
    description: '2026 interfaces leverage 3D transforms, parallax layers, and perspective depth to create spatial experiences on flat screens. Cards float, content stacks in Z-space, and gestures feel tactile. It is 3D design without the headset.',
    category: '3d',
    icon: 'cube',
    color: '#6366F1',
    gradient: ['#6366F1', '#8B5CF6'],
    stats: [
      { label: 'Depth Layers', value: '5+' },
      { label: 'Retention', value: '+38%' },
      { label: 'Engagement', value: '+55%' },
    ],
    tags: ['Depth', 'Perspective', 'Parallax', 'Spatial'],
    featured: true,
    tips: [
      'Use subtle shadows and perspective transforms',
      'Add parallax to scrollable content layers',
      'Keep 3D effects subtle — avoid dizziness',
      'Use Z-index layering for content hierarchy',
    ],
  },
  {
    id: '6',
    title: 'Dynamic Typography',
    subtitle: 'Text That Breathes',
    description: 'Fonts in 2026 respond to user behavior, context, and emotion. Text scales with scroll speed, morphs on selection, and adapts weight to content importance. Variable fonts combined with real-time adjustments create living typography.',
    category: 'typo',
    icon: 'text',
    color: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'],
    stats: [
      { label: 'Readability', value: '+40%' },
      { label: 'Accessibility', value: 'AA+' },
      { label: 'Brand Recall', value: '+33%' },
    ],
    tags: ['Variable Fonts', 'Responsive', 'Accessibility', 'Brand'],
    featured: false,
    tips: [
      'Use variable font weight to show hierarchy',
      'Scale text fluidly based on viewport and content',
      'Implement text size memory per user preference',
      'Animate text transitions with 200ms easing',
    ],
  },
  {
    id: '7',
    title: 'Immersive Experiences',
    subtitle: 'Blur the Digital Divide',
    description: '2026 immersive design combines full-screen visuals, glassmorphism, ambient backgrounds, and context-aware content. The interface dissolves into the background when not needed, creating a sense of being inside the content rather than looking at it.',
    category: 'immersive',
    icon: 'eyedrop',
    color: '#06B6D4',
    gradient: ['#06B6D4', '#22D3EE'],
    stats: [
      { label: 'Immersion', value: '90%' },
      { label: 'Session Time', value: '+50%' },
      { label: 'Return Rate', value: '85%' },
    ],
    tags: ['Glassmorphism', 'Full-Screen', 'Ambient', 'Context'],
    featured: false,
    tips: [
      'Use frosted glass overlays over rich backgrounds',
      'Implement ambient motion in backgrounds',
      'Hide chrome elements when user is reading',
      'Create smooth transitions between contexts',
    ],
  },
];

export const getTrendById = (id: string) => trends.find(t => t.id === id);
export const getFeaturedTrends = () => trends.filter(t => t.featured);
export const getTrendsByCategory = (cat: string) => trends.filter(t => t.category === cat);
