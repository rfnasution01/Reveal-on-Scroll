import { type CSSProperties, useEffect, useState } from "react";

import { portfolio } from "@/data/portfolio";

const navItems = ["hero", "about", "skills", "projects", "experience", "contact"];

function App() {
	const [activeSection, setActiveSection] = useState("hero");
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-revealed");
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
		);

		document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

		const spyObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveSection(entry.target.id);
				});
			},
			{ threshold: 0, rootMargin: "-30% 0px -50% 0px" },
		);

		navItems.forEach((id) => {
			const section = document.getElementById(id);
			if (section) spyObserver.observe(section);
		});

		const handleScroll = () => setHasScrolled(window.scrollY > 8);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			revealObserver.disconnect();
			spyObserver.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<main className="min-h-screen overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
			<Navbar activeSection={activeSection} hasScrolled={hasScrolled} />
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Contact />
		</main>
	);
}

function Navbar({ activeSection, hasScrolled }: { activeSection: string; hasScrolled: boolean }) {
	return (
		<header className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl transition duration-500 ${hasScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a href="#hero" className="font-heading text-sm font-extrabold tracking-tight text-white md:text-base">
					{portfolio.profile.name}
				</a>
				<div className="hidden gap-6 text-sm font-medium text-[#94A3B8] sm:flex">
					{navItems.map((item) => (
						<a key={item} href={`#${item}`} className={`nav-link ${activeSection === item ? "active" : ""}`}>
							{item === "hero" ? "home" : item}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}

function Hero() {
	return (
		<section id="hero" className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.12fr_0.88fr]">
			<div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6366F1]/25 blur-3xl" />
			<div>
				<p data-reveal="fade-up" className="section-label">{portfolio.profile.role}</p>
				<h1 data-reveal="blur-in" className="font-heading mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-[64px] md:leading-[1.05]">
					{portfolio.profile.tagline}
				</h1>
				<p data-reveal="fade-up" style={{ transitionDelay: "150ms" }} className="mt-6 max-w-2xl text-base leading-8 text-[#94A3B8] md:text-lg">
					{portfolio.profile.description}
				</p>
				<div data-reveal="fade-up" style={{ transitionDelay: "250ms" }} className="mt-8 flex flex-wrap gap-4">
					<a className="btn btn-primary" href="#projects">Lihat proyek</a>
					<a className="btn btn-secondary" href={portfolio.profile.resumeUrl}>Unduh CV</a>
				</div>
			</div>
			<aside data-reveal="scale-in" className="surface-card p-8">
				<p className="text-sm font-medium uppercase tracking-[0.3em] text-[#94A3B8]">Siap untuk</p>
				<h2 className="font-heading mt-4 text-3xl font-bold leading-tight">Kolaborasi produk digital, portfolio review, dan kesempatan full-time.</h2>
				<div className="mt-8 grid gap-3 text-[#94A3B8]">
					<p>{portfolio.profile.location}</p>
					{portfolio.socials.map((social) => (
						<a key={social.label} href={social.href} className="transition hover:text-[#10B981]">{social.label} →</a>
					))}
				</div>
			</aside>
		</section>
	);
}

function About() {
	return (
		<section id="about" className="section-shell">
			<p data-reveal="fade-up" className="section-label">About</p>
			<div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
				<div data-reveal="slide-right" className="surface-card flex min-h-80 items-end p-7">
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-[#10B981]">Progressive disclosure</p>
						<h2 className="font-heading mt-4 text-3xl font-bold">Motion yang membantu HRD memindai informasi secara bertahap.</h2>
					</div>
				</div>
				<div data-reveal="slide-left">
					<h2 className="section-title">{portfolio.about.title}</h2>
					<p className="mt-6 text-lg leading-8 text-[#94A3B8]">{portfolio.about.body}</p>
					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						{portfolio.about.metrics.map((metric) => (
							<div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
								<strong className="font-heading text-3xl text-white">{metric.value}</strong>
								<p className="mt-2 text-sm text-[#94A3B8]">{metric.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function Skills() {
	return (
		<section id="skills" className="section-shell">
			<p data-reveal="fade-up" className="section-label">Skills</p>
			<h2 data-reveal="fade-up" className="section-title mt-6">Tooling dan kemampuan yang relevan untuk portfolio modern.</h2>
			<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
				{portfolio.skills.map((skill, index) => (
					<div key={skill.name} data-reveal="scale-in" style={{ transitionDelay: `${index * 50}ms` }} className="surface-card skill-card p-5">
						<h3 className="font-heading text-xl font-semibold">{skill.name}</h3>
						<p className="mt-3 text-sm leading-6 text-[#94A3B8]">{skill.description}</p>
						<div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
							<div className="skill-bar h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#10B981]" style={{ "--skill-level": `${skill.level}%` } as CSSProperties} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function Projects() {
	return (
		<section id="projects" className="border-y border-white/10 bg-white/[0.03]">
			<div className="section-shell">
				<p data-reveal="fade-up" className="section-label">Projects</p>
				<h2 data-reveal="fade-up" className="section-title mt-6">Selected work dengan fokus dampak, struktur, dan interaksi.</h2>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{portfolio.projects.map((project, index) => (
						<a key={project.title} href={project.link} data-reveal="scale-in" style={{ transitionDelay: `${index * 80}ms` }} className="project-card surface-card p-6">
							<p className="text-sm font-medium text-[#10B981]">0{index + 1}</p>
							<h3 className="font-heading mt-4 text-2xl font-semibold">{project.title}</h3>
							<p className="mt-4 text-sm leading-6 text-[#94A3B8]">{project.description}</p>
							<div className="mt-6 flex flex-wrap gap-2">
								{project.tags.map((tag) => <span key={tag} className="badge">{tag}</span>)}
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function Experience() {
	return (
		<section id="experience" className="section-shell">
			<p data-reveal="fade-up" className="section-label">Experience</p>
			<h2 data-reveal="fade-up" className="section-title mt-6">Rekam jejak yang disusun kronologis dan mudah dipindai.</h2>
			<div className="relative mt-12 space-y-8 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-white/10 md:before:left-1/2">
				{portfolio.experience.map((item, index) => (
					<div key={`${item.role}-${item.company}`} data-reveal="fade-up" style={{ transitionDelay: `${index * 100}ms` }} className="relative grid gap-6 md:grid-cols-2">
						<div className={`pl-12 md:pl-0 ${index % 2 ? "md:col-start-2 md:pl-12" : "md:pr-12"}`}>
							<span className="timeline-dot" />
							<div className="surface-card p-6">
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="font-heading text-xl font-semibold">{item.role}</h3>
										<p className="text-[#10B981]">{item.company}</p>
									</div>
									<span className="text-sm text-[#94A3B8]">{item.period}</span>
								</div>
								<p className="mt-4 text-[#94A3B8]">{item.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function Contact() {
	return (
		<section id="contact" className="section-shell">
			<div data-reveal="scale-in" className="rounded-[2rem] bg-gradient-to-br from-[#6366F1] to-[#10B981] p-8 text-white shadow-2xl shadow-[#6366F1]/20 md:p-12">
				<p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Contact</p>
				<h2 className="font-heading mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">{portfolio.contact.cta}</h2>
				<div className="mt-8 flex flex-wrap gap-4">
					<a className="btn bg-[#0F172A] text-white hover:shadow-[#0F172A]/30" href={`mailto:${portfolio.contact.email}`}>Email saya</a>
					<a className="btn border border-white/40 text-white" href={`tel:${portfolio.contact.phone}`}>{portfolio.contact.phone}</a>
				</div>
			</div>
		</section>
	);
}

export default App;
