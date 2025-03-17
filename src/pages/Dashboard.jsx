import React, { useState } from "react";
import { 
  Container, Typography, TextField, Button, 
  Box, Paper, Snackbar, IconButton, Grid, Card, CardContent, Alert
} from "@mui/material";
import { ContentCopy, Send, Logout, People, MonetizationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const generateReferralLink = (email) => {
    return `${window.location.origin}/signup?ref=${btoa(email)}`; // Encode email for referral tracking
  };

  const handleRefer = () => {
    if (email) {
      const link = generateReferralLink(email);
      setReferralLink(link);
      setSnackbar({
        open: true,
        message: "Referral link generated successfully!",
        severity: "success"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setSnackbar({
      open: true,
      message: "Referral link copied to clipboard!",
      severity: "success"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authHeaders");
    setSnackbar({
      open: true,
      message: "Logged out successfully!",
      severity: "info"
    });
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        {/* Header with Logout */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">🎉 Referral System Dashboard</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Box>

        {/* Referral Introduction */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Invite your friends and earn rewards when they sign up using your referral link!
        </Typography>

        {/* Referral Input */}
        <TextField
          fullWidth
          label="Enter Friend's Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Send />} 
          onClick={handleRefer} 
          disabled={!email}
        >
          Generate Referral Link
        </Button>

        {/* Referral Link Display */}
        {referralLink && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="subtitle1">Your Referral Link:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <TextField fullWidth variant="outlined" value={referralLink} InputProps={{ readOnly: true }} />
              <IconButton onClick={copyToClipboard} color="primary">
                <ContentCopy />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Referral Statistics */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your Referral Statistics</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#f0f8ff" }}>
                <CardContent>
                  <People color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">12</Typography>
                  <Typography variant="body2">Friends Referred</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#fff3e0" }}>
                <CardContent>
                  <MonetizationOn color="secondary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">$50</Typography>
                  <Typography variant="body2">Earned Rewards</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar Notification */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Dashboard;
