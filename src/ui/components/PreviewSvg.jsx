import { useMemo } from 'react';
import { compileProject } from '../../grid/compile.js';
import { computePieceBbox, computePiecePath } from '../../puzzle';

const PAD = 8;

// Read-only SVG thumbnail for a Project. Sized to fit a maxSize box while
// preserving aspect ratio.
export default function PreviewSvg({ project, maxSize = 180 }) {
  const { vbX, vbY, vbW, vbH, paths } = useMemo(() => {
    if (!project) return { vbX: 0, vbY: 0, vbW: 1, vbH: 1, paths: [] };
    const pieces = compileProject(project);
    if (pieces.length === 0) return { vbX: 0, vbY: 0, vbW: 1, vbH: 1, paths: [] };
    const defaultEffect = project.edges?.default?.effect ?? 'puzzle';
    const defaultConfig = project.edges?.default?.config;
    const enriched = pieces.map((p) => ({
      id: p.id,
      d: computePiecePath(p, pieces, defaultEffect, defaultConfig),
      bbox: computePieceBbox(p, pieces, defaultEffect, defaultConfig),
      fill: p.fill,
    }));
    const bbox = enriched.reduce(
      (a, p) => ({
        minX: Math.min(a.minX, p.bbox.minX),
        minY: Math.min(a.minY, p.bbox.minY),
        maxX: Math.max(a.maxX, p.bbox.maxX),
        maxY: Math.max(a.maxY, p.bbox.maxY),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
    return {
      vbX: bbox.minX - PAD,
      vbY: bbox.minY - PAD,
      vbW: bbox.maxX - bbox.minX + PAD * 2,
      vbH: bbox.maxY - bbox.minY + PAD * 2,
      paths: enriched,
    };
  }, [project]);

  if (!project || paths.length === 0) {
    return <div className="preview-svg preview-svg--empty">empty</div>;
  }

  // Fit into maxSize box.
  const ratio = vbW / vbH;
  const w = ratio >= 1 ? maxSize : maxSize * ratio;
  const h = ratio >= 1 ? maxSize / ratio : maxSize;

  return (
    <svg
      className="preview-svg"
      width={w}
      height={h}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((p) => (
        <path key={p.id} d={p.d}
          fill={p.fill || 'var(--surface-2)'}
          stroke="var(--stroke-soft)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
