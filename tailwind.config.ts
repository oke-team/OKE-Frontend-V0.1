import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Palette de couleurs inspirée de Linear, ClickUp et Apple Vision Pro
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Couleurs primaires avec nuances pastels
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f4ff",
          100: "#e0e8ff",
          200: "#c7d6ff",
          300: "#a5b9ff",
          400: "#7f94ff",
          500: "#5e72ff",
          600: "#4a5eff",
          700: "#3b4ded",
          800: "#3142c6",
          900: "#2b3aa1",
          950: "#1a2260",
        },
        
        // Couleurs secondaires pastels
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fdf2fe",
          100: "#fae5fc",
          200: "#f5cbf9",
          300: "#eda8f4",
          400: "#e279ea",
          500: "#d150da",
          600: "#b432bc",
          700: "#942799",
          800: "#7a237d",
          900: "#662364",
        },
        
        // Accents pastels
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          pink: "#ff6b9d",
          purple: "#c66fbc",
          blue: "#66d9ef",
          green: "#95e1a4",
          yellow: "#feca57",
          orange: "#ff9a76",
        },
        
        // Couleurs destructives
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        // Couleurs mutées pour backgrounds
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Couleurs pour popover
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Couleurs pour cards
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Palette neutre étendue
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          150: "#ededed",
          200: "#e5e5e5",
          250: "#dddddd",
          300: "#d4d4d4",
          350: "#b8b8b8",
          400: "#a3a3a3",
          450: "#8e8e8e",
          500: "#737373",
          550: "#5e5e5e",
          600: "#525252",
          650: "#484848",
          700: "#404040",
          750: "#383838",
          800: "#262626",
          850: "#1e1e1e",
          900: "#171717",
          950: "#0a0a0a",
        },
        
        // Glass effects colors
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(0, 0, 0, 0.1)",
        },
        
        // Couleurs spécifiques pour les cartes entrepreneur
        cards: {
          bg: {
            DEFAULT: "rgba(255, 255, 255, 0.05)",
            hover: "rgba(255, 255, 255, 0.08)",
            active: "rgba(255, 255, 255, 0.1)",
            glass: "rgba(255, 255, 255, 0.03)",
          },
          border: {
            DEFAULT: "rgba(255, 255, 255, 0.1)",
            hover: "rgba(255, 255, 255, 0.15)",
            active: "rgba(94, 114, 255, 0.3)",
            focus: "rgba(94, 114, 255, 0.5)",
          },
        },
      },
      
      // Border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      
      // Espacement cohérent
      spacing: {
        "0.5": "0.125rem", // 2px
        "1": "0.25rem",    // 4px
        "1.5": "0.375rem", // 6px
        "2": "0.5rem",     // 8px
        "2.5": "0.625rem", // 10px
        "3": "0.75rem",    // 12px
        "3.5": "0.875rem", // 14px
        "4": "1rem",       // 16px
        "5": "1.25rem",    // 20px
        "6": "1.5rem",     // 24px
        "7": "1.75rem",    // 28px
        "8": "2rem",       // 32px
        "9": "2.25rem",    // 36px
        "10": "2.5rem",    // 40px
        "11": "2.75rem",   // 44px
        "12": "3rem",      // 48px
        "14": "3.5rem",    // 56px
        "16": "4rem",      // 64px
        "18": "4.5rem",    // 72px
        "20": "5rem",      // 80px
        "24": "6rem",      // 96px
        "28": "7rem",      // 112px
        "32": "8rem",      // 128px
        "36": "9rem",      // 144px
        "40": "10rem",     // 160px
        "44": "11rem",     // 176px
        "48": "12rem",     // 192px
        "52": "13rem",     // 208px
        "56": "14rem",     // 224px
        "60": "15rem",     // 240px
        "64": "16rem",     // 256px
        "72": "18rem",     // 288px
        "80": "20rem",     // 320px
        "96": "24rem",     // 384px
      },
      
      // Typographie
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "monospace"],
      },
      
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],  // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }],          // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],      // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],         // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],      // 18px
        xl: ["1.25rem", { lineHeight: "1.875rem" }],      // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],        // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],   // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],     // 36px
        "5xl": ["3rem", { lineHeight: "1" }],             // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }],          // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }],           // 72px
        "8xl": ["6rem", { lineHeight: "1" }],             // 96px
        "9xl": ["8rem", { lineHeight: "1" }],             // 128px
      },
      
      // Ombres douces pour effet Glass
      boxShadow: {
        "glass-sm": "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(0, 0, 0, 0.12)",
        "glass-xl": "0 24px 64px 0 rgba(0, 0, 0, 0.16)",
        "glow-sm": "0 0 20px rgba(94, 114, 255, 0.15)",
        "glow": "0 0 40px rgba(94, 114, 255, 0.2)",
        "glow-lg": "0 0 60px rgba(94, 114, 255, 0.25)",
        "inner-glow": "inset 0 0 20px rgba(94, 114, 255, 0.1)",
        // Ombres spécifiques pour les cartes
        "card-default": "0 4px 24px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(94, 114, 255, 0.1)",
        "card-active": "0 2px 16px 0 rgba(0, 0, 0, 0.04)",
        "glow-violet": "0 0 24px rgba(139, 92, 246, 0.2)",
        "glow-green": "0 0 24px rgba(16, 185, 129, 0.2)",
        "glow-red": "0 0 24px rgba(239, 68, 68, 0.2)",
      },
      
      // Backdrop blur pour Glass effect
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      
      // Animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(94, 114, 255, 0.15)" },
          "100%": { boxShadow: "0 0 40px rgba(94, 114, 255, 0.3)" },
        },
      },
      
      // Transitions
      transitionDuration: {
        "0": "0ms",
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      
      // Z-index scale
      zIndex: {
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "dropdown": "1000",
        "sticky": "1020",
        "banner": "1030",
        "overlay": "1040",
        "modal": "1050",
        "popover": "1060",
        "tooltip": "1070",
        "notification": "1080",
        "max": "9999",
      },
    },
    
    // Breakpoints responsive
    screens: {
      // Standard breakpoints
      "xs": "475px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      
      // Device-specific breakpoints
      "mobile": { max: "767px" },
      "tablet": { min: "768px", max: "1023px" },
      "desktop": { min: "1024px" },
      
      // Orientation-based breakpoints
      "portrait": { raw: "(orientation: portrait)" },
      "landscape": { raw: "(orientation: landscape)" },
      
      // Specific device sizes
      "iphone-se": { raw: "(max-width: 375px) and (max-height: 667px)" },
      "iphone": { raw: "(max-width: 428px) and (max-height: 926px)" },
      "ipad": { raw: "(min-width: 768px) and (max-width: 1024px)" },
      "ipad-portrait": { raw: "(min-width: 768px) and (max-width: 834px) and (orientation: portrait)" },
      "ipad-landscape": { raw: "(min-width: 1024px) and (max-width: 1366px) and (orientation: landscape)" },
      
      // Performance-based media queries
      'motion-reduce': { raw: '(prefers-reduced-motion: reduce)' },
      'motion-safe': { raw: '(prefers-reduced-motion: no-preference)' },
      'high-contrast': { raw: '(prefers-contrast: high)' },
      'low-performance': { raw: '(max-width: 768px) and (max-device-pixel-ratio: 2)' },
      
      // Touch-based queries
      'hover-hover': { raw: '(hover: hover) and (pointer: fine)' },
      'touch': { raw: '(hover: none) and (pointer: coarse)' },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;