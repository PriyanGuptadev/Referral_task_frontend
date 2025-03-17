import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, Link, Snackbar, Alert, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion as Motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Please enter all fields!",
        severity: "error"
      });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password!");
      }
  
      const data = await response.json();
      console.log("Data Fetched", data);
      
      // Store authentication headers
      const authHeaders = {
        "access-token": response.headers.get("access-token"),
        "client": response.headers.get("client"),
        "uid": response.headers.get("uid")
      };
  
      localStorage.setItem("authHeaders", JSON.stringify(authHeaders));
  
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success"
      });
  
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error"
      });
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
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome Back!
            </Typography>
          </Motion.div>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Log in to access your referral dashboard
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
                onClick={handleLogin}
              >
                Login
              </Button>
            </Motion.div>

            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/signup" 
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 'medium',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign up here
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

export default Login;
