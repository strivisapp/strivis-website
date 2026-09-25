/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  future: {
    // Every `hover:` utility only applies on devices that really hover
    // (@media (hover: hover) and (pointer: fine)): a tap on a phone must not
    // leave a hover state behind.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Shape system (one rule, used everywhere): anything you press is a
        // pill (rounded-full); surfaces are a double bezel, an outer shell
        // and an inner core with concentric radii (shell = core + 6px
        // padding); images inside a core use `tile`.
        shell: '28px',
        core: '22px',
        tile: '16px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        // The site's one near-black (#0B0D11), slightly blue-tinted instead
        // of #000. surface-1/2 are the raised layers on top of it. Plain hex
        // (mirrored as --surface-* in index.css) so opacity modifiers like
        // bg-surface-2/95 work.
        ink: '#0B0D11',
        surface: {
          0: '#0b0d11',
          1: '#11141a',
          2: '#171b22',
        },
        hairline: {
          DEFAULT: 'var(--hairline)',
          strong: 'var(--hairline-strong)',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)']
      },
      // Fixed type ramp (mobile / desktop pairs). Anton is set without extra
      // tracking; display stays at or below 6rem.
      fontSize: {
        'display-sm': ['3.5rem', { lineHeight: '0.95' }],
        display: ['6rem', { lineHeight: '0.9' }],
        'h2-sm': ['2.25rem', { lineHeight: '1' }],
        h2: ['3.5rem', { lineHeight: '0.95' }],
        h3: ['1.5rem', { lineHeight: '1.1' }],
        lead: ['1.1875rem', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      // Motion tokens (src/index.css): one strong ease-out for everything
      // that enters or responds, a few fixed durations, all under 300ms.
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        press: 'var(--dur-press)',
        ui: 'var(--dur-ui)',
        reveal: 'var(--dur-reveal)',
      },
      boxShadow: {
        // Depth comes from an inner highlight plus an offset, blurred,
        // tinted shadow; never from a coloured zero-offset glow.
        core: 'inset 0 1px 0 rgb(255 255 255 / 0.06)',
        lift: '0 24px 48px -24px rgb(0 0 0 / 0.6), 0 8px 16px -8px rgb(0 0 0 / 0.4)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s var(--ease-out)',
        'accordion-up': 'accordion-up 0.16s var(--ease-out)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
