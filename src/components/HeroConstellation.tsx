import { DIRECTION_ICONS } from "./icons";
import type { Direction } from "@/lib/content";

const POSITIONS = [
  { x: 120, y: 90 },
  { x: 280, y: 70 },
  { x: 340, y: 200 },
  { x: 260, y: 320 },
  { x: 110, y: 310 },
  { x: 60, y: 190 },
];

const CENTER = { x: 200, y: 195 };

export function HeroConstellation({ directions }: { directions: Direction[] }) {
  const nodes = directions.slice(0, 6).map((d, i) => ({ ...d, pos: POSITIONS[i] }));

  return (
    <svg viewBox="0 0 400 400" className="mx-auto h-auto w-full max-w-md" role="img" aria-label="Шесть направлений технопарка">
      <g stroke="var(--color-cyan)" strokeWidth="1.2" opacity="0.55">
        {nodes.map((n) => (
          <line
            key={n.slug}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.pos.x}
            y2={n.pos.y}
            className="constellation-line"
          />
        ))}
      </g>
      <circle cx={CENTER.x} cy={CENTER.y} r="26" fill="var(--color-amber)" />
      <circle cx={CENTER.x} cy={CENTER.y} r="35" fill="none" stroke="white" strokeOpacity="0.18" />
      <text x={CENTER.x} y={CENTER.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-ink)" fontFamily="var(--font-mono)">
        СУ
      </text>
      {nodes.map((n, index) => {
        const Icon = DIRECTION_ICONS[n.icon] ?? DIRECTION_ICONS.code;
        return (
          <g key={n.slug} className="constellation-node" style={{ animationDelay: `${0.12 + index * 0.08}s` }}>
            <circle cx={n.pos.x} cy={n.pos.y} r="31" fill={index % 3 === 0 ? "var(--color-red)" : index % 3 === 1 ? "var(--color-blue)" : "var(--color-violet)"} stroke="white" strokeOpacity="0.24" strokeWidth="1.5" />
            <g transform={`translate(${n.pos.x - 11}, ${n.pos.y - 11})`}>
              <Icon className="h-[22px] w-[22px] text-white" />
            </g>
            <text x={n.pos.x} y={n.pos.y + 45} textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.72" fontFamily="var(--font-mono)">
              {n.code}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
