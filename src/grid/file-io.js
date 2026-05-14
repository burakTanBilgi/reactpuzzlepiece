// Browser file I/O for projects: download a project as a .json file, or read
// a user-supplied .json back into a project object. Browser-only — server
// callers operate on the project shape directly.
import { nextProjectId } from './ids.js';

export function exportJSON(project) {
  const data = JSON.stringify(project, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(project.name || 'project').replace(/\s+/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const obj = JSON.parse(e.target.result);
        if (!obj?.grid?.groups || !Array.isArray(obj.grid.groups)) {
          throw new Error('Invalid project file');
        }
        // Re-id the imported project so it doesn't collide with existing ones.
        resolve({ ...obj, id: nextProjectId(), updatedAt: Date.now() });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
