# Delta for Visual System

## ADDED Requirements

### Requirement: Color Palette System
The design system SHALL implement a semantic color palette with editorial sophistication.

#### Scenario: Primary colors usage
- WHEN designing any UI element
- THEN colors MUST be selected from the defined palette
- AND each color MUST have a clear semantic meaning
- AND contrast ratios MUST meet WCAG 2.1 AA standards (4.5:1 for body text)

#### Scenario: Color token naming
- GIVEN a color in the palette
- WHEN referenced in code
- THEN it MUST use semantic naming (e.g., `text-editorial-primary`, not `text-red-600`)
- AND support both light and dark themes

### Requirement: Typography Hierarchy
The system SHALL use a typographic scale with serif headings and sans-serif body text.

#### Scenario: Heading typography
- WHEN rendering article headlines
- THEN font-family MUST be serif (Playfair Display, Georgia, Times New Roman)
- AND font-weight MUST be 700-900 for emphasis
- AND line-height MUST be 1.1-1.2 for tightness
- AND letter-spacing MUST be -0.02em for optical adjustment

#### Scenario: Body text typography
- WHEN rendering article content
- THEN font-family MUST be sans-serif (Inter, system-ui, -apple-system)
- AND font-size MUST be 16-18px for readability
- AND line-height MUST be 1.6-1.8 for comfortable reading
- AND max-width MUST be 720px to prevent long line lengths

#### Scenario: Responsive typography
- GIVEN viewport width changes
- WHEN rendering text
- THEN font sizes MUST scale fluidly using clamp()
- EXAMPLE: `font-size: clamp(2rem, 5vw, 4rem)` for h1

### Requirement: Spacing System
The design SHALL use a consistent 8px-based spacing scale.

#### Scenario: Component spacing
- WHEN adding margins or padding
- THEN values MUST be multiples of 8px (0, 8, 16, 24, 32, 40, 48, 64, 80, 96)
- OR use half-steps (4, 12, 20) for fine-tuning
- AND spacing tokens MUST be used (e.g., `space-4`, `space-8`)

#### Scenario: Responsive spacing
- GIVEN different viewport sizes
- WHEN applying spacing
- THEN mobile SHOULD use smaller values (16-24px)
- AND desktop SHOULD use larger values (32-64px)
- AND spacing MUST scale proportionally

### Requirement: Elevation System
The system SHALL use a consistent shadow/elevation system for depth.

#### Scenario: Card elevation
- WHEN rendering elevated cards
- THEN shadows MUST use predefined elevation levels (0-5)
- LEVEL 0: No shadow (flat)
- LEVEL 1: `box-shadow: 0 1px 3px rgba(0,0,0,0.12)`
- LEVEL 2: `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- LEVEL 3: `box-shadow: 0 10px 20px rgba(0,0,0,0.15)`
- LEVEL 4: `box-shadow: 0 20px 40px rgba(0,0,0,0.2)`

#### Scenario: Hover elevation
- WHEN user hovers over interactive element
- THEN elevation MUST increase by 1 level
- AND transition MUST be smooth (200-300ms)
- AND cursor MUST change to pointer

### Requirement: Border Radius System
The design SHALL use consistent corner radii for visual harmony.

#### Scenario: Component borders
- WHEN rendering cards, buttons, or images
- THEN border-radius values MUST be from the scale:
  - `none`: 0px (sharp corners)
  - `sm`: 4px (subtle rounding)
  - `md`: 8px (standard)
  - `lg`: 12px (prominent)
  - `xl`: 16px (hero elements)
  - `full`: 9999px (pills, circles)

### Requirement: Animation Timing
The system SHALL use consistent easing curves and durations.

#### Scenario: Standard transitions
- WHEN animating UI changes
- THEN duration MUST be:
  - Fast: 150ms (tooltips, dropdowns)
  - Normal: 300ms (hovers, focus states)
  - Slow: 500ms (page transitions)
- AND easing MUST be:
  - Entrance: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
  - Exit: `cubic-bezier(0.4, 0, 1, 1)` (ease-in)
  - Emphasis: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)

#### Scenario: Scroll-triggered animations
- WHEN element enters viewport
- THEN animation MUST start with 100-200ms delay
- AND stagger delays MUST be 50-100ms between siblings
- AND animation MUST respect `prefers-reduced-motion` media query

### Requirement: Iconography
The system SHALL use consistent icon styling from Lucide React.

#### Scenario: Icon sizing
- WHEN rendering icons
- THEN sizes MUST be from the scale: 16px, 20px, 24px, 32px, 40px, 48px
- AND icons MUST align vertically with adjacent text
- AND stroke-width MUST be consistent (1.5-2px)

### Requirement: Grid System
The design SHALL use a 12-column grid with asymmetric layouts.

#### Scenario: Desktop grid
- GIVEN viewport width > 1024px
- WHEN laying out content
- THEN grid MUST be 12 columns with 24px gutters
- AND max-width MUST be 1400px centered
- AND asymmetric layouts MAY span 8+4 or 7+5 columns

#### Scenario: Magazine-style layouts
- WHEN creating editorial layouts
- THEN content MUST use varied column spans
- AVOIDING uniform repetition
- CREATING visual hierarchy through size

---

**Design Tokens Example:**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        editorial: {
          red: '#DC2626',
          navy: '#1E293B',
          gray: '#64748B',
        },
        success: '#10B981',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      spacing: {
        '4': '1rem',    // 16px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
        '20': '5rem',   // 80px
      },
    },
  },
}
```

---

**Status**: New Spec
**Priority**: Critical
**Dependencies**: None
