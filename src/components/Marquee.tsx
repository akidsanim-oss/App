const words = [
  'Collaboration',
  'Creativity',
  'Technology',
  'Brand Identity',
  'Websites',
  'Apps',
  'Custom Platforms',
  'E-commerce',
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="display px-6 text-[clamp(1.6rem,4.2vw,3.2rem)] text-ink">{w}</span>
          <span className="text-[clamp(1rem,2.4vw,1.8rem)] text-ink/50">✳</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-host relative overflow-hidden border-y border-ink/15 bg-ember py-4 select-none md:py-5">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
