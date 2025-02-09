import { useState } from "react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { Box, Button } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

export const TreeView = ({ treeData, onEdit, onDelete, onAdd }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        itemId={node.id}
        sx={{
          "& .MuiTreeItem-content": {
            backgroundColor: "transparent !important",
          },
          "& .MuiTreeItem-content.Mui-selected": {
            backgroundColor: "transparent !important",
          },
        }}
        label={
          <Box
            display="flex"
            alignItems="center"
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            sx={{ height: 10 }}
          >
            <span>{node.name}</span>
            {hoveredNode?.id === node.id && (
              <Box ml={2}>
                <Button size="small" onClick={() => onEdit(node)}>
                  <Edit fontSize="small" />
                </Button>
                <Button size="small" onClick={() => onDelete(node)}>
                  <Delete fontSize="small" />
                </Button>
                <Button size="small" onClick={() => onAdd(node)}>
                  <Add fontSize="small" />
                </Button>
              </Box>
            )}
          </Box>
        }
      >
        {node.children && renderTree(node.children)}
      </TreeItem>
    ));
  };

  return (
    <SimpleTreeView>
      {treeData && (
        <TreeItem
          key={treeData.id}
          itemId={treeData.id}
          label={
            <Box display="flex" alignItems="center">
              <h2>Root</h2>
              <Button size="small" onClick={() => onAdd(treeData, treeData.id, false)}>
                <Add fontSize="small" />
              </Button>
            </Box>
          }
          sx={{
            "& .MuiTreeItem-content": {
              backgroundColor: "transparent !important",
            },
            "& .MuiTreeItem-content.Mui-selected": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          {treeData.children && renderTree(treeData.children)}
        </TreeItem>
      )}
    </SimpleTreeView>
  );
};
