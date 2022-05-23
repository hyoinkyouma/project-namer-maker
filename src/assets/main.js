const make = async () => {
  const makeBtn = document.getElementById("makeBtn");
  makeBtn.onclick = async () => {
    makeBtn.setAttribute("disabled", "true");
    const dir = document.getElementById("directoryInput").value;
    const name = document.getElementById("project-name").value;
    window.browse.makeProj(dir, name);
    await new Promise((r) => setTimeout(r, 200));
    makeBtn.removeAttribute("disabled");
  };
};
const definedir = async () => {
  await window.default.defDir((e, d) => {
    document.getElementById("directoryInput").value = d;
  });
};

const app = async () => {
  make();
  await definedir();

  const makeNameBtn = document.getElementById("makeName");
  makeNameBtn.onclick = async () => {
    makeNameBtn.setAttribute("disabled", "true");
    window.namegen.makeName(15);
    window.namegen.sendName((e, name) => {
      const projectName = document.getElementById("project-name");
      projectName.value = name;
      projectName.focus();
    });
    await new Promise((r) => setTimeout(r, 200));

    makeNameBtn.removeAttribute("disabled");
  };

  const browseBtn = document.getElementById("browseDir");

  browseBtn.onclick = async () => {
    browseBtn.setAttribute("disabled", "true");

    window.browse.open(() => {
      console.log("file browser open");
    });

    await window.browse.sendDir(async (e, dir) => {
      const inputDir = document.getElementById("directoryInput");
      if (dir.canceled != true) {
        inputDir.value = dir.filePaths[0];
        inputDir.focus();
      }
      if (inputDir.value.length > 32) {
        browseBtn.style.opacity = 0;
        browseBtn.setAttribute("disabled", "true");
      }

      inputDir.onkeydown = () => {
        if (inputDir.value.length < 32) {
          browseBtn.style.opacity = "1";
          browseBtn.removeAttribute("disabled");
        }
        if (inputDir.value.length > 32) {
          browseBtn.style.opacity = 0;
          browseBtn.setAttribute("disabled", "true");
        }
      };
    });

    await new Promise((r) => setTimeout(r, 200));
    browseBtn.removeAttribute("disabled");
  };

  makeNameBtn.click();
};

app();
