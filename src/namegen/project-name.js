const fs = require("fs");
const path = require("path");

const makeProjectName = (length) => {
  const minLength = 9;
  const getData = () =>
    JSON.parse(fs.readFileSync(path.join(__dirname, "terms.json"), "utf-8"));

  const getWrestlingTerm = () =>
    getData().wrestlingTerms[
      Math.floor(Math.random() * getData().wrestlingTerms.length) - 1
    ];

  const getFantasyTerm = () =>
    getData().fantasyTerms[
      Math.floor(Math.random() * getData().fantasyTerms.length) - 1
    ];
  const formatName = (word1, word2) => {
    const word = `${word1}-${word2}`;
    const wordFormattted = word.toLowerCase().replace(/[^a-z0-9-]/gi, "");
    return String(wordFormattted);
  };

  let name = formatName(getFantasyTerm(), getWrestlingTerm());

  if (minLength > length) return;

  if (name.length != length) {
    name = makeProjectName(length);
  }
  return name;
};

module.exports = { makeProjectName };
