import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { RegionData } from '../types';

interface RiskMapProps {
  data: RegionData[];
}

export const RiskMap: React.FC<RiskMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const width = 400;
    const height = 300;
    const padding = 40;

    // Simulation of a hexagonal grid map (abstract representation of regions)
    // Since we don't have a GeoJSON, we use a force layout to cluster nodes representing regions
    
    const nodes = data.map((d, i) => ({
        ...d,
        x: width / 2 + Math.cos(i * 2 * Math.PI / data.length) * 100,
        y: height / 2 + Math.sin(i * 2 * Math.PI / data.length) * 100
    }));

    const simulation = d3.forceSimulation(nodes as any)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(35))
        .stop();

    // Run simulation manually for static render
    for (let i = 0; i < 120; ++i) simulation.tick();

    // Links (abstract connections)
    const links = [];
    for(let i=0; i<nodes.length; i++) {
        links.push({ source: nodes[i], target: nodes[(i + 1) % nodes.length] });
        links.push({ source: nodes[i], target: nodes[(i + 2) % nodes.length] }); // extra connectivity
    }

    // Draw Links
    svg.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)
        .attr("stroke", "#334155")
        .attr("stroke-width", 1);

    // Draw Nodes
    const nodeGroups = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
        .attr("cursor", "pointer");

    // Hexagon Shape
    const hexPoints = "0,-30 26,-15 26,15 0,30 -26,15 -26,-15";
    
    nodeGroups.append("polygon")
        .attr("points", hexPoints)
        .attr("fill", (d: any) => {
            if (d.riskScore > 50) return "#7f1d1d"; // Red-900
            if (d.riskScore > 30) return "#78350f"; // Amber-900
            return "#064e3b"; // Emerald-900
        })
        .attr("stroke", (d: any) => {
            if (d.riskScore > 50) return "#ef4444";
            if (d.riskScore > 30) return "#f59e0b";
            return "#10b981";
        })
        .attr("stroke-width", 2)
        .attr("opacity", 0.8)
        .on("mouseover", function() { d3.select(this).attr("opacity", 1); })
        .on("mouseout", function() { d3.select(this).attr("opacity", 0.8); });

    // Text Labels
    nodeGroups.append("text")
        .text((d: any) => d.name)
        .attr("text-anchor", "middle")
        .attr("y", -5)
        .attr("fill", "white")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("pointer-events", "none");

    nodeGroups.append("text")
        .text((d: any) => `Risk: ${d.riskScore}`)
        .attr("text-anchor", "middle")
        .attr("y", 15)
        .attr("fill", "#94a3b8")
        .attr("font-size", "9px")
        .attr("pointer-events", "none");

  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
};
