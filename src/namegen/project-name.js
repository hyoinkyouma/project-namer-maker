const fs = require("fs");
const path = require("path");

const makeProjectName = async (length) => {
  const minLength = 9;
  const getData = async () =>
    await JSON.parse(
      fs.readFileSync(path.join(__dirname, "terms.json"), "utf-8")
    );
  const terms = await getData();

  const getWrestlingTerm = () =>
    terms.wrestlingTerms[
      Math.floor(Math.random() * terms.wrestlingTerms.length)
    ];

  const getFantasyTerm = () =>
    terms.fantasyTerms[Math.floor(Math.random() * terms.fantasyTerms.length)];
  const formatName = (word1, word2) => {
    const word = `${word1}-${word2}`;
    const wordFormattted = word.toLowerCase().replace(/[^a-z0-9-]/gi, "");
    return String(wordFormattted);
  };

  let name = formatName(getFantasyTerm(), getWrestlingTerm());

  if (minLength > length) return;
  if (name === undefined || name === null || name === "" || name === {}) return;
  if (name.length != length) {
    name = await makeProjectName(length);
  }
  return name;
};

module.exports = { makeProjectName };
