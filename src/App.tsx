import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { motion, type Variants, useReducedMotion, useScroll } from "framer-motion";

import { portfolio } from "@/data/portfolio";

const navItems = ["hero", ...portfolio.nav];
const elegantEase = [0.16, 1, 0.3, 1] as const;
const viewportSettings = { once: true, amount: 0.3 } as const;

type Variant = Variants;

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(max-width: 767px)");
		const update = () => setIsMobile(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	return isMobile;
}

function createMotionVariants(isMobile: boolean) {
	const elegantTransition = { duration: isMobile ? 0.4 : 0.6, ease: elegantEase };

	return {
		fadeUpBlur: {
			hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
			visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: elegantTransition },
		},
		scaleReveal: {
			hidden: { opacity: 0, scale: 0.95 },
			visible: { opacity: 1, scale: 1, transition: elegantTransition },
		},
		staggerContainer: (delayChildren = 0) => ({
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: { staggerChildren: isMobile ? 0.05 : 0.1, delayChildren },
			},
		}),
		slideIn: (direction: "left" | "right") => ({
			hidden: { opacity: 0, x: direction === "left" ? -50 : 50, filter: "blur(4px)" },
			visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: elegantTransition },
		}),
	};
}

function Reveal({ children, variants, delay = 0, className = "" }: { children: ReactNode; variants: Variant; delay?: number; className?: string }) {
	const shouldReduceMotion = useReducedMotion();
	const safeVariants = shouldReduceMotion ? undefined : variants;

	return (
		<motion.div
			initial={shouldReduceMotion ? false : "hidden"}
			whileInView={shouldReduceMotion ? undefined : "visible"}
			viewport={viewportSettings}
			variants={safeVariants}
			transition={{ delay }}
			className={className}
			style={{ willChange: "transform, opacity, filter" }}
		>
			{children}
		</motion.div>
	);
}

