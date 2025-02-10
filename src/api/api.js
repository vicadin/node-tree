import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const makeRequest = async (method, endpoint, params = null, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      params,
      data,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.data?.message || "Unknown error occurred";
    console.error(`Error in ${method} request to ${endpoint}: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

export const fetchTree = async (treeName) => {
  return makeRequest("get", ".get", { treeName });
};

export const addNode = async (treeName, parentNodeId, nodeName) => {
  return makeRequest("post", ".node.create", { treeName, parentNodeId, nodeName });
};

export const editNode = async (treeName, nodeId, newNodeName) => {
  return makeRequest("post", ".node.rename", { treeName, nodeId, newNodeName });
};

export const deleteNode = async (treeName, nodeId) => {
  return makeRequest("post", ".node.delete", { treeName, nodeId });
};
