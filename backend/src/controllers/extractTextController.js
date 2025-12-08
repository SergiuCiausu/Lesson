import fs from "fs";
import { extractFromTxt, extractFromPdf, extractFromDocx, extractFromPptx } from "../utils/fileExtractors.js";
import { checkReqLength } from "../utils/checkReqLength.js";

export const extractText = async (req, res) => {
  if (!checkReqLength(req.files, req.body.links, req.body.text, 10)) {
    return res.status(400).json({ message: "Queue exceeds max length" });
  }

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const results = [];

    for (const file of req.files) {
      const { path: filePath, mimetype, originalname } = file;
      let extractedText = "";

      try {
        switch (mimetype) {
          case "text/plain":
            extractedText = await extractFromTxt(filePath, originalname);
            break;
          case "application/pdf":
            extractedText = await extractFromPdf(filePath, originalname);
            break;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extractedText = await extractFromDocx(filePath, originalname);
            break;
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            extractedText = await extractFromPptx(filePath, originalname);
            extractedText = extractedText.map((slide) => slide.join(" ")).join("\n\n---\n\n");
            break;
          default:
            results.push({
              filename: originalname,
              success: false,
              error: "Unsupported file type",
            });
            fs.unlinkSync(filePath);
            continue;
        }

        results.push({
          filename: originalname,
          success: true,
          text: extractedText.content.trim(),
          fileType: mimetype,
        });

        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Error processing ${originalname}:`, error);
        results.push({
          filename: originalname,
          success: false,
          error: error.message,
        });
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    res.json({
      success: true,
      totalFiles: req.files.length,
      results,
    });
  } catch (error) {
    console.error("Error extracting text:", error);
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(500).json({ error: "Failed to extract text" });
  }
};
