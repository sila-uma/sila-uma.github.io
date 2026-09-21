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
    <svg viewBox="0 0 400 400" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Шесть направлений технопарка">
      <g stroke="var(--color-amber)" strokeWidth="1" opacity="0.5">
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
      <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="var(--color-ink-soft)" stroke="var(--color-amber)" strokeWidth="1.5" />
      <text x={CENTER.x} y={CENTER.y + 4} textAnchor="middle" fontSize="8" fill="var(--color-amber)" fontFamily="var(--font-mono)">
        СУ
      </text>
      {nodes.map((n) => {
        const Icon = DIRECTION_ICONS[n.icon] ?? DIRECTION_ICONS.code;
        return (
          <g key={n.slug}>
            <circle cx={n.pos.x} cy={n.pos.y} r="28" fill="var(--color-ink)" stroke="var(--color-amber)" strokeWidth="1.25" />
            <g transform={`translate(${n.pos.x - 11}, ${n.pos.y - 11})`}>
              <Icon className="w-[22px] h-[22px] text-amber-400" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
