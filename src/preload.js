const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("namegen", {
  makeName: (length) => ipcRenderer.send("make-name", length),
  sendName: (callback) => ipcRenderer.on("send-name", callback),
});
contextBridge.exposeInMainWorld("browse", {
  open: () => ipcRenderer.send("open-file-browser"),
  sendDir: (dir) => ipcRenderer.on("send-dir", dir),
  makeProj: (dir, name) => ipcRenderer.send("makeproj", dir, name),
});
contextBridge.exposeInMainWorld("default", {
  defDir: (cb) => ipcRenderer.on("defdir", cb),
});
