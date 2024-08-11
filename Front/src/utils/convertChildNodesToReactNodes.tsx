import React from "react";

// Function to recursively convert ChildNodes to ReactNodes
export const convertChildNodesToReactNodes = (childNodes: NodeListOf<ChildNode>): React.ReactNode => {
    return Array.from(childNodes).map((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent; // Render text content directly
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const children = convertChildNodesToReactNodes(node.childNodes);
            return React.createElement(node.nodeName.toLowerCase(), { key: index }, children);
        }
        return null; 
    });
};
