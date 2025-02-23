'use client';

import { useState } from 'react';

export default function useModal(defaultOpen?: boolean): {
  opened: boolean;
  openPopup: () => void;
  closePopup: () => void;
} {
  const [opened, setOpened] = useState(defaultOpen || false);

  const openPopup = (): void => {
    setOpened(true);
  };

  const closePopup = (): void => {
    setOpened(false);
  };

  return {
    opened,
    openPopup,
    closePopup,
  };
}
