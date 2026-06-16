export const portfolio = {
	profile: {
		name: "Alex Morgan",
		caption: "Available for full-time roles",
		heading: "Designing Digital Products That Feel Native.",
		role: "Hi, I'm Alex. A Product Designer and Front-end Developer focusing on minimal interfaces and fluid motions.",
		email: "hello@alexdesign.com",
	},
	nav: ["about", "skills", "projects", "experience", "testimonials", "contact"],
	about: {
		caption: "About me",
		heading: "Driven by craft, refined by data.",
		image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
		imageAlt: "Minimal black and white design workspace with laptop and desk objects",
		paragraphs: [
			"I bridge the gap between pure design aesthetics and functional code. For the past 5 years, I’ve built products that scale.",
			"When I'm not tweaking easing curves, I study typography and open-source system design.",
		],
	},
	skills: {
		caption: "Capabilities",
		heading: "Core Tech Stack",
		items: [
			{ title: "Interface Design", detail: "Figma" },
			{ title: "Front-end", detail: "React / Next.js" },
			{ title: "Motion", detail: "Framer Motion" },
			{ title: "Design Systems", detail: "Tokens and components" },
			{ title: "State Management", detail: "Zustand / Redux" },
			{ title: "Semantic HTML/CSS", detail: "Accessible foundations" },
			{ title: "UX Research & Testing", detail: "Interviews and validation" },
			{ title: "Technical Writing", detail: "Clear product docs" },
		],
	},
	projects: {
		caption: "Selected work",
		heading: "Products shaped around speed, clarity, and motion.",
		items: [
			{
				title: "Linear Sync",
				category: "Desktop App Client",
				tags: ["Next.js", "Electron"],
				image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
				url: "https://linear.app/",
			},
			{
				title: "Stripe Analytics Dashboard",
				category: "Web Application",
				tags: ["React", "D3.js"],
				image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
				url: "https://stripe.com/",
			},
			{
				title: "Vercel Extension Platform",
				category: "DevTools",
				tags: ["TypeScript", "API"],
				image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
				url: "https://vercel.com/",
			},
		],
	},
	experience: {
		caption: "Experience",
		heading: "A timeline of product teams, systems, and measurable craft.",
		items: [
			{
				role: "Senior Product Designer",
				company: "Apple Inc.",
				period: "2024 — Present",
				description: "Leading core interaction model for next-gen web apps.",
			},
			{
				role: "Interface Engineer",
				company: "Linear App",
				period: "2022 — 2024",
				description: "Built and optimized the desktop client design system components.",
			},
			{
				role: "Product Designer",
				company: "Stripe",
				period: "2020 — 2022",
				description: "Designed end-to-end checkout flow optimizations globally.",
			},
		],
	},
	testimonials: {
		caption: "Testimonials",
		heading: "Trusted by product leaders who care about detail.",
		items: [
			{
				quote: "Alex has an incredible eye for detail. The interactions he built for our platform feel incredibly snappy and fluid.",
				name: "Sarah Jenkins",
				role: "VP of Product, Linear",
			},
			{
				quote: "Working with Alex was a masterclass in minimalism. He stripped away the noise and focused purely on user value.",
				name: "Marc Edwards",
				role: "Design Director, Stripe",
			},
			{
				quote: "The performance of our new dashboard is unmatched. His motion-first approach keeps our users fully engaged.",
				name: "David Verney",
				role: "Engineering Lead, Vercel",
			},
		],
	},
	contact: {
		caption: "Get in touch",
		heading: "Let's create something native.",
		email: "hello@alexdesign.com",
		fields: [
			{ id: "name", label: "Name", placeholder: "John Doe", type: "text" },
			{ id: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
			{ id: "message", label: "Message", placeholder: "Tell me about your project...", type: "textarea" },
		],
	},
} as const;
