import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type DashboardHeaderProps = {
  onAddWidget: () => void
}

export const DashboardHeader = ({ onAddWidget }: DashboardHeaderProps) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #2d3748',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 5 },
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" sx={{ color: '#e8eaed', fontWeight: 600 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#9aa0a6', mt: 0.5 }}>
            Customize your dashboard with widgets
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddWidget}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            backgroundColor: '#0066cc',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
            '&:hover': {
              backgroundColor: '#0073e6',
              boxShadow: '0 6px 16px rgba(0, 102, 204, 0.4)',
            },
          }}
        >
          Add Widget
        </Button>
      </Toolbar>
    </AppBar>
  )
}

