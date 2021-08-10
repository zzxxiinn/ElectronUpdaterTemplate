# electron-updater-template

1. 使用 electron-updater 库，在系统加载完成后检查更新，并注册更新相关事件；
2. 更新源设置在 `vue.config.js` 中的 `pluginOptions/electronBuilder/builderOptions/publish` 中；
3. 如果设置 github release 作为更新源，需要提供可以访问到该 repo 的 gh_token 作为访问凭据；
