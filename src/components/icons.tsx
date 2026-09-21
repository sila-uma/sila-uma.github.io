type IconProps = { className?: string };

// Small line-icon set for the six directions + a shared stroke style.
// Kept intentionally simple — technical / blueprint line-work rather than filled glyphs.

export function DroneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="3.2" />
      <path d="M9 9 L13.5 13.5 M23 9 L18.5 13.5 M9 23 L13.5 18.5 M23 23 L18.5 18.5" />
      <circle cx="9" cy="9" r="2.6" />
      <circle cx="23" cy="9" r="2.6" />
      <circle cx="9" cy="23" r="2.6" />
      <circle cx="23" cy="23" r="2.6" />
    </svg>
  );
}

export function RobotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="12" width="16" height="12" rx="2" />
      <path d="M16 12 V7 M13 7 h6" />
      <circle cx="16" cy="5.5" r="1.5" />
      <circle cx="12.5" cy="17.5" r="1.4" />
      <circle cx="19.5" cy="17.5" r="1.4" />
      <path d="M8 17 H4 M24 17 h4" />
    </svg>
  );
}

export function CubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 6 L26 11.5 V21.5 L16 27 L6 21.5 V11.5 Z" />
      <path d="M16 6 V16 M6 11.5 L16 16 L26 11.5 M16 16 V27" />
    </svg>
  );
}

export function LaserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="8" height="8" rx="1.5" />
      <path d="M12 10 H27" strokeDasharray="1.5 2.5" />
      <path d="M25 6 L29 10 L25 14" />
    </svg>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 9 L4.5 16 L11 23 M21 9 L27.5 16 L21 23" />
      <path d="M18 7 L14 25" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="10" width="20" height="14" rx="2" />
      <circle cx="14" cy="17" r="4.5" />
      <path d="M9 10 L11 7 H17 L19 10" />
      <path d="M24 14 L28 12 V22 L24 20" />
    </svg>
  );
}

export const DIRECTION_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  drone: DroneIcon,
  robot: RobotIcon,
  cube: CubeIcon,
  laser: LaserIcon,
  code: CodeIcon,
  camera: CameraIcon,
};
