import { useState, useEffect, useMemo } from "react";
import { fetchTree, addNode, editNode, deleteNode } from "../api/api";
import { v4 as uuidv4 } from "uuid";

const getTreeName = () => {
  const storedTreeName = localStorage.getItem("TREE_NAME") || uuidv4();
  localStorage.setItem("TREE_NAME", storedTreeName);
  return storedTreeName;
};

export const useTree = () => {
  const TREE_NAME = useMemo(getTreeName, []);
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (callback) => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTree = () => withLoading(() => fetchTree(TREE_NAME).then(setTreeData));

  const handleAddNode = (parentId, nodeName) =>
    withLoading(() => addNode(TREE_NAME, parentId, nodeName).then(loadTree));

  const handleEditNode = (nodeId, newNodeName) =>
    withLoading(() => editNode(TREE_NAME, nodeId, newNodeName).then(loadTree));

  const handleDeleteNode = (nodeId) =>
    withLoading(() => deleteNode(TREE_NAME, nodeId).then(loadTree));

  useEffect(() => {
    loadTree();
  }, []);

  return {
    treeData,
    error,
    isLoading,
    handleAddNode,
    handleEditNode,
    handleDeleteNode,
    setError,
  };
};
