import './App.css'
import { Button, Container, Typography, Box, Grid, Card, CardContent, useTheme, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MonetizationOn, People, Rocket, Security } from '@mui/icons-material';

const App = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <MonetizationOn sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Earn Rewards",
      description: "Get $50 for every successful referral. The more friends join, the more you earn!"
    },
    {
      icon: <People sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: "Easy Sharing",
      description: "Share your unique referral link via email, social media, or any platform you prefer."
    },
    {
      icon: <Rocket sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: "Instant Tracking",
      description: "Track your referrals and rewards in real-time through your personalized dashboard."
    },
    {
      icon: <Security sx={{ fontSize: 40, color: theme.palette.error.main }} />,
      title: "Secure System",
      description: "Your referrals and rewards are protected by our secure tracking system."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "$500K", label: "Rewards Paid" },
    { number: "50K+", label: "Successful Referrals" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Share & Earn
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Join our referral program and earn rewards for every friend you bring on board.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate("/signup")}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://illustrations.popsy.co/white/success.svg"
                alt="Referral Illustration"
                sx={{ 
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  margin: 'auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Why Choose Our Referral Program?
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Discover the benefits of our easy-to-use referral system
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.dark',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Ready to Start Earning?
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who are already earning rewards through our referral program.
          </Typography>
          <Button 
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
            sx={{ 
              bgcolor: 'white',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
