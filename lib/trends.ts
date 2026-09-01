export interface Trend {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  details: string[];
  bestPractices: string[];
  ecoImpact: string;
  color: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  year: 2026;
}

export const trends: Trend[] = [
  {
    id: 'dark-mode-2',
    title: 'Dark Mode 2.0',
    subtitle: 'OLED-Optimized Interfaces',
    category: 'Color System',
    description: 'Beyond simple dark backgrounds. True black optimization, adaptive contrast, and semantic color tokens that shift across light levels.',
    details: [
      'Pure black (#000000) for OLED power savings',
      'Automatic contrast adjustment based on ambient light',
      'Semantic color tokens that map to both themes',
      'Tinted dark modes (dark blue, dark green variants)',
      'Image and video adaptation for dark contexts'
    ],
    bestPractices: [
      'Use elevation levels (1-5) instead of pure gray borders',
      'Test with real OLED displays for smearing artifacts',
      'Implement system-level dark mode detection',
      'Provide manual toggle with persistent preference'
    ],
    ecoImpact: 'OLED dark mode reduces screen energy consumption by up to 47%',
    color: '#8B5CF6',
    icon: 'moon',
    difficulty: 'Beginner',
    year: 2026,
  },
  {
    id: '3d-spatial',
    title: '3D & Spatial Design',
    subtitle: 'Immersive Depth Interfaces',
    category: 'Visual Depth',
    description: 'Interfaces that break the flat plane with layered depth, perspective transforms, and volumetric elements without full 3D engines.',
    details: [
      'CSS 3D transforms for card stacks and carousels',
      'Parallax scrolling at multiple depth layers',
      'Perspective grids for spatial navigation',
      'Volumetric shadows and ambient occlusion fakes',
      'Mixed 2D/3D compositing for performance'
    ],
    bestPractices: [
      'Use transform3d() to force GPU compositing',
      'Limit depth layers to 5 for mobile performance',
      'Provide fallback flat designs for low-end devices',
      'Use subtle depth cues rather than dramatic perspective'
    ],
    ecoImpact: 'GPU-accelerated transforms are more efficient than CPU-based animations',
    color: '#3B82F6',
    icon: 'cube',
    difficulty: 'Advanced',
    year: 2026,
  },
  {
    id: 'micro-animations',
    title: 'Micro-Animations',
    subtitle: 'Purposeful Motion Feedback',
    category: 'Motion Design',
    description: 'Tiny, purposeful animations that guide users, provide feedback, and add personality without slowing down task completion.',
    details: [
      'Button press compressions and releases',
      'Success state morphing (checkmark draws itself)',
      'Skeleton screens with shimmer gradients',
      'Number counting animations for statistics',
      'Elastic overshoot on UI element entrances'
    ],
    bestPractices: [
      'Keep interactions under 300ms',
      'Use spring physics for natural feel',
      'Respect reduced-motion preferences',
      'Animate layout properties, not just opacity'
    ],
    ecoImpact: 'Well-timed animations reduce user error and task retry rates by 23%',
    color: '#EC4899',
    icon: 'pulse',
    difficulty: 'Intermediate',
    year: 2026,
  },
  {
    id: 'eco-design',
    title: 'Eco-Design',
    subtitle: 'Sustainable Digital Interfaces',
    category: 'Ethics',
    description: 'Designing interfaces that minimize carbon footprint through optimized assets, reduced data transfer, and conscious color choices.',
    details: [
      'Dark mode as default for energy savings',
      'Image compression and WebP/AVIF formats',
      'System font usage to reduce download overhead',
      'Lazy loading and pagination for data efficiency',
      'Carbon footprint calculators for design decisions'
    ],
    bestPractices: [
      'Measure page weight and set carbon budgets',
      'Use vector graphics instead of bitmaps where possible',
      'Implement efficient caching strategies',
      'Design for device longevity over trends'
    ],
    ecoImpact: 'Sustainable design can reduce a page\'s carbon footprint by 60-80%',
    color: '#10B981',
    icon: 'leaf',
    difficulty: 'Beginner',
    year: 2026,
  },
  {
    id: 'minimalism',
    title: 'Minimalism 2.0',
    subtitle: 'Essentialism with Warmth',
    category: 'Layout',
    description: 'Stripped-back interfaces that retain personality through generous whitespace, refined typography, and purposeful color accents.',
    details: [
      'Asymmetric layouts with intentional imbalance',
      'Generous whitespace as a design element',
      'Single-font systems with weight/scale contrast',
      'Reduced chrome - borders become shadows or spacing',
      'Content-first navigation that hides until needed'
    ],
    bestPractices: [
      'Remove one element and test if the design still works',
      'Use 8pt grid systems for consistent spacing',
      'Limit color palette to 3 core colors + neutrals',
      'Every element must earn its place on screen'
    ],
    ecoImpact: 'Minimal assets and simpler layouts reduce loading times and data usage',
    color: '#F59E0B',
    icon: 'shapes',
    difficulty: 'Beginner',
    year: 2026,
  },
  {
    id: 'dynamic-typography',
    title: 'Dynamic Typography',
    subtitle: 'Responsive & Interactive Type',
    category: 'Typography',
    description: 'Type systems that adapt to context, user behavior, and interaction state - scaling, morphing, and responding in real-time.',
    details: [
      'Variable fonts for weight/width interpolation',
      'Scroll-driven type scale changes',
      'Text that responds to touch pressure',
      'Kinetic typography for data visualization',
      'Accessibility-first responsive font sizing'
    ],
    bestPractices: [
      'Use clamp() for fluid type scaling between breakpoints',
      'Maintain WCAG 2.1 AA contrast ratios at all sizes',
      'Test variable font performance on low-end devices',
      'Provide static font fallbacks for older browsers'
    ],
    ecoImpact: 'Variable fonts reduce font file requests from 6+ to 1, saving bandwidth',
    color: '#EF4444',
    icon: 'text',
    difficulty: 'Intermediate',
    year: 2026,
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    subtitle: 'Translucent Depth Layers',
    category: 'Visual Style',
    description: 'Frosted glass effects with backdrop blur, subtle borders, and layered transparency creating depth without heavy shadows.',
    details: [
      'Backdrop-filter blur with saturation boosts',
      'Subtle white borders for glass edge definition',
      'Layered translucent panels at varying opacities',
      'Vibrant gradients behind glass for color depth',
      'Noise textures for realistic glass refraction'
    ],
    bestPractices: [
      'Limit blur radius to 8-20px for performance',
      'Ensure text contrast passes WCAG on all backgrounds',
      'Use sparingly - not every element needs glass',
      'Test on actual devices - blur is GPU intensive'
    ],
    ecoImpact: 'GPU-accelerated blur is efficient on modern chipsets with proper layer compositing',
    color: '#06B6D4',
    icon: 'water',
    difficulty: 'Intermediate',
    year: 2026,
  },
  {
    id: 'neumorphism',
    title: 'Soft UI',
    subtitle: 'Tactile Interface Surfaces',
    category: 'Visual Style',
    description: 'Soft, extruded plastic look with subtle highlights and shadows that create the illusion of physical pushable surfaces.',
    details: [
      'Dual shadow system (light highlight + dark shadow)',
      'Subtle gradients that suggest convex/concave forms',
      'Soft rounded corners (16px-24px radius)',
      'Monochromatic base with minimal color accents',
      'Press states that invert shadow direction'
    ],
    bestPractices: [
      'Use on light gray backgrounds (#E0E5EC) for best effect',
      'Shadow offsets should be 4-8px for subtlety',
      'Combine with flat elements to avoid overuse',
      'Ensure tactile feedback (haptics) on press'
    ],
    ecoImpact: 'Subtle visual effects reduce need for heavy image assets',
    color: '#64748B',
    icon: 'disc',
    difficulty: 'Intermediate',
    year: 2026,
  },
];

export const categories = ['All', 'Color System', 'Visual Depth', 'Motion Design', 'Ethics', 'Layout', 'Typography', 'Visual Style'];

export const dailyTips = [
  'Use 8pt grid spacing for consistent rhythm across screens.',
  'Dark mode should use pure black on OLED, but dark gray (#121212) on LCD.',
  'Micro-interactions should complete in under 300ms to feel responsive.',
  'Variable fonts can replace 6+ font files with a single request.',
  'Always test your color contrast with actual users who have vision impairments.',
  'Glassmorphism needs vibrant backgrounds to work - plain white backgrounds kill the effect.',
  'Eco-design starts with measuring: use tools to calculate your carbon footprint.',
  'Dynamic typography should respond to user preferences, not just device size.',
  '3D transforms should use perspective(1000px) for natural, subtle depth.',
  'Minimalism is not about removing everything - it is about keeping what matters.',
];
