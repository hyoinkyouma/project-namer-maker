const { makeProjectName } = require("./project-name");
const fs = require("fs");
const path = require("path");

const getNewProjName = (length) => {
  let name = makeProjectName(length);
  const nameDB = JSON.parse(
    fs.readFileSync(path.join(__dirname, "nameshistory.json"), "utf-8")
  );
  const activeNames = nameDB.Active;
  activeNames.forEach((element) => {
    if (element === name) {
      name = getNewProjName(length);
    }
  });

  activeNames.push(name);
  nameDB.Active = activeNames;
  console.log("Current:" + nameDB.Active.length);

  if (name != null)
    fs.writeFile(
      path.join(__dirname, "./nameshistory.json"),
      JSON.stringify(nameDB),
      (err) => {
        if (err) throw err;
        console.log("wrote to ./nameshistory.json");
      }
    );
  return name;
};

const test = async () => {
  while (1 < 2) {
    charLength = Math.floor(Math.random() * 30) + 1;
    console.log("Max Length: " + charLength);
    try {
      getNewProjName(charLength);
    } catch {
      test();
    }
    await new Promise((r) => setTimeout(r, 70));
  }
};

test();

module.exports = { test, getNewProjName };
