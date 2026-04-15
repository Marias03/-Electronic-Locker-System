"use client";

import { useEffect, useState } from "react";
import "../../i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}
