import { useState, useEffect, useCallback } from 'react';
import API from '../api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, Stack, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// Import our new form dialog
import GenericFormDialog from './GenericFormDialog';

function GenericCollectionTable({ collectionName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headers, setHeaders] = useState([]);

  // State for managing the popup form dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null); // Data to edit, or null for create

  // Function to fetch data (wrapped in useCallback so it can be reused)
  const fetchData = useCallback(() => {
    setIsLoading(true);
    API.get(`/dynamic/${collectionName.toLowerCase()}`)
      .then(response => {
        const fetchedData = response.data;
        setData(fetchedData);
        // Auto-detect headers based on the first item found
        if (fetchedData.length > 0) {
          const firstItem = fetchedData[0];
          const detectedHeaders = Object.keys(firstItem).filter(key => typeof firstItem[key] !== 'object' || firstItem[key] === null || key === '_id');
          setHeaders(detectedHeaders);
        }
        setIsLoading(false);
      })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, [collectionName]);

  // Fetch data on load or when collection changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // --- CRUD HANDLERS ---

  const handleCreateOpen = () => {
    // To create, we pass the first item as a "template" so the form knows what fields to show.
    // If no data exists yet, this hacky method won't work well for creation.
    setDialogData(data[0] || {}); 
    setDialogOpen(true);
  };

  const handleEditOpen = (rowData) => {
    setDialogData(rowData); // Pass the specific row data to edit
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item permanently?')) {
      try {
         await API.delete(`/dynamic/${collectionName}/${id}`);
         fetchData(); // Refresh table after delete
      } catch (error) { alert("Could not delete item."); }
    }
  };


  if (isLoading && data.length === 0) return <CircularProgress style={{ margin: '20px' }} />;

  return (
    <Paper sx={{ width: '95%', margin: '20px auto', p: 2 }}>
      {/* Header area with Title and Create Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Manager
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateOpen}>
              Create New
          </Button>
      </Stack>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                  {header.toUpperCase()}
                </TableCell>
              ))}
              {/* Add extra column for actions */}
              <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow hover key={row._id || index}>
                {headers.map((header) => (
                  <TableCell key={header}>
                      {typeof row[header] === 'object' && row[header] !== null ? JSON.stringify(row[header]) : row[header]}
                  </TableCell>
                ))}
                {/* Action Buttons Column */}
                <TableCell>
                   <IconButton color="primary" size="small" onClick={() => handleEditOpen(row)}>
                     <EditIcon />
                   </IconButton>
                   <IconButton color="error" size="small" onClick={() => handleDelete(row._id)}>
                     <DeleteIcon />
                   </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* The Popup Form Dialog */}
      <GenericFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        collectionName={collectionName}
        initialData={dialogData}
        onSuccess={fetchData} // Refresh data after successful save
      />
    </Paper>
  );
}

export default GenericCollectionTable;