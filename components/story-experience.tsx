"use client";
/* eslint-disable @next/next/no-img-element -- pre-generated WebP srcsets preserve transparent mural layers without runtime recompression */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AssetName =
  | "deer"
  | "deer-faded"
  | "desert"
  | "riverlands"
  | "foreground"
  | "traveller"
  | "promise-traveller"
  | "rescue-deer"
  | "royal-procession"
  | "cave-wall"
  | "erosion";

const assets: Record<AssetName, { widths: number[]; width: number; height: number }> = {
  deer: { widths: [640, 960, 1145], width: 1145, height: 1374 },
  "deer-faded": { widths: [640, 960, 1145], width: 1145, height: 1374 },
  desert: { widths: [1280, 2048], width: 2048, height: 768 },
  riverlands: { widths: [1080, 1600, 2172], width: 2172, height: 724 },
  foreground: { widths: [1080, 1600, 2172], width: 2172, height: 724 },
  traveller: { widths: [768, 1200, 1536], width: 1536, height: 1024 },
  "promise-traveller": { widths: [480, 768, 1024], width: 1024, height: 1536 },
  "rescue-deer": { widths: [640, 960, 1194], width: 1194, height: 1317 },
  "royal-procession": { widths: [960, 1440, 1931], width: 1931, height: 814 },
  "cave-wall": { widths: [1000, 1672], width: 1672, height: 941 },
  erosion: { widths: [1000, 1672], width: 1672, height: 941 },
};

const chapters = [
  ["00", "Opening", "opening"],
  ["01", "Encounter", "encounter"],
  ["02", "Rescue", "rescue"],
  ["03", "Promise", "promise"],
  ["04", "Betrayal", "betrayal"],
  ["05", "Revelation", "revelation"],
  ["06", "Awakening", "awakening"],
  ["07", "The Price", "price"],
  ["08", "Ascent", "ascent"],
] as const;