function App() {
	const isMobile = useIsMobile();
	const variants = createMotionVariants(isMobile);
	const [activeSection, setActiveSection] = useState("hero");
	const [showNav, setShowNav] = useState(false);
	const { scrollYProgress } = useScroll();

	useEffect(() => {
		const spyObserver = new IntersectionObserver(
			(entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
			{ threshold: 0, rootMargin: "-35% 0px -50% 0px" },
		);

		navItems.forEach((id) => {
			const section = document.getElementById(id);
			if (section) spyObserver.observe(section);
		});

		const handleScroll = () => setShowNav(window.scrollY > 100);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			spyObserver.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<main className="min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
			<motion.div className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-[var(--accent-primary)]" style={{ scaleX: scrollYProgress }} />
			<Navbar activeSection={activeSection} showNav={showNav} />
			<Hero variants={variants} />
			<About variants={variants} />
			<Skills variants={variants} />
			<Projects variants={variants} />
			<Experience variants={variants} isMobile={isMobile} />
			<Testimonials variants={variants} />
			<Contact variants={variants} />
		</main>
	);
}

function Navbar({ activeSection, showNav }: { activeSection: string; showNav: boolean }) {
	return (
		<header className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl transition duration-500 ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<a href="#hero" className="text-sm font-bold tracking-tight">{portfolio.profile.name}</a>
				<div className="hidden items-center gap-6 text-sm font-medium text-[var(--text-secondary)] md:flex">
					{navItems.map((item) => (
						<a key={item} href={`#${item}`} className={`nav-link ${activeSection === item ? "active" : ""}`}>{item === "hero" ? "home" : item}</a>
					))}
				</div>
			</nav>
		</header>
	);
}

function Hero({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	return (
		<section id="hero" className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.profile.caption}</p></Reveal>
			<Reveal variants={variants.fadeUpBlur} delay={0.2}><h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{portfolio.profile.heading}</h1></Reveal>
			<Reveal variants={variants.fadeUpBlur} delay={0.4}><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{portfolio.profile.role}</p></Reveal>
			<Reveal variants={variants.fadeUpBlur} delay={0.6} className="mt-9 flex flex-wrap justify-center gap-3">
				<a className="btn btn-primary" href="#projects">View Work</a>
				<a className="btn btn-secondary" href={`mailto:${portfolio.profile.email}`}>Contact Me</a>
			</Reveal>
		</section>
	);
}

function About({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	return (
		<section id="about" className="section-shell min-h-[80vh]">
			<div className="grid items-center gap-16 md:grid-cols-2">
				<Reveal variants={variants.scaleReveal}><img className="h-[560px] w-full rounded-[2rem] border border-[var(--border-color)] object-cover grayscale will-change-transform" src={portfolio.about.image} alt={portfolio.about.imageAlt} /></Reveal>
				<div>
					<Reveal variants={variants.fadeUpBlur} delay={0.1}><p className="section-label">{portfolio.about.caption}</p></Reveal>
					<Reveal variants={variants.fadeUpBlur} delay={0.2}><h2 className="section-title mt-5">{portfolio.about.heading}</h2></Reveal>
					{portfolio.about.paragraphs.map((paragraph, index) => <Reveal key={paragraph} variants={variants.fadeUpBlur} delay={0.3 + index * 0.1}><p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">{paragraph}</p></Reveal>)}
				</div>
			</div>
		</section>
	);
}

function Skills({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	return (
		<section id="skills" className="section-shell min-h-[70vh]">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.skills.caption}</p><h2 className="section-title mt-5">{portfolio.skills.heading}</h2></Reveal>
			<motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={variants.staggerContainer(0.1)} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{portfolio.skills.items.map((skill) => (
					<motion.article key={skill.title} variants={variants.fadeUpBlur} whileHover={{ scale: 1.05 }} className="rounded-2xl border border-[var(--border-color)] p-8 will-change-transform">
						<h3 className="text-xl font-semibold">{skill.title}</h3><p className="mt-3 text-sm text-[var(--text-secondary)]">{skill.detail}</p>
					</motion.article>
				))}
			</motion.div>
		</section>
	);
}

function Projects({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	return (
		<section id="projects" className="section-shell min-h-[120vh]">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.projects.caption}</p><h2 className="section-title mt-5">{portfolio.projects.heading}</h2></Reveal>
			<div className="mt-12 grid gap-6 md:grid-cols-3">
				{portfolio.projects.items.map((project, index) => (
					<Reveal key={project.title} variants={variants.scaleReveal} delay={index * 0.15}>
						<motion.article whileHover={{ y: -8 }} className="group overflow-hidden rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 transition-shadow hover:shadow-lg will-change-transform">
							<div className="overflow-hidden rounded-[1.1rem]"><img className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 will-change-transform" src={project.image} alt={`${project.title} preview`} /></div>
							<Reveal variants={variants.fadeUpBlur} delay={0.1} className="p-4 transition-transform group-hover:-translate-y-1">
								<p className="text-sm text-[var(--text-secondary)]">Project 0{index + 1} · {project.category}</p><h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
								<div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div>
								<a className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-primary)]" href={project.url} target="_blank" rel="noreferrer">View case study →</a>
							</Reveal>
						</motion.article>
					</Reveal>
				))}
			</div>
		</section>
	);
}

function Experience({ variants, isMobile }: { variants: ReturnType<typeof createMotionVariants>; isMobile: boolean }) {
	return (
		<section id="experience" className="section-shell min-h-screen">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.experience.caption}</p><h2 className="section-title mt-5">{portfolio.experience.heading}</h2></Reveal>
			<div className="relative mt-16 space-y-10 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-px before:bg-[var(--border-color)] md:before:left-1/2">
				{portfolio.experience.items.map((item, index) => {
					const left = index % 2 === 0;
					return <div key={item.role} className="relative grid md:grid-cols-2"><span className="timeline-dot" /><Reveal variants={variants.slideIn(isMobile ? "left" : left ? "left" : "right")} delay={index * 0.15} className={`pl-12 ${left ? "md:pr-12" : "md:col-start-2 md:pl-12"}`}><article className="rounded-2xl border border-[var(--border-color)] p-6"><p className="text-sm text-[var(--text-secondary)]">{item.period}</p><h3 className="mt-3 text-xl font-semibold">{item.role}</h3><p className="mt-1 text-[var(--accent-primary)]">{item.company}</p><p className="mt-4 text-[var(--text-secondary)]">{item.description}</p></article></Reveal></div>;
				})}
			</div>
		</section>
	);
}

function Testimonials({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	const [active, setActive] = useState(1);
	const total = portfolio.testimonials.items.length;
	const visible = [-1, 0, 1].map((offset) => (active + offset + total) % total);

	return (
		<section id="testimonials" className="section-shell min-h-[80vh] text-center">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.testimonials.caption}</p><h2 className="section-title mx-auto mt-5">{portfolio.testimonials.heading}</h2></Reveal>
			<div className="mt-12 grid gap-5 md:grid-cols-3">
				{visible.map((itemIndex) => {
					const item = portfolio.testimonials.items[itemIndex];
					const isActive = itemIndex === active;
					return <motion.article key={item.name} animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.6 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-[var(--border-color)] p-8 text-left will-change-transform"><p className="text-xl leading-8">“{item.quote}”</p><p className="mt-8 font-semibold">{item.name}</p><p className="text-sm text-[var(--text-secondary)]">{item.role}</p></motion.article>;
				})}
			</div>
			<div className="mt-8 flex justify-center gap-3"><button className="btn btn-secondary" type="button" onClick={() => setActive((active - 1 + total) % total)}>Previous</button><button className="btn btn-primary" type="button" onClick={() => setActive((active + 1) % total)}>Next</button></div>
		</section>
	);
}

function Contact({ variants }: { variants: ReturnType<typeof createMotionVariants> }) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const subject = encodeURIComponent(`Project inquiry from ${formData.get("name")}`);
		const body = encodeURIComponent(`${formData.get("message")}\n\nReply to: ${formData.get("email")}`);
		window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`;
	};

	return (
		<section id="contact" className="section-shell grid min-h-[80vh] items-center gap-12 md:grid-cols-2">
			<Reveal variants={variants.fadeUpBlur}><p className="section-label">{portfolio.contact.caption}</p><h2 className="section-title mt-5">{portfolio.contact.heading}</h2><a className="mt-8 inline-flex text-2xl font-semibold text-[var(--accent-primary)]" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a></Reveal>
			<Reveal variants={variants.scaleReveal} delay={0.1}><form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-[var(--border-color)] p-6 md:p-8">
				{portfolio.contact.fields.map((field, index) => <Reveal key={field.id} variants={variants.fadeUpBlur} delay={0.2 + index * 0.1}><label className="mb-5 block text-left"><span className="text-sm font-medium">{field.label}</span>{field.type === "textarea" ? <textarea required name={field.id} rows={5} placeholder={field.placeholder} className="input" /> : <input required name={field.id} type={field.type} placeholder={field.placeholder} className="input" />}</label></Reveal>)}
				<Reveal variants={variants.fadeUpBlur} delay={0.5}><motion.button whileHover={{ scale: 1.02 }} className="btn btn-primary w-full" type="submit">Send Message</motion.button></Reveal>
			</form></Reveal>
		</section>
	);
}

export default App;
