import { useEffect, useState } from "react";

interface AutoSaveProps<T> {
  data: T;
  onSave: () => Promise<void>;
  delay?: number;
  shouldSave?: boolean; // New condition for enabling auto-save
}

const useAutoSave = <T>({
  data,
  onSave,
  delay = 2000,
  shouldSave = true,
}: AutoSaveProps<T>) => {
  const [savedData, setSavedData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!shouldSave || JSON.stringify(data) === JSON.stringify(savedData))
      return;

    setIsSaving(true);
    const handler = setTimeout(async () => {
      await onSave();
      setSavedData(data);
      setIsSaving(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [data, savedData, delay, onSave, shouldSave]);

  return { isSaving };
};

export default useAutoSave;
