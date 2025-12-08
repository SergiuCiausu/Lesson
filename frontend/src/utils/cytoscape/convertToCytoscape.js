export const convertToCytoscape = (elements) => {
  const nodes = elements.concepts.map((c) => ({
    data: {
      id: c.id,
      label: c.label,
    },
  }));

  const edges = elements.relationships.map((r, i) => ({
    data: {
      id: `edge-${i}`,
      source: r.from,
      target: r.to,
      label: r.type,
    },
  }));

  return [...nodes, ...edges];
};