function MuralImage({
  name,
  alt,
  className = "",
  sizes = "100vw",
  eager = false,
}: {
  name: AssetName;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const asset = assets[name];
  const srcSet = asset.widths
    .map((width) => `/assets/nine-colored-deer/${name}-${width}.webp ${width}w`)
    .join(", ");

  return (
    <img
      className={className}
      src={`/assets/nine-colored-deer/${name}-${asset.widths.at(-1)}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable="false"
    />
  );
}

const rigBase = "/assets/nine-colored-deer";
const endingBase = `${rigBase}/ending`;

const endingAssets = {
  "traveller-herbalist-drowning.png": [1536, 1024],
  "traveller-herbalist-pointing.png": [1024, 1536],
  "traveller-herbalist-thanking.png": [1024, 1536],
  "arrow-volley.png": [1683, 935],
  "arrows-to-ash.png": [1810, 869],
  "divine-light-halo.png": [1536, 1024],
  "king-and-soldiers-weapons-lowered.png": [1774, 887],
  "traveller-herbalist-falling.png": [1024, 1536],
  "deep-pool-foreground-waves.png": [2172, 724],
  "price-water-background.png": [2172, 724],
  "plunging-traveller.png": [1254, 1254],
  "splash-impact-tall.png": [1024, 1536],
  "splash-foreground-wide.png": [1942, 809],
  "crimson-gold-clouds-foreground.png": [1672, 941],
  "crimson-gold-sky-background.png": [1672, 941],
  "nine-colored-deer-ascending.png": [1145, 1374],
} as const;

type EndingAssetName = keyof typeof endingAssets;

function EndingAsset({ name, className = "", alt = "" }: { name: EndingAssetName; className?: string; alt?: string }) {
  const [width, height] = endingAssets[name];
  return <img className={className} src={`${endingBase}/${name}`} width={width} height={height} alt={alt} loading="lazy" decoding="async" draggable="false" />;
}

function ProcessionRig() {
  return (
    <div className="procession-rig procession-rig--replacement" role="img" aria-label="The pointing traveller leading the king, horse, guards and flag bearers across the desert">
      <img
        className="betrayal-procession-replacement"
        src="/assets/nine-colored-deer/betrayal/04-royal-procession-user-v2.png?v=2"
        width="1931"
        height="814"
        alt=""
        loading="lazy"
        decoding="async"
        draggable="false"
        style={{ display: "block", width: "100%", height: "auto", objectFit: "contain", clipPath: "none" }}
      />
    </div>
  );
}

function Cloud({ number, className }: { number: "one" | "two" | "three" | "four" | "five" | "six"; className: string }) {
  return <img className={className} src={`${rigBase}/cloud-${number}.webp`} alt="" decoding="async" draggable="false" />;
}

function ChapterCopy({
  number,
  title,
  children,
  align = "left",
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={`chapter-copy chapter-copy--${align}`} data-reveal>
      <p className="chapter-copy__eyebrow">
        <span>{number}</span>
        <span aria-hidden="true">—</span>
        {title}
      </p>
      <p className="chapter-copy__body">{children}</p>
    </div>
  );
}

function BotanicalMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true">
      <path d="M80 145C81 92 62 51 26 19M78 111c-26-2-43-17-49-43 27 0 45 13 49 43Zm3 6c27-5 43-22 45-49-26 3-42 20-45 49ZM65 78c-19-6-29-21-27-41 20 5 30 20 27 41Zm5 4c19-9 27-26 21-46-18 9-27 25-21 46Z" />
    </svg>
  );
}

export function StoryExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("opening");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--story-progress", `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    chapters.forEach(([, , id]) => {
      const element = root.querySelector<HTMLElement>(`#${id}`);
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(id);
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
      );
      observer.observe(element);
      cleanups.push(() => observer.disconnect());
    });

    if (!reduceMotion) {
      const ctx = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });
        entrance
          .from(".opening-title__line", { yPercent: 110, opacity: 0, duration: 1.15, stagger: 0.13 }, 0.15)
          .from(".opening-deer__art", { opacity: 0, duration: 1.45, ease: "power2.out" }, 0)
          .from(".opening-meta, .opening__subtitle, .scroll-cue", { opacity: 0, y: 18, duration: 0.8, stagger: 0.1 }, 0.72);

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          const targets = element.tagName === "P" ? element : element.children;
          gsap.from(targets, {
            y: 34,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
          const section = layer.closest<HTMLElement>(".story-section");
          const shiftX = Number(layer.dataset.shiftX ?? 0);
          const shiftY = Number(layer.dataset.shiftY ?? 0);
          if (!section) return;
          gsap.fromTo(
            layer,
            { xPercent: -shiftX * 0.45, yPercent: -shiftY * 0.45 },
            {
              xPercent: shiftX * 0.55,
              yPercent: shiftY * 0.55,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.1 },
            },
          );
        });

        const openingScroll = gsap.timeline({
          scrollTrigger: {
            trigger: "#opening",
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.4)}`,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
        openingScroll
          .fromTo(".opening__desert", { scale: 1.08, yPercent: 6 }, { scale: 1, yPercent: -12, ease: "none" }, 0)
          .fromTo(".opening__river", { scale: 1.14, yPercent: 12 }, { scale: 1, yPercent: -18, ease: "none" }, 0)
          .fromTo(".opening-cloud--one", { xPercent: -5 }, { xPercent: 18, ease: "none" }, 0)
          .fromTo(".opening-cloud--two", { xPercent: 4 }, { xPercent: -14, ease: "none" }, 0)
          .fromTo(".opening-deer__art", { scale: 0.98, xPercent: 0, yPercent: 0 }, { scale: 0.86, xPercent: 12, yPercent: 5, ease: "none" }, 0)
          .to(".opening__content", { yPercent: -28, opacity: 0, ease: "power2.in" }, 0.48)
          .to(".scroll-cue", { opacity: 0, y: 16, ease: "none" }, 0.16);

        const promise = gsap.timeline({
          scrollTrigger: {
            trigger: "#promise .chapter__sticky",
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.05)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 1,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
        promise
          .fromTo(".promise-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, ease: "none" }, 0.05)
          .fromTo(".promise-ring__circle", { strokeDashoffset: 792 }, { strokeDashoffset: 0, ease: "none" }, 0.28)
          .fromTo(".promise-ring", { scale: 0.84 }, { scale: 1, ease: "none" }, 0.28)
          .fromTo(".promise-quote", { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", ease: "power2.out" }, 0.52);

        const compact = window.matchMedia("(max-width: 680px)").matches;

        const revelation = gsap.timeline({
          scrollTrigger: {
            trigger: "#revelation .chapter__sticky",
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        revelation
          .fromTo(".revelation__arrows", { scale: 1.18, opacity: 0.2 }, { scale: 0.9, opacity: 1, duration: 0.34, ease: "none" }, 0)
          .fromTo(".revelation__halo", { scale: 0.25, opacity: 0 }, { scale: 1.08, opacity: 1, duration: 0.3, ease: "power2.out" }, 0.27)
          .to(".revelation__arrows", { opacity: 0, scale: 0.86, duration: 0.08, ease: "none" }, 0.38)
          .fromTo(".revelation__ash", { opacity: 0, yPercent: -3 }, { opacity: 1, yPercent: 4, duration: 0.12, ease: "none" }, 0.38)
          .to(".revelation__ash", { opacity: 0, yPercent: 20, duration: 0.36, ease: "power1.in" }, 0.5)
          .fromTo(".revelation__deer-inner", { xPercent: compact ? -8 : -14 }, { xPercent: compact ? 4 : 11, duration: 0.48, ease: "none" }, 0.48)
          .fromTo(".revelation__tear", { opacity: 0 }, { opacity: 0.9, duration: 0.14 }, 0.68)
          .to(".revelation__soldiers", { opacity: 0, duration: 0.25, ease: "none" }, 0.75);

        gsap.set([".awakening__deer", ".awakening__raised", ".awakening__lowered"], { transformOrigin: "bottom center" });

        const awakening = gsap.timeline({
          scrollTrigger: { trigger: "#awakening .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.2)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: true, invalidateOnRefresh: true },
        });
        awakening
          .fromTo(".awakening__lowered", { xPercent: compact ? 5 : 8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: "none" }, 0.28)
          .fromTo(".awakening__raised", { xPercent: 0, opacity: 1 }, { xPercent: compact ? 6 : 10, opacity: 0, duration: 0.5, ease: "none" }, 0.28)
          .fromTo(".awakening__boundary", { scale: 0.72, opacity: 0, rotate: -8 }, { scale: 1, opacity: 0.8, rotate: 0, duration: 0.48, ease: "power2.out" }, 0.5);

        const price = gsap.timeline({
          scrollTrigger: { trigger: "#price .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.25)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: true, invalidateOnRefresh: true },
        });
        price
          .fromTo(".price__plunge-tall img, .price__plunge-traveller img", { y: compact ? 18 : 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }, 0)
          .fromTo(".price__plunge-wide img", { y: compact ? 14 : 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "none" }, 0.32)
          .to(".price__plunge-traveller img", { y: compact ? 18 : 28, opacity: 0.4, duration: 0.46, ease: "power1.in" }, 0.48)
          .to(".price__plunge-tall img", { y: compact ? 14 : 22, opacity: 0.28, duration: 0.46, ease: "power1.in" }, 0.48);

        const ascent = gsap.timeline({
          scrollTrigger: { trigger: "#ascent .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.35)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: true, invalidateOnRefresh: true },
        });
        ascent
          .fromTo(".ascent__sky", { filter: "saturate(.55) brightness(.55)" }, { filter: "saturate(1) brightness(1)", duration: 0.3, ease: "none" }, 0)
          .fromTo(".ascent__clouds--back", { yPercent: 18, xPercent: -4 }, { yPercent: -4, xPercent: 4, duration: 1, ease: "none" }, 0)
          .fromTo(".ascent__clouds--middle", { yPercent: 25, xPercent: 5 }, { yPercent: -10, xPercent: -5, duration: 1, ease: "none" }, 0)
          .fromTo(".ascent__deer", { yPercent: 34, xPercent: -10, scale: 0.9, opacity: 1 }, { yPercent: -74, xPercent: 8, scale: 0.72, opacity: 0, duration: 0.82, ease: "power1.inOut" }, 0.12)
          .fromTo(".ascent__deer-pigment", { opacity: 0 }, { opacity: 0.72, duration: 0.28 }, 0.48)
          .to(".ascent__deer-pigment", { opacity: 0, yPercent: -62, duration: 0.28 }, 0.7)
          .fromTo(".ascent__clouds--front", { yPercent: 34 }, { yPercent: -2, duration: 0.86, ease: "none" }, 0.1)
          .fromTo(".ascent__closing", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.82);

        const media = gsap.matchMedia();
        const buildMovingScenes = (mobile: boolean) => {
          const encounter = gsap.timeline({
            scrollTrigger: { trigger: "#encounter .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.05)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: 0.4, invalidateOnRefresh: true },
          });
          encounter
            .fromTo(".encounter-deer__inner", { xPercent: mobile ? -82 : -102, yPercent: 9, scale: 0.9 }, { xPercent: mobile ? 76 : 170, yPercent: -5, scale: 1.03, ease: "none" }, 0)
            .fromTo(".encounter__sun", { scale: 0.72, opacity: 0.35 }, { scale: 1.08, opacity: 1, ease: "none" }, 0.1);

          const rescue = gsap.timeline({
            scrollTrigger: { trigger: "#rescue .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.05)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: 0.4, invalidateOnRefresh: true },
          });
          rescue
            .fromTo(".rescue__color-wipe", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
            .fromTo(".rescue-traveller__inner", { xPercent: mobile ? 20 : 28, yPercent: 34, opacity: 0.22, rotate: 4 }, { xPercent: mobile ? -5 : -12, yPercent: -7, opacity: 1, rotate: 0, ease: "power1.out" }, 0.1)
            .fromTo(".rescue-deer__inner", { xPercent: mobile ? -58 : -82, yPercent: 24, opacity: 0.32 }, { xPercent: mobile ? 11 : 18, yPercent: -7, opacity: 1, ease: "power1.out" }, 0.18)
            .fromTo(".rescue-current", { scaleX: 0.35, opacity: 0.12 }, { scaleX: 1.08, opacity: 0.88, ease: "none" }, 0)
            .fromTo(".rescue__foreground", { clipPath: "inset(34% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none" }, 0.16);

          const betrayal = gsap.timeline({
            scrollTrigger: { trigger: "#betrayal .chapter__sticky", start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.05)}`, pin: true, pinSpacing: true, anticipatePin: 1, refreshPriority: 1, scrub: 0.4, invalidateOnRefresh: true },
          });
          betrayal
            .fromTo(".betrayal__red-wipe", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.62, ease: "none" }, 0)
            .fromTo(".procession__inner", { xPercent: mobile ? 42 : 34 }, { xPercent: mobile ? -12 : -8, duration: 0.84, ease: "none" }, 0.08)
            .fromTo(".reward-disc", { scale: 0.25, rotate: -25, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.38, ease: "back.out(1.4)" }, 0.2)
            .fromTo(".betrayal-quote", { x: 0, y: 28, skewX: 0, opacity: 0 }, { x: mobile ? 10 : 26, y: 0, skewX: -5, opacity: 1, duration: 0.42, ease: "power2.inOut" }, 0.54);

        };

        media.add("(min-width: 681px)", () => buildMovingScenes(false));
        media.add("(max-width: 680px)", () => buildMovingScenes(true));

        cleanups.push(() => media.revert());
      }, root);
      cleanups.push(() => ctx.revert());
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--pointer-deer-x", `${x * 15}px`);
      root.style.setProperty("--pointer-deer-y", `${y * 10}px`);
      root.style.setProperty("--pointer-back-x", `${x * -5}px`);
      root.style.setProperty("--pointer-back-y", `${y * -3}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cleanups.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const revisit = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <main className="story-page" ref={rootRef}>
      <a className="skip-link" href="#encounter">Skip to the story</a>

      <header className="story-header" aria-label="Site header">
        <a className="story-mark" href="#opening" aria-label="The Nine-Colored Deer — return to opening">
          <span aria-hidden="true">九</span>
          <span>NINE-COLORED DEER</span>
        </a>
        <p>A PROMISE IN THE DESERT</p>
      </header>

      <nav className="chapter-nav" aria-label="Story chapters">
        <span className="chapter-nav__track" aria-hidden="true"><i /></span>
        <ol>
          {chapters.map(([number, label, id]) => (
            <li key={id}>
              <a href={`#${id}`} className={activeChapter === id ? "is-active" : ""} aria-current={activeChapter === id ? "location" : undefined}>
                <span className="chapter-nav__number">{number}</span>
                <span className="chapter-nav__label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="opening" className="story-section opening" aria-labelledby="opening-title">
        <div className="opening__sticky">
          <div className="opening__sky mural-texture" aria-hidden="true" />
          <Cloud number="one" className="opening-cloud opening-cloud--one" />
          <Cloud number="four" className="opening-cloud opening-cloud--two" />
          <div className="opening__desert pointer-back">
            <MuralImage name="desert" alt="" sizes="100vw" eager />
          </div>
          <div className="opening__river pointer-back">
            <MuralImage name="riverlands" alt="" sizes="100vw" eager />
          </div>
          <div className="opening-deer pointer-deer">
            <MuralImage name="deer" className="opening-deer__art" alt="A radiant nine-colored deer overlooking the desert and river" sizes="(max-width: 680px) 90vw, 62vw" eager />
          </div>
          <div className="opening__vignette" aria-hidden="true" />
          <div className="opening__content">
            <p className="opening-meta">DUNHUANG · AN INTERACTIVE TALE</p>
            <h1 id="opening-title" className="opening-title" aria-label="The Nine-Colored Deer">
              <span><i className="opening-title__line">THE NINE-</i></span>
              <span><i className="opening-title__line">COLORED DEER</i></span>
            </h1>
            <div className="opening__subtitle">
              <p>A Promise in the Desert</p>
              <p>An interactive tale inspired by the murals of Dunhuang</p>
            </div>
          </div>
          <a className="scroll-cue" href="#encounter">
            <span>Scroll to begin</span>
            <i aria-hidden="true" />
          </a>
          <span className="folio folio--light">000—001</span>
        </div>
      </section>

      <section id="encounter" className="story-section chapter encounter" aria-labelledby="encounter-heading">
        <div className="chapter__sticky">
          <div className="chapter-number" aria-hidden="true">01</div>
          <div className="encounter__sun" aria-hidden="true" />
          <div className="encounter__desert" data-parallax data-shift-x="-3" data-shift-y="-4">
            <MuralImage name="desert" alt="A mineral-pigment desert crossed by a turquoise river" sizes="100vw" />
          </div>
          <div className="encounter__river" data-parallax data-shift-x="-8" data-shift-y="-10">
            <MuralImage name="riverlands" alt="Weathered river, mountains, trees and reeds painted as a mural landscape" sizes="100vw" />
          </div>
          <div className="encounter-deer">
            <div className="encounter-deer__inner">
              <MuralImage name="deer" alt="The nine-colored deer moving freely through the ancient landscape" sizes="(max-width: 760px) 56vw, 34vw" />
            </div>
          </div>
          <div className="encounter__foreground" data-parallax data-shift-x="-12" data-shift-y="-13">
            <MuralImage name="foreground" alt="" sizes="100vw" />
          </div>
          <ChapterCopy number="01" title="THE ENCOUNTER">
            <span id="encounter-heading">Across an ancient landscape, a radiant deer moved between the forest and the river—seen by few, owned by no one.</span>
          </ChapterCopy>
          <span className="folio">002—003</span>
        </div>
      </section>

      <section id="rescue" className="story-section chapter rescue" aria-labelledby="rescue-heading">
        <div className="chapter__sticky">
          <div className="rescue__color-wipe" aria-hidden="true" />
          <div className="chapter-number" aria-hidden="true">02</div>
          <div className="rescue__land" data-parallax data-shift-x="4" data-shift-y="-4">
            <MuralImage name="riverlands" alt="A turquoise river landscape in Dunhuang mural colors" sizes="100vw" />
          </div>
          <div className="rescue-current" aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <div className="rescue-traveller">
            <div className="rescue-traveller__inner">
              <EndingAsset name="traveller-herbalist-drowning.png" alt="The herb gatherer reaching from turbulent turquoise water" />
            </div>
          </div>
          <div className="rescue-deer">
            <div className="rescue-deer__inner">
              <MuralImage name="rescue-deer" alt="The nine-colored deer leaning into the current to rescue the traveller" sizes="(max-width: 760px) 58vw, 36vw" />
            </div>
          </div>
          <div className="rescue__foreground" data-parallax data-shift-x="-10" data-shift-y="-13">
            <MuralImage name="foreground" alt="" sizes="100vw" />
          </div>
          <ChapterCopy number="02" title="THE RESCUE" align="right">
            <span id="rescue-heading">When a traveller was swept beneath the water, the deer entered the current and carried him safely to shore.</span>
          </ChapterCopy>
          <span className="folio folio--light">004—005</span>
        </div>
      </section>

      <section id="promise" className="story-section chapter promise" aria-labelledby="promise-heading">
        <div className="chapter__sticky">
          <div className="promise__halo" aria-hidden="true" />
          <Cloud number="six" className="promise-cloud" />
          <div className="promise-deer">
            <MuralImage name="deer" alt="The nine-colored deer facing the traveller after the rescue" sizes="(max-width: 760px) 45vw, 31vw" />
          </div>
          <div className="promise-traveller">
            <EndingAsset name="traveller-herbalist-thanking.png" alt="The rescued herb gatherer thanking the nine-colored deer and giving his word" />
          </div>
          <span className="promise-line" aria-hidden="true" />
          <svg className="promise-ring" viewBox="0 0 300 300" aria-hidden="true">
            <circle className="promise-ring__circle" cx="150" cy="150" r="126" />
            <circle className="promise-ring__core" cx="150" cy="150" r="7" />
            <path d="M150 15v22M150 263v22M15 150h22M263 150h22" />
          </svg>
          <ChapterCopy number="03" title="THE PROMISE">
            <span id="promise-heading">The deer asked for nothing but silence: never reveal where I live. The traveller gave his word.</span>
          </ChapterCopy>
          <p className="promise-quote">“Never reveal where I live.”</p>
          <BotanicalMark className="promise-botanical" />
          <span className="folio folio--light">006—007</span>
        </div>
      </section>

      <section id="betrayal" className="story-section chapter betrayal" aria-labelledby="betrayal-heading">
        <div className="chapter__sticky">
          <div className="betrayal__red-wipe" aria-hidden="true" />
          <div className="chapter-number" aria-hidden="true">04</div>
          <div className="betrayal__terrain" data-parallax data-shift-x="-5" data-shift-y="-4">
            <MuralImage name="desert" alt="" sizes="100vw" />
          </div>
          <div className="reward-disc" aria-hidden="true"><span>賞</span></div>
          <div className="procession">
            <div className="procession__inner">
              <ProcessionRig />
            </div>
          </div>
          <ChapterCopy number="04" title="THE BETRAYAL" align="right">
            <span id="betrayal-heading">When the king offered gold for the mysterious deer, the traveller abandoned his promise and betrayed the one who had saved him.</span>
          </ChapterCopy>
          <p className="betrayal-quote">At the glint of gold,<br />a promise turned to dust.</p>
          <span className="folio folio--light">008—009</span>
        </div>
      </section>

      <section id="revelation" className="story-section chapter revelation" aria-labelledby="revelation-heading">
        <div className="chapter__sticky">
          <div className="revelation__mineral-wash" aria-hidden="true" />
          <div className="chapter-number" aria-hidden="true">05</div>
          <div className="revelation__soldiers revelation__soldiers--left" aria-hidden="true"><MuralImage name="royal-procession" alt="" sizes="70vw" /></div>
          <div className="revelation__soldiers revelation__soldiers--right" aria-hidden="true"><MuralImage name="royal-procession" alt="" sizes="70vw" /></div>
          <div className="revelation__arrows" aria-hidden="true"><EndingAsset name="arrow-volley.png" /></div>
          <div className="revelation__halo" aria-hidden="true"><EndingAsset name="divine-light-halo.png" /></div>
          <div className="revelation__ash" aria-hidden="true"><EndingAsset name="arrows-to-ash.png" /></div>
          <div className="revelation__deer">
            <div className="revelation__deer-inner">
              <MuralImage name="deer" alt="The Nine-Colored Deer standing calmly as sacred light stops the arrows" sizes="(max-width: 760px) 62vw, 35vw" />
              <i className="revelation__tear" aria-hidden="true" />
            </div>
          </div>
          <ChapterCopy number="05" title="THE REVELATION">
            <span id="revelation-heading">As a storm of arrows darkened the sky, sacred light burst from the Nine-Colored Deer, turning every arrow to ash. Unafraid, the deer walked toward the king and, through tears, revealed how the traveller had twice turned its mercy against it.</span>
          </ChapterCopy>
          <p className="revelation__headline">No arrow could pierce<br />the sacred light.</p>
          <span className="folio folio--light">010—011</span>
        </div>
      </section>

      <section id="awakening" className="story-section chapter awakening" aria-labelledby="awakening-heading">
        <div className="chapter__sticky">
          <div className="chapter-number" aria-hidden="true">06</div>
          <div className="awakening__boundary" aria-hidden="true" />
          <div className="awakening__deer"><MuralImage name="deer" alt="The sacred deer standing still within the king's protective boundary" sizes="(max-width: 760px) 57vw, 32vw" /></div>
          <div className="awakening__army">
            <div className="awakening__raised" aria-hidden="true"><MuralImage name="royal-procession" alt="" sizes="82vw" /></div>
            <div className="awakening__lowered"><EndingAsset name="king-and-soldiers-weapons-lowered.png" alt="The humbled king and soldiers lowering their weapons" /></div>
          </div>
          <ChapterCopy number="06" title="THE AWAKENING" align="right">
            <span id="awakening-heading">Shaken by the truth, the king and his soldiers lowered their weapons in shame. He ordered the army to withdraw and decreed that no one should ever hunt the sacred deer again.</span>
          </ChapterCopy>
          <p className="awakening__headline">The weapons fell.<br />Mercy remained.</p>
          <span className="folio folio--light">012—013</span>
        </div>
      </section>

      <section id="price" className="story-section chapter price" aria-labelledby="price-heading">
        <div className="chapter__sticky">
          <div className="chapter-number" aria-hidden="true">07</div>
          <div className="price__land" aria-hidden="true"><MuralImage name="riverlands" alt="" sizes="100vw" /></div>
          <div className="price__water-back" aria-hidden="true" />
          <div className="price__distant-deer" aria-hidden="true"><MuralImage name="deer" alt="" sizes="22vw" /></div>
          <div className="price__water-front" aria-hidden="true"><EndingAsset name="price-water-background.png" /></div>
          <div className="price__plunge-layer price__plunge-tall" aria-hidden="true"><EndingAsset name="splash-impact-tall.png" /></div>
          <div className="price__plunge-layer price__plunge-traveller"><EndingAsset name="plunging-traveller.png" alt="The betrayer plunging backward into the deep pool" /></div>
          <div className="price__plunge-layer price__plunge-wide" aria-hidden="true"><EndingAsset name="splash-foreground-wide.png" /></div>
          <ChapterCopy number="07" title="THE PRICE OF BETRAYAL">
            <span id="price-heading">Terrified, the betrayer stumbled into the very waters from which he had once been saved. He struggled and cried out—but this time, no rescue came. The depths closed over him, and betrayal claimed its price.</span>
          </ChapterCopy>
          <p className="price__headline">The waters remembered<br />what he had forgotten.</p>
          <span className="folio folio--light">014—015</span>
        </div>
      </section>

      <section id="ascent" className="story-section chapter ascent" aria-labelledby="ascent-heading">
        <div className="chapter__sticky">
          <div className="chapter-number" aria-hidden="true">08</div>
          <div className="ascent__sky"><EndingAsset name="crimson-gold-sky-background.png" alt="A crimson and gold Dunhuang-style sky glowing over the desert" /></div>
          <div className="ascent__clouds ascent__clouds--back" aria-hidden="true"><EndingAsset name="crimson-gold-clouds-foreground.png" /></div>
          <div className="ascent__clouds ascent__clouds--middle" aria-hidden="true"><EndingAsset name="crimson-gold-clouds-foreground.png" /></div>
          <div className="ascent__deer"><EndingAsset name="nine-colored-deer-ascending.png" alt="The sorrowful Nine-Colored Deer ascending into the glowing clouds" /></div>
          <div className="ascent__deer ascent__deer-pigment" aria-hidden="true"><EndingAsset name="nine-colored-deer-ascending.png" /></div>
          <div className="ascent__clouds ascent__clouds--front" aria-hidden="true"><EndingAsset name="crimson-gold-clouds-foreground.png" /></div>
          <ChapterCopy number="08" title="THE ASCENT" align="right">
            <span id="ascent-heading">Beneath a crimson and golden sky, the Nine-Colored Deer vanished into the clouds—wounded by betrayal, yet still mourning the life it could not save.</span>
          </ChapterCopy>
          <p className="ascent__headline">Kindness outlived<br />betrayal.</p>
          <div className="ascent__closing">
            <p>Inspired by the Deer King Jātaka of Mogao Cave 257 and the 1981 animated film <em>A Deer of Nine Colors</em>.</p>
            <button type="button" onClick={revisit}><span>Revisit the story</span><i aria-hidden="true">↑</i></button>
          </div>
          <span className="folio folio--light">016—017</span>
        </div>
      </section>

      <footer className="story-footer">
        <p>Interactive interpretation inspired by the Deer King Jātaka of Mogao Cave 257 and the 1981 animated film <em>A Deer of Nine Colors</em>.</p>
        <dl>
          <div><dt>Project</dt><dd>Interactive narrative</dd></div>
          <div><dt>Story</dt><dd>Dunhuang mural tale</dd></div>
          <div><dt>Visual direction</dt><dd>Mural × editorial</dd></div>
          <div><dt>Development</dt><dd>React · GSAP</dd></div>
          <div><dt>Year</dt><dd>2026</dd></div>
        </dl>
        <div className="story-footer__end">
          <span>九色鹿</span>
          <span>VISUAL STORYTELLING · RESPONSIVE DESIGN · CROSS-CULTURAL COMMUNICATION</span>
        </div>
      </footer>
    </main>
  );
}
