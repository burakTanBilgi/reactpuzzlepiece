import { useRef } from 'react';

// Boilerplate-killer for "hidden <input type=file> + click-a-button to open it"
// — a pattern repeated across BackgroundsPanel, ContentPanel, and the Grid
// page's CSV importer. Spread `inputProps` onto the hidden input and call
// `open()` from the visible button.
//
// The change handler reads the first file, then clears the input value so
// the same file can be picked again immediately afterwards.
export function useFileInput(onFile) {
  const ref = useRef(null);
  const open = () => ref.current?.click();
  const onChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) onFile(file);
  };
  return { inputProps: { ref, onChange }, open };
}
