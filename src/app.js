const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { getNewProjName } = require("./namegen/getNewProjName");
let mainWindow;

process.env.NODE_ENV = "production";

const makeName = async (e, length) => {
  let name;
  const newName = await getNewProjName(length);
  name = await newName;
  mainWindow.webContents.send("send-name", newName);
  console.log(name);
};

const makeProj = (e, dir, name) => {
  if (dir != null || dir != undefined) {
    fs.mkdirSync(dir + "/" + name + "/" + "src", { recursive: true });
    fs.writeFileSync(path.join(dir, name, "src", "app.js"), "//Happy Coding");
    shell.showItemInFolder(path.join(dir, name, "src", "app.js"));
  }
};

const openFileBrowser = async () => {
  await dialog
    .showOpenDialog({
      defaultPath: path.join(require("os").homedir(), "Desktop"),
      properties: ["openDirectory"],
    })
    .then((paths) => (dir = paths))
    .then((dir) => {
      mainWindow.webContents.send("send-dir", dir);
      console.log(dir);
    });
};

app.on("ready", function () {
  ipcMain.on("make-name", makeName);
  ipcMain.on("open-file-browser", openFileBrowser);
  ipcMain.on("makeproj", makeProj);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Project Maker",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./assets/app.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("ready-to-show", async () => {
    await mainWindow.webContents.send(
      "defdir",
      require("os").homedir() + "\\" + "Desktop"
    );
  });

  mainWindow.on("closed", () => app.quit());

  if (process.env.NODE_ENV == "production") {
    mainWindow.setMenu(null);
  }
});
