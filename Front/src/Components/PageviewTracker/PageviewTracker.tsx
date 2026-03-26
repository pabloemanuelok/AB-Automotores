"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/utils/analytics";

const PageviewTracker: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("pageviews");
  }, [pathname]);

  return null;
};

export default PageviewTracker;
