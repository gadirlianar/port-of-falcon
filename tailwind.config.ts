import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          pitch: '#020617',     // Slate-950: Main application backdrop
          surface: '#0B0F19',   // Obsidian card background
          elevated: '#111827',  // Elevated module surface
          hud: '#070A10',       // Telemetry terminal backdrop
          inverted: '#FFFFFF',  // Brutalist inverted card surface
        },
        falcon: {
          cyan: '#0EA5E9',        // Electric Sky / Cyan 500
          'cyan-neon': '#00F0FF', // Neon laser cyan
          'cyan-light': '#38BDF8',// Cyan 400
          indigo: '#6366F1',      // Cyber Indigo 500
          'indigo-light': '#818CF8', // Indigo 400
          'indigo-deep': '#4338CA',  // Nebula violet
        },
        status: {
          nominal: '#10B981',   // Emerald 500 (Tier III SLA active, fiber online)
          warning: '#F59E0B',   // Amber 500 (Threshold alert, high attenuation)
          critical: '#EF4444',  // Red 500 (Alarm trigger, link fail)
        },
        monoline: {
          border: 'rgba(215, 226, 234, 0.2)',
          subtle: 'rgba(255, 255, 255, 0.08)',
          hud: 'rgba(14, 165, 233, 0.35)',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'deck-sm': '40px',
        'deck-md': '50px',
        'deck-lg': '60px',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fiber-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px #00F0FF)' },
          '50%': { filter: 'drop-shadow(0 0 10px #00F0FF)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 25s linear infinite',
        'marquee-right': 'marquee-right 25s linear infinite',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'fiber-glow': 'fiber-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
