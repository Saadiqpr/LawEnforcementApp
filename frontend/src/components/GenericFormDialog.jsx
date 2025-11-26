import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import API from '../api';

// This component opens a popup form to Create or Edit a document
function GenericFormDialog({ open, onClose, collectionName, initialData, onSuccess }) {
  const [formData, setFormData] = useState({});
  const isEditMode = !!initialData?._id; // If it has an ID, we are editing

  // When the dialog opens, load the data into the form
  useEffect(() => {
    if (open) {
        // If editing, use existing data. If creating, start empty.
        setFormData(initialData || {});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // UPDATE existing
        await API.put(`/dynamic/${collectionName}/${initialData._id}`, formData);
      } else {
        // CREATE new
        await API.post(`/dynamic/${collectionName}`, formData);
      }
      onSuccess(); // Tell parent to refresh table
      onClose();   // Close popup
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Check console.");
    }
  };

  // --- THE TRICKY PART: Determining form fields ---
  // We look at the keys of the initialData object to decide what inputs to show.
  // We filter out '_id' because you shouldn't edit that manually.
  const fields = initialData ? Object.keys(initialData).filter(key => key !== '_id') : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Item' : 'Create New Item'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          {fields.length === 0 && !isEditMode && (
             <p>Warning: Cannot auto-detect fields for a new item because no template data was provided.</p>
          )}
          {/* LOOP through detected keys and create a text input for each */}
          {fields.map((key) => (
             // Note: We are treating almost everything as a basic text string for simplicity in this "hacky" approach.
             // Dates will need to be entered manually as YYYY-MM-DD strings.
            <TextField
              key={key}
              margin="dense"
              label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize label
              name={key}
              value={formData[key] || ''} // Handle null/undefined values
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GenericFormDialog;