import mammoth from "mammoth";
import fs from "fs";
import PPTX2JSON from "pptx2json";
import pdf from "pdf-extraction";

const pptx2json = new PPTX2JSON();

export async function extractFromTxt(filePath, filename) {
  console.log("Asta-i de txt: ", fs.readFileSync(filePath, "utf8"));
  return {
    filename,
    content: fs.readFileSync(filePath, "utf8"),
  };
}

export async function extractFromPdf(filePath, filename) {
  const dataBuffer = fs.readFileSync(filePath);
  pdf(dataBuffer).then((data) => {
    console.log("Asta-i de PDF: ", data.text);
    return {
      filename,
      content: data.text,
    };
  });
}

export async function extractFromDocx(filePath, filename) {
  const result = await mammoth.extractRawText({ path: filePath });
  console.log("Asta-i de docx: ", result.value);
  return {
    filename,
    content: result.value,
  };
}

const extractTextFromSlide = (slideXML) => {
  let texts = [];

  function walk(node) {
    if (typeof node !== "object" || node === null) return;

    if (node["a:t"]) {
      texts.push(node["a:t"][0]);
    }

    for (const key in node) {
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach(walk);
      } else if (typeof child === "object") {
        walk(child);
      }
    }
  }

  walk(slideXML);
  return texts;
};

export async function extractFromPptx(filePath, filename) {
  const slides = await pptx2json.toJson(filePath);

  const slidePaths = Object.keys(slides).filter((path) => path.startsWith("ppt/slides/slide") && path.endsWith(".xml"));

  const allSlidesText = slidePaths.map((path) => {
    return extractTextFromSlide(slides[path]);
  });

  console.log("Asta-i de pptx: ", allSlidesText);
  return {
    filename,
    content: allSlidesText,
  };
}
