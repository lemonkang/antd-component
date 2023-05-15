import { useMemo } from "react";

const useBrowserInfo = () => {
  return useMemo(() => {
    const navigator = window.navigator.userAgent.toLowerCase();
    const browserVersionChecker = browserVersionMatch(navigator);
    let browser: "chrome" | "edg" | "safari" | "firefox" | "android" = "chrome";
    let version: number = -1;
    if (navigator.includes("android")) {
      browser = "android";
    } else if (navigator.includes("safari") && !navigator.includes("chrome")) {
      browser = "safari";
      version = browserVersionChecker("version");
    } else if (navigator.includes("firefox")) {
      browser = "firefox";
      version = browserVersionChecker(browser);
    } else if (navigator.includes("edg")) {
      browser = "edg";
      version = browserVersionChecker(browser);
    } else {
      version = browserVersionChecker("chrome");
    }
    return {
      browser,
      version,
      isMobile: isMobile(navigator),
    };
  }, []);
};

const browserVersionMatch = (info: string) => (browser: string) => {
  const reg = new RegExp(`${browser}/(\\d+)`);
  const match = info.match(reg);
  const version = Number(match?.[1]);
  if (version > 0) {
    return version;
  }
  return -1;
};

const isMobile = (info: string) => {
  return info.includes("mobile");
};

export default useBrowserInfo;
