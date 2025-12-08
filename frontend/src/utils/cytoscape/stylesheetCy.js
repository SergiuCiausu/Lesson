export const stylesheet = [
  {
    selector: "node",
    style: {
      backgroundColor: "#ffffff",
      label: "data(label)",
      color: "#000000",
      textValign: "center",
      textHalign: "center",
      width: 214,
      height: 214,
      shape: "roundrectangle",
      "font-size": 16,
      "font-family": "Inter",
      "font-weight": "600",
    },
  },
  {
    selector: "edge",
    style: {
      "line-color": "#AAAAAA",
      width: 2,
      "target-arrow-shape": "triangle",
      "target-arrow-color": "#AAAAAA",
      "curve-style": "bezier",
      label: "data(label)",
      "font-size": 14,
      "text-background-color": "#D9D9D9",
      "text-background-opacity": 0.7,
    },
  },
];
