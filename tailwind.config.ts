/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Keep all default Tailwind colors
				// Your existing shadcn/ui colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Your custom Teal/Emerald Theme based on #00a67e
				emerald: {
					"50": "#ecfdf5",   // Very light mint
					"100": "#d1fae5",  // Light mint
					"200": "#a7f3d0",  // Soft mint
					"300": "#6ee7b7",  // Light teal
					"400": "#34d399",  // Medium teal
					"500": "#00a67e",  // Your primary color
					"600": "#059669",  // Darker teal
					"700": "#047857",  // Deep teal
					"800": "#065f46",  // Very dark teal
					"900": "#064e3b",  // Almost black teal
					"950": "#022c22",  // Darkest teal
				},
				// Your custom complementary colors
				coral: {
					"50": "#fef2f2",
					"100": "#fee2e2",
					"200": "#fecaca",
					"300": "#fca5a5",
					"400": "#f87171",
					"500": "#ef4444",  // Coral red - complementary to teal
					"600": "#dc2626",
					"700": "#b91c1c",
					"800": "#991b1b",
					"900": "#7f1d1d",
				},
				red: {
					"50": "#fef2f2",
					"100": "#fee2e2",
					"200": "#fecaca",
					"300": "#fca5a5",
					"400": "#f87171",
					"500": "#ef4444",  // Bright red
					"600": "#dc2626",
					"700": "#b91c1c",
					"800": "#991b1b",
					"900": "#7f1d1d",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'ripple': 'ripple 0.6s ease-out'
			},
			backgroundImage: {
				// Teal-based gradients
				'hero-gradient': 'linear-gradient(135deg, #00a67e 0%, #34d399 100%)',
				'hero-gradient-2': 'linear-gradient(135deg, #059669 0%, #00a67e 50%, #34d399 100%)',
				'emerald-gradient': 'linear-gradient(90deg, #ecfdf5 0%, #00a67e 100%)',
				'teal-radial': 'radial-gradient(circle at center, #00a67e 0%, #059669 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(0, 166, 126, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
				// Dark mode gradients
				'dark-hero': 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
				'dark-accent': 'linear-gradient(90deg, rgba(0, 166, 126, 0.2) 0%, rgba(0, 166, 126, 0) 100%)',
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			boxShadow: {
				'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
				'emerald': '0 4px 20px rgba(0, 166, 126, 0.15)',
				'emerald-lg': '0 10px 40px rgba(0, 166, 126, 0.2)',
				'inner-emerald': 'inset 0 2px 4px rgba(0, 166, 126, 0.1)',
				'glow': '0 0 20px rgba(0, 166, 126, 0.3)',
				'glow-lg': '0 0 40px rgba(0, 166, 126, 0.4)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'128': '32rem',
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}