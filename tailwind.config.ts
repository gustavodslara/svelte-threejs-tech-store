import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222.2, 84%, 4.9%)',
        primary: 'hsl(222.2, 47.4%, 11.2%)',
        'gray-500': 'hsl(215.4, 16.3%, 46.9%)',
        'gray-800': 'hsl(222.2, 47.4%, 11.2%)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-lg': ['64px', { lineHeight: '1.0625', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md': ['48px', { lineHeight: '1.0833', letterSpacing: '-0.003em', fontWeight: '600' }],
        'display-sm': ['40px', { lineHeight: '1.1', letterSpacing: '0', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
