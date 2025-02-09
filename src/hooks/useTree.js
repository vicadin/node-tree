import { useState, useEffect } from "react";
import { fetchTree, addNode, editNode, deleteNode } from "../api/api";
import { v4 as uuidv4 } from "uuid";

const getTreeName = () => {
  let storedTreeName = localStorage.getItem("TREE_NAME");
  if (!storedTreeName) {
    storedTreeName = uuidv4();
    localStorage.setItem("TREE_NAME", storedTreeName);
  }
  return storedTreeName;
};

const TREE_NAME = getTreeName();

export const useTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTree = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTree(TREE_NAME);
      setTreeData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNode = async (parentId, nodeName) => {
    try {
      setIsLoading(true);
      await addNode(TREE_NAME, parentId, nodeName);
      await loadTree();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNode = async (nodeId, newNodeName) => {
    try {
      setIsLoading(true);
      await editNode(TREE_NAME, nodeId, newNodeName);
      await loadTree();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      setIsLoading(true);
      await deleteNode(TREE_NAME, nodeId);
      await loadTree();
    } catch (error) {
      setError(error.response?.data?.data?.message || "Failed to delete node.");
    } finally {
      setIsLoading(false);
    }
  };

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
