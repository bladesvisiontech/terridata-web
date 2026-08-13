"use client";

import { useReducedMotion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_VIDEO } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Video de apertura.
 *
 * ── Por qué arranca en silencio ───────────────────────────────────
 *
 * Ningún navegador actual reproduce solo un video **con sonido**. Es
 * política de la plataforma, no una limitación del código: Chrome,
 * Safari y Firefox exigen o bien silencio, o bien un gesto previo del
 * usuario sobre el dominio. Un `<video autoplay>` sin `muted` no baja
 * el volumen: sencillamente **no arranca**.
 *
 * Así que arranca en silencio —que es lo que sí garantiza que se
 * reproduzca— y el sonido queda a un toque, con un control visible y
 * rotulado. Es la única forma de tener las dos cosas.
 *
 * ── Por qué hay botón de pausa ────────────────────────────────────
 *
 * La WCAG (2.2.2) obliga a ofrecer una forma de detener cualquier
 * contenido que se mueva solo durante más de cinco segundos. Este
 * dura ochenta y tres.
 *
 * Con `prefers-reduced-motion` no arranca solo: se queda en el
 * fotograma de póster con el botón de reproducir a la vista.
 */
export function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Arranque. Se separa del render para poder capturar el rechazo:
  // si el navegador bloquea la reproducción, el estado tiene que
  // reflejarlo o el botón mostraría «pausar» sobre un video parado.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    video.muted = true;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [reduceMotion]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const next = !video.muted;
    video.muted = next;
    setMuted(next);

    // Activar el sonido es un gesto del usuario, así que aquí sí se
    // puede arrancar si estaba parado.
    if (!next && video.paused) {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  }, []);

  return (
    <figure className={cn("relative", className)}>
      <video
        ref={videoRef}
        // `playsInline` evita que iOS lo abra a pantalla completa.
        playsInline
        loop
        muted
        preload="metadata"
        poster={HERO_VIDEO.poster}
        aria-label={HERO_VIDEO.description}
        className="notch-br block w-full rounded-2xl bg-green-900 shadow-[0_24px_60px_-24px_rgba(11,8,17,0.35)]"
      >
        <source src={HERO_VIDEO.src} type="video/mp4" />
        {HERO_VIDEO.fallback}
      </video>

      {/* Controles. Van sobre el video, abajo a la derecha, con área
          táctil de 44 px y fondo propio para leerse sobre cualquier
          fotograma. */}
      <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-4 sm:right-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pausar el video" : "Reproducir el video"}
          className={cn(
            "inline-flex size-11 cursor-pointer items-center justify-center rounded-full",
            "bg-ink/55 text-cream-50 backdrop-blur-sm",
            "transition-colors duration-(--duration-fast) hover:bg-ink/75",
          )}
        >
          {playing ? (
            <Pause aria-hidden strokeWidth={2} className="size-4" />
          ) : (
            <Play aria-hidden strokeWidth={2} className="size-4" />
          )}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Activar el sonido del video" : "Silenciar el video"}
          className={cn(
            "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4",
            "text-[0.8125rem] font-semibold backdrop-blur-sm",
            "transition-colors duration-(--duration-fast)",
            muted
              ? "bg-cream-50 text-green-900 hover:bg-cream-200"
              : "bg-ink/55 text-cream-50 hover:bg-ink/75",
          )}
        >
          {muted ? (
            <VolumeX aria-hidden strokeWidth={2} className="size-4" />
          ) : (
            <Volume2 aria-hidden strokeWidth={2} className="size-4" />
          )}
          {/* La etiqueta solo cuando está en silencio: es cuando hay
              algo que pedirle al usuario. */}
          {muted ? <span>Activar sonido</span> : null}
        </button>
      </div>
    </figure>
  );
}
