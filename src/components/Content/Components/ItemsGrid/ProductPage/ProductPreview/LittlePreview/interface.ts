export interface LittlePreviewProps {
  gallery: string[],
  switchProductPreview: SwitchFunc,
}

interface SwitchFunc {
  (newMainPreview: string): void;
}
