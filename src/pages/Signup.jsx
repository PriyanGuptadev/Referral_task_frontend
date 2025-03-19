import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, Link, Snackbar, Alert, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { motion as Motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setSnackbar({ open: true, message: "Please enter all fields!", severity: "error" });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("referral_code"); 

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: password,
          referral_code: referralCode
        })
      });
      
      const data = await response.json();
       
      if (response.ok) {
        setSnackbar({ open: true, message: "Signup successful! Redirecting...", severity: "success" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setSnackbar({ open: true, message: data.errors || "Signup failed!", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Network error! Please try again.", severity: "error" });
    }
  };


  return (
    <Container maxWidth="sm">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 10, 
            textAlign: "center",
            background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}
        >
          <Motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <PersonAdd 
                sx={{ 
                  fontSize: 40, 
                  color: 'primary.main',
                  mr: 1
                }} 
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Create Account
              </Typography>
            </Box>
          </Motion.div>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join our referral program and start earning rewards
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TextField 
                label="Email" 
                fullWidth 
                margin="normal" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Motion.div>

            <Motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TextField 
                label="Password" 
                type={showPassword ? "text" : "password"}
                fullWidth 
                margin="normal" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Motion.div>

            <Motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ 
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  }
                }} 
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </Motion.div>

            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 'medium',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Login here
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link 
                    component={RouterLink} 
                    to="/" 
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Back to Home
                  </Link>
                </Typography>
              </Box>
            </Motion.div>
          </Box>
        </Paper>
      </Motion.div>

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
    </Container>
  );
};

export default Signup;
