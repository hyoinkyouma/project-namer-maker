const { makeProjectName } = require("./project-name");
const fs = require("fs");
const path = require("path");

const getNewProjName = async (length) => {
  let name = await makeProjectName(length);
  const nameDB = await JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "/../", "/../", "nameshistory.json"),
      "utf-8"
    )
  );
  const activeNames = nameDB.Active;
  activeNames.forEach((element) => {
    if (element === name) {
      name = getNewProjName(length);
    }
  });

  if (name !== null || name !== undefined || name !== " " || name === {}) {
    activeNames.push(name);
    nameDB.Active = activeNames;
    console.log("Current:" + nameDB.Active.length);
    fs.writeFileSync(
      path.join(__dirname, "/../", "/../", "nameshistory.json"),
      JSON.stringify(nameDB)
    );
    console.log("wrote to ./nameshistory.json");
  }

  return await name;
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

module.exports = { getNewProjName };
