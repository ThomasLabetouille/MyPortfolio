// Une figure numérotée, comme dans un rapport d'essais : planche claire, légende dessous.
export default function Figure({ src, alt, label, caption, width, height, trace = false, eager = false }) {
  return (
    <figure className={trace ? "fig fig-trace" : "fig"}>
      <span className="fig-plate">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
        />
      </span>
      <figcaption><b>{label}</b>{caption}</figcaption>
    </figure>
  );
}
