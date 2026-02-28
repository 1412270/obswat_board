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
      color="transparent"
      sx={{ borderBottom: '1px solid #e5e7eb', bgcolor: 'transparent' }}
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
          <Typography variant="h5" component="h1">
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize your dashboard with widgets
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddWidget}
          sx={{
            borderRadius: 999,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            boxShadow: '0 10px 25px rgba(15,23,42,0.25)',
          }}
        >
          Add Widget
        </Button>
      </Toolbar>
    </AppBar>
  )
}

