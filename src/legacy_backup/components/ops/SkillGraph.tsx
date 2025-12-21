import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { userData } from "../../data/user";

// Define the structure for nodes and links
interface Node {
    id: string;
    group: string;
    x: number;
    y: number;
    label: string;
    description?: string;
    connections: string[];
}

export default function SkillGraph() {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Flatten skills into nodes
    // In a real optimized app, a force-simulation (d3-force) would calculate positions.
    // Here we hardcode a "star" topology for reliability and aesthetics.

    const categories = Object.keys(userData.skills) as Array<keyof typeof userData.skills>;

    const coreNode: Node = { id: "core", group: "core", x: 50, y: 50, label: "CORE", connections: [], description: "Central Operations" };

    const nodes: Node[] = [coreNode];

    // Generate nodes around the core
    // 4 Main categories = 4 Quadrants
    categories.forEach((cat, catIndex) => {
        const angleBase = (catIndex / categories.length) * 2 * Math.PI;

        // Category Hub Node
        const hubId = `cat-${cat}`;
        const hubX = 50 + 20 * Math.cos(angleBase);
        const hubY = 50 + 20 * Math.sin(angleBase);

        nodes.push({
            id: hubId,
            group: cat,
            x: hubX,
            y: hubY,
            label: cat.toUpperCase(),
            connections: ["core"], // Connect to core
            description: `Module: ${cat}`
        });

        // Skill Nodes connected to Hub
        userData.skills[cat].forEach((skill: string, skillIndex: number) => {
            const totalSkills = userData.skills[cat].length;
            const spread = 0.5; // Radians spread
            const angle = angleBase + (skillIndex - totalSkills / 2) * (spread / totalSkills);
            const radius = 35 + Math.random() * 10;

            nodes.push({
                id: skill,
                group: cat,
                x: 50 + radius * Math.cos(angle),
                y: 50 + radius * Math.sin(angle),
                label: skill,
                connections: [hubId], // Connect to hub
                description: "Skill Node"
            });
        });
    });

    return (
        <div className="bg-[#0f1623]/60 border border-white/5 rounded-xl h-[500px] relative overflow-hidden backdrop-blur-sm group" ref={containerRef}>

            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {nodes.map(node => (
                    node.connections.map(targetId => {
                        const target = nodes.find(n => n.id === targetId);
                        if (!target) return null;

                        const isActive = activeNode && (activeNode === node.id || activeNode === targetId);

                        return (
                            <motion.line
                                key={`${node.id}-${targetId}`}
                                x1={`${node.x}%`}
                                y1={`${node.y}%`}
                                x2={`${target.x}%`}
                                y2={`${target.y}%`}
                                stroke={isActive ? "#06b6d4" : "rgba(255,255,255,0.05)"}
                                strokeWidth={isActive ? 2 : 1}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: isActive ? 1 : 0.4 }}
                                transition={{ duration: 1 }}
                            />
                        );
                    })
                ))}
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node) => {
                const isActive = activeNode === node.id;
                const isHub = node.id.startsWith("cat-") || node.id === "core";

                return (
                    <motion.div
                        key={node.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300
                    ${isHub ? 'z-20' : 'z-10'}
                `}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: isActive ? 1.2 : 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Visual Circle */}
                        <div className={`
                    rounded-full flex items-center justify-center border transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]
                    ${isHub
                                ? 'w-12 h-12 bg-[#0b101b] border-cyan-500/50'
                                : 'w-2 h-2 bg-slate-600 border-transparent hover:bg-cyan-400 hover:scale-150'
                            }
                    ${isActive ? 'bg-cyan-950 border-cyan-400 !scale-125' : ''}
                `}>
                            {isHub && <span className="text-[8px] font-bold text-cyan-500">{node.label.substring(0, 3)}</span>}
                        </div>

                        {/* Tooltip Label (Always show for hubs, hover for nodes) */}
                        <AnimatePresence>
                            {(isActive || isHub) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-black/80 border border-white/10 rounded text-xs text-xs text-white pointer-events-none z-50`}
                                >
                                    {node.label}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}

            {/* Info Panel Overlay */}
            <div className="absolute top-4 right-4 pointer-events-none">
                <div className="text-[10px] text-slate-500 font-mono text-right">
                    NETWORK TOPOLOGY v1.0<br />
                    {nodes.length} NODES ACTIVE
                </div>
            </div>

        </div>
    );
}
