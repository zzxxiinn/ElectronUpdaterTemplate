import { autoUpdater } from "electron-updater";
import { dialog } from "electron";
import ElectronLog from "electron-log";

export function registerUpdaterEvent(): void {
  autoUpdater.autoDownload = false;

  // Emitted when checking if an update has started.
  autoUpdater.on("checking-for-update", () => {
    ElectronLog.info("[updater.checking-for-update] Checking for update...");
  });

  autoUpdater.on("update-available", (info) => {
    ElectronLog.info(`[updater.update-not-available] ${info}`);
    dialog
      .showMessageBox({
        type: "info",
        title: "Found Updates: " + info.version,
        message: "Found updates, do you want update now?",
        buttons: ["Sure", "No"],
      })
      .then((value) => {
        if (value.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on("update-not-available", (info) => {
    ElectronLog.info(`[updater.update-not-available] ${info}`);
    dialog.showMessageBox({
      title: "No Updates",
      message: "Current version is up-to-date.",
    });
  });

  autoUpdater.on("error", (err) => {
    ElectronLog.error(`[updater.update-not-available] ${err}`);
    dialog.showErrorBox(
      "Error: ",
      err == null ? "unknown" : (err.stack || err).toString()
    );
    // dialog.showErrorBox('Error: ', '自动更新出错')
  });

  autoUpdater.on("update-downloaded", (info) => {
    ElectronLog.info("update-downloaded: ", info);
    dialog
      .showMessageBox({
        title: "Install Updates",
        message: "Updates downloaded, application will be quit for update...",
      })
      .then(() => {
        setImmediate(() => autoUpdater.quitAndInstall());
      });
  });
}

// export this to MenuItem click callback
export function checkForUpdates(): void {
  // updater = menuItem
  // updater.enabled = false
  autoUpdater.checkForUpdates();
}
