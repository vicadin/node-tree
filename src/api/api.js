import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTree = async (treeName) => {
  try {
    const response = await axios.get(`${API_URL}.get?treeName=${treeName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tree:", error);
    throw error;
  }
};

export const addNode = async (treeName, parentNodeId, nodeName) => {
  try {
    const response = await axios.post(`${API_URL}.node.create`, null, {
      params: { treeName, parentNodeId, nodeName },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding node:", error);
    throw error;
  }
};

export const editNode = async (treeName, nodeId, newNodeName) => {
  try {
    const response = await axios.post(`${API_URL}.node.rename`, null, {
      params: { treeName, nodeId, newNodeName },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing node:", error);
    throw error;
  }
};

export const deleteNode = async (treeName, nodeId) => {
  try {
    const response = await axios.post(`${API_URL}.node.delete`, null, {
      params: { treeName, nodeId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting node:", error);
    throw error;
  }
};
