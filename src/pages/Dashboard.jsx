import React, { useState, useEffect } from "react";
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
  const [statistics, setStatistics] = useState({ rewards_point: 0, referral_count: 0 }); // State for referral stats
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL

  useEffect(() => {
    fetchReferralStatistics();
  }, []);

  const fetchReferralStatistics = async () => {
    try {
      const authHeaders = JSON.parse(localStorage.getItem("authHeaders")); // Retrieve auth headers
  
      if (!authHeaders) {
        setSnackbar({ open: true, message: "You need to log in first.", severity: "error" });
        return;
      }

      const response = await fetch(`${backendUrl}/referrals/statistics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatistics(data); // Update state with API response
      } else {
        setSnackbar({ open: true, message: "Failed to fetch statistics.", severity: "error" });
      }
    } catch (error) {
      console.error("Error fetching referral statistics:", error);
      setSnackbar({ open: true, message: "Error fetching statistics.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRefer = async () => {
    try {
      const authHeaders = JSON.parse(localStorage.getItem("authHeaders")); // Retrieve authentication headers
  
      if (!authHeaders) {
        setSnackbar({
          open: true,
          message: "You need to log in first.",
          severity: "error",
        });
        return;
      }

      const currentUserEmail = authHeaders.uid; // Get user email from auth headers

      if (email.trim().toLowerCase() === currentUserEmail.trim().toLowerCase()) {
        setSnackbar({
          open: true,
          message: "You cannot refer yourself!",
          severity: "warning",
        });
        return;
      }
  
      const response = await fetch(`${backendUrl}/referrals/generate_code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders, // Include authentication headers
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const newReferralLink = `${window.location.origin}/signup?referral_code=${data.referral_code}`; // Updated key
        setReferralLink(newReferralLink); // Update the referral link state
       
        sentMail(email, newReferralLink);
  
        setSnackbar({
          open: true,
          message: "Referral code generated successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to generate referral code. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error generating referral code:", error);
      setSnackbar({
        open: true,
        message: "An error occurred while generating the referral code.",
        severity: "error",
      });
    }
  };

  const sentMail = async (email, referralLink) => {
    try {
      const authHeaders = JSON.parse(localStorage.getItem("authHeaders")); // Retrieve authentication headers
  
      if (!authHeaders) {
        setSnackbar({
          open: true,
          message: "You need to log in first.",
          severity: "error",
        });
        return;
      }
  
      const response = await fetch(`${backendUrl}/send_referral_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders, // Include authentication headers
        },
        body: JSON.stringify({ email, referral_link: referralLink }),
      });
  
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Referral email sent successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Failed to send referral email. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error sending referral email:", error);
      setSnackbar({
        open: true,
        message: "An error occurred while sending the referral email.",
        severity: "error",
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
    localStorage.removeItem("authHeaders"); // Clear authentication headers
  
    setSnackbar({
      open: true,
      message: "Logged out successfully!",
      severity: "info",
    });
  
    setTimeout(() => navigate("/login"), 1000);
  };  

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: 3, backgroundColor: "#fafafa" }}>
        {/* Header with Logout */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            🎉 Referral Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout} 
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>

        {/* Referral Introduction */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Invite your friends and earn rewards when they sign up using your referral link!
        </Typography>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, backgroundColor: "#ffffff" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Refer a Friend</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="Enter Friend's Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button 
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                  onClick={handleRefer}
                  disabled={!email}
                >
                  Refer
                </Button>
              </Grid>
            </Grid>
        </Paper>

        {/* Referral Link Display */}
        {referralLink && (
          <Paper elevation={2} sx={{ mt: 4, p: 3, borderRadius: 2, backgroundColor: "#e3f2fd" }}>
            <Typography variant="subtitle1">Your Referral Link:</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <TextField fullWidth variant="outlined" value={referralLink} InputProps={{ readOnly: true }} />
              <IconButton onClick={copyToClipboard} color="primary">
                <ContentCopy />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* Referral Statistics */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your Referral Statistics</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#f0f8ff" }}>
                <CardContent>
                  <People color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">{statistics.referral_count}</Typography>
                  <Typography variant="body2">Friends Referred</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ p: 2, textAlign: "center", backgroundColor: "#fff3e0" }}>
                <CardContent>
                  <MonetizationOn color="secondary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6">${statistics.rewards_point}</Typography>
                  <Typography variant="body2">Earned Rewards</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar Notification */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={5000} 
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
