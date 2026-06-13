export const portfolio = {
	profile: {
		name: "Raka Pratama",
		role: "Frontend Motion Specialist",
		tagline: "Portfolio profesional dengan reveal on scroll yang terarah, cepat, dan mudah dipindai HRD.",
		description:
			"Saya merancang antarmuka web yang menggabungkan struktur konten jelas, scrollspy navigation, dan micro-interaction halus agar setiap pencapaian muncul pada momen yang tepat tanpa membebani pembaca.",
		location: "Jakarta, Indonesia",
		resumeUrl: "/CV.pdf",
	},
	about: {
		title: "Membangun pengalaman digital yang terasa modern, rapi, dan fokus pada outcome.",
		body:
			"Pendekatan saya berangkat dari progressive disclosure: headline tampil lebih dulu, detail mengikuti secara bertahap, lalu CTA hadir sebagai titik aksi. Hasilnya adalah portfolio yang terlihat premium sekaligus efisien untuk proses screening.",
		metrics: [
			{ value: "60fps", label: "Target performa animasi" },
			{ value: "WCAG", label: "Kontras dan aksesibilitas" },
			{ value: "IO API", label: "Reveal ringan via browser native" },
		],
	},
	socials: [
		{ label: "Email", href: "mailto:hello@example.com" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/username" },
		{ label: "GitHub", href: "https://github.com/username" },
	],
	skills: [
		{ name: "Reveal Motion", level: 92, description: "Fade-up, scale-in, blur-in, dan stagger yang konsisten." },
		{ name: "Scrollspy UX", level: 88, description: "Navigasi aktif otomatis sesuai posisi section di viewport." },
		{ name: "React + Tailwind", level: 90, description: "Komponen responsif dengan token visual reusable." },
		{ name: "Accessibility", level: 84, description: "Reduced motion, kontras tinggi, dan fallback aman." },
		{ name: "Design Systems", level: 86, description: "Warna, spacing, typography, dan state interaction terukur." },
		{ name: "Performance", level: 82, description: "Animasi transform/opacity dengan Intersection Observer." },
		{ name: "Micro-interaction", level: 80, description: "Hover lift, ripple, dan ambient shadow profesional." },
		{ name: "Content Strategy", level: 78, description: "Copy portfolio ringkas untuk membantu HRD melakukan scanning." },
	],
	projects: [
		{
			title: "Scrollspy Portfolio System",
			description: "Landing portfolio dengan navbar aktif otomatis, reveal sequence, dan CTA yang diposisikan sebagai conversion point.",
			tags: ["React", "Intersection Observer", "Tailwind"],
			link: "#",
		},
		{
			title: "HRD-Friendly Case Study",
			description: "Template studi kasus yang mengurutkan konteks, peran, proses, dan dampak agar mudah dibaca dalam waktu singkat.",
			tags: ["UX Writing", "Motion", "Design System"],
			link: "#",
		},
		{
			title: "Performance Motion Kit",
			description: "Kumpulan pola animasi berbasis transform dan opacity yang tetap responsif di desktop maupun mobile.",
			tags: ["60fps", "A11y", "Frontend"],
			link: "#",
		},
	],
	experience: [
		{
			role: "Frontend Motion Specialist",
			company: "Independent / Client Projects",
			period: "2024 - Present",
			description: "Mengembangkan portfolio, landing page, dan prototype interaktif dengan reveal on scroll yang terukur dan mudah dikembangkan.",
		},
		{
			role: "UI/UX Designer",
			company: "Digital Product Studio",
			period: "2022 - 2024",
			description: "Menyusun design system, struktur konten, dan interaksi komponen untuk meningkatkan keterbacaan serta konsistensi brand.",
		},
		{
			role: "Web Interface Developer",
			company: "Freelance Projects",
			period: "2020 - 2022",
			description: "Membangun website responsif dengan fokus ke performa, aksesibilitas dasar, dan pengalaman pengguna yang bersih.",
		},
	],
	contact: {
		email: "hello@example.com",
		phone: "+62 812 0000 0000",
		cta: "Siap membuat portfolio Anda lebih meyakinkan untuk HRD dan klien? Mari mulai diskusi.",
	},
} as const;
