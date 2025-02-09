import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useTree } from "./hooks/useTree";
import { AddEditModal } from "./components/AddEditModal";
import { DeleteModal } from "./components/DeleteModal";
import { TreeView } from "./components/TreeView";
import { CircularProgress } from "@mui/material";

const App = () => {
  const { treeData, error, setError, handleAddNode, handleEditNode, handleDeleteNode, isLoading } =
    useTree();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [nodeToDelete, setNodeToDelete] = useState(null);
  const [newNodeName, setNewNodeName] = useState("");
  const [parentNodeId, setParentNodeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (node = null, parentId = null, isEditing = false) => {
    setCurrentNode(node);
    setParentNodeId(parentId);
    setNewNodeName(node ? node.name : "");
    setIsEditing(isEditing);
    setModalOpen(true);
  };

  const openDeleteModal = (node) => {
    setNodeToDelete(node);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentNode(null);
    setParentNodeId(null);
    setNewNodeName("");
    setIsEditing(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setNodeToDelete(null);
  };

  const confirmDelete = () => {
    if (nodeToDelete) {
      handleDeleteNode(nodeToDelete.id);
    }
    closeDeleteModal();
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleEditNode(currentNode.id, newNodeName);
    } else {
      handleAddNode(parentNodeId, newNodeName);
    }
    closeModal();
  };

  return (
    <Box>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(99, 99, 99, 0.47)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {treeData && (
        <>
          <TreeView
            treeData={treeData}
            onEdit={(node) => openModal(node, null, true)}
            onDelete={(node) => openDeleteModal(node)}
            onAdd={(node) => openModal(null, node.id, false)}
            onNodeSelect={(node) => setCurrentNode(node)}
          />

          <AddEditModal
            isOpen={modalOpen}
            onClose={closeModal}
            isEditing={isEditing}
            onSubmit={handleSubmit}
            nodeName={newNodeName}
            setNodeName={setNewNodeName}
          />

          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            nodeName={nodeToDelete?.name}
          />

          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default App;
