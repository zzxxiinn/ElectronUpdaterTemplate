import { autoUpdater } from "electron-updater";
import ElectronLog from "electron-log";
import { app } from "electron";

export function registerUpdaterEvent(): void {
  const log = ElectronLog.create("updaterLogger");
  log.transports.file.fileName = "updater.log";
  console.log(app.getPath("userData"));
  log.info("userData");

  autoUpdater.logger = log;
  autoUpdater.on("checking-for-update", () => {
    log.info("-------------------------------");
    log.info("[updater.checking-for-update] Checking for update...");
  });

  autoUpdater.on("update-available", (info) => {
    log.info(`[updater.update-available]`, info);
    autoUpdater.downloadUpdate().then(() => log.info("download start"));
  });

  autoUpdater.on("update-not-available", (info) => {
    log.info(`[updater.update-not-available]`, info);
  });

  autoUpdater.on("error", (err) => {
    log.error(`[updater.update-error]`, err);
  });

  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    log.info(log_message);
  });

  autoUpdater.on("update-downloaded", (info) => {
    log.info("update-downloaded: ", info);
  });

  autoUpdater.checkForUpdates().then(() => {
    log.info("checking for updates");
  });
}
