import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import { convertToCytoscape } from "../utils/cytoscape/convertToCytoscape";
import { stylesheet } from "../utils/cytoscape/stylesheetCy";

cytoscape.use(COSEBilkent);

const ProjectBoard = ({}) => {
  const { projectId: paramId } = useParams();
  const [concepts, setConcepts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const loadProject = async () => {
    try {
      const project = await fetch("http://localhost:3000/api/projects/get-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: paramId,
        }),
      });

      if (!project.ok) {
        navigate("/dashboard");
      }

      const projectData = await project.json();

      const projectConcepts = projectData.project.concepts;

      const elements = convertToCytoscape(JSON.parse(projectConcepts));

      setConcepts(elements);
    } catch (err) {
      console.log("Error loading project: ", err);
    }
  };

  useEffect(() => {
    loadProject();
  }, [location.pathname]);

  return (
    <div>
      <CytoscapeComponent
        renderer={{
          name: "canvas",
        }}
        elements={concepts}
        style={{
          width: "var(--dashboard-main-width)",
          height: "calc(100vh - var(--dashboard-navbar-height))",
          backgroundColor: "var(--light-gray)",
        }}
        cy={(cy) => {
          cy.zoom(0.8);
          cy.center();
          cy.layout({
            name: "breadthfirst",
            animate: true,
            minDist: 100,
            padding: 20,
            animationDuration: 1200,
            animationEasing: "ease-in-out",
          }).run();
        }}
        stylesheet={stylesheet}
      />
    </div>
  );
};

export default ProjectBoard;
