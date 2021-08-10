const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

// vue.config.js
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  pluginOptions: {
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration
    electronBuilder: {
      // mainProcessFile: 'backend/main.js',
      // preload: 'backend/preload.js',
      nodeIntegration: true,
      builderOptions: {
        productName: "electron-updater-template",
        appId: "com.demo.app",
        // files: ['dist_electron/**/*'],
        extends: null,
        directories: {
          output: "dist_electron",
        },
        mac: {
          target: [{ target: "dmg", arch: ["x64", "arm64", "universal"] }],
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}-${os}-${version}-${arch}.${ext}",
          category: "public.app-category.developer-tools",
          // icon: "build/icons/icon.icns",
          type: "development",
          darkModeSupport: false,
        },
        dmg: {
          icon: "build/icons/icon.icns",
          iconSize: 85,
        },

        win: {
          target: [
            { target: "portable", arch: ["x64"] },
            { target: "nsis", arch: ["x64"] },
          ],
          icon: "build/icons/icon.ico",
        },

        nsis: {
          oneClick: true,
          perMachine: true,
          installerIcon: "build/icons/icon.ico",
          deleteAppDataOnUninstall: true,
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}-Setup-${version}.${ext}",
        },

        linux: {
          target: [
            { target: "AppImage", arch: ["x64"] },
            // { target: "tar.gz", arch: ["x64"] },
            // { target: "deb", arch: ["x64", "armv7l"] },
            // { target: "rpm", arch: ["x64"] },
            // { target: 'snap', arch: ['x64'] }
            // { target: 'pacman', arch: ['x64'] }
          ],
          category: "Development",
          // icon: "build/icons/icon.icns",
        },
        publish: [
          {
            /* https://www.electron.build/configuration/publish#githuboptions */
            provider: "github",
            repo: "electron-updater-template",
            owner: "zx",
            vPrefixedTagName: true,
            releaseType: "draft",
            private: true,
            // your personal/company token
            token: "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",
          },
        ],
      },
      // 主线程的配置文件
      chainWebpackMainProcess: (config) => {
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      // 渲染线程的配置文件
      chainWebpackRendererProcess: (config) => {
        // 渲染线程的一些其他配置
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin("define").tap((args) => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      mainProcessWatch: ["background"],
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
};
