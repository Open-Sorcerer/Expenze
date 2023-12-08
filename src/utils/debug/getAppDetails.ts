type AppDetails = {
  isHermesEnabled: string;
  uiManager: string;
  isNewArchitectureEnabled: string;
  appBundleLoadTime: string;
  jsDevMode: string;
};

export default function getAppDetails(): AppDetails {
  //@ts-expect-error
  const isHermesEnabled = String(!!global.HermesInternal);
  const uiManager =
    //@ts-expect-error
    typeof global?.nativeFabricUIManager === "object" ? "Fabric" : "Paper";

  const isNewArchitectureEnabled = String(uiManager === "Fabric");

  const appBundleLoadTime = String(__BUNDLE_START_TIME__);
  const jsDevMode = String(__DEV__);
  return {
    isHermesEnabled,
    uiManager,
    isNewArchitectureEnabled,
    appBundleLoadTime,
    jsDevMode,
  };
}
