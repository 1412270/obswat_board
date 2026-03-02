# OBSWAT Dashboard

A modern, customizable dashboard application built with React and TypeScript. This single-page application (SPA) provides a flexible widget-based interface where users can create, customize, and manage various data visualization widgets in a responsive grid layout.

## 🎯 Project Idea

OBSWAT Dashboard is a fully customizable dashboard platform that allows users to build personalized data visualization boards. The application features a drag-and-drop interface where users can add, remove, resize, and customize various widget types. Each widget can be individually configured with custom settings including appearance, data sources, and display options.

The dashboard is designed with a professional dark theme inspired by modern cybersecurity platforms, providing an intuitive and visually appealing user experience.

## ✨ Features

### Core Functionality

- **Drag & Drop Layout**: Resizable and draggable widgets using React Grid Layout
- **Responsive Design**: Adapts to different screen sizes (desktop, tablet, mobile)
- **Widget Management**: Add, remove, and customize widgets dynamically
- **Persistent Settings**: Widget configurations are saved and persist across sessions

### Available Widgets

1. **Weather Widget**
   - Real-time weather data from Open-Meteo API (no API key required)
   - Customizable location via latitude/longitude coordinates
   - Display options: Temperature, Humidity, Wind Speed, Weather Condition, Pressure
   - Auto-refreshes every 10 minutes
   - Loading and error states

2. **Counter Widget**
   - Animated number counter with smooth transitions
   - Time range selection: Today, This Week, This Month, This Year
   - Dynamic data generation based on selected time range
   - Data scales appropriately with time period

3. **Revenue Widget (Statistics)**
   - Revenue metrics display with trend indicators
   - Time range selection: Today, This Week, This Month, This Year
   - Scaled data based on selected time range
   - Percentage change indicators

4. **Clock Widget**
   - Real-time clock that updates every second
   - Multiple display styles:
     - **Text**: Simple time and date display
     - **Calendar**: Time display + full month calendar grid with current day highlighted
     - **Digital**: Digital clock with monospace font and dark background
   - Customizable title and subtitle

5. **Chart Widget (Data Visualization)**
   - Multiple chart types: Line, Bar, Area
   - Customizable colors and line width
   - Responsive sizing that dynamically adapts to panel size
   - Interactive tooltips and grid lines
   - Dual settings menu: Chart Settings and Widget Settings

6. **Info Card Widget**
   - Static information display
   - Customizable content and styling

### Widget Customization

Each widget supports extensive customization through settings dialogs:

- **Panel Name & Subtitle**: Custom titles for each widget
- **Text Color**: Choose from 8 predefined colors
- **Text Size**: Adjustable from 75% to 150% of normal size
- **Widget-Specific Settings**:
  - **Weather**: Location coordinates (latitude/longitude), display options (temperature, humidity, wind, etc.)
  - **Counter/Revenue**: Time range selection (Today, Week, Month, Year) via dropdown
  - **Clock**: Display style selection (Text, Calendar, Digital)
  - **Chart**: Chart type (Line, Bar, Area), color palette, line width

### Theme & Design

- **Dark Theme**: Professional dark blue/black color scheme
- **Modern UI**: Clean, minimalist design with smooth animations
- **Consistent Styling**: Material-UI components with custom theme
- **Hover Effects**: Interactive feedback on widgets and buttons

## 🛠️ Technologies Used

### Core Framework
- **React 19.2.0**: UI library for building the interface
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 7.3.1**: Fast build tool and development server

### UI Libraries
- **Material-UI (MUI) 7.3.8**: Component library and theming
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon set
  - `@emotion/react` & `@emotion/styled`: CSS-in-JS styling

### Layout & Grid
- **react-grid-layout 2.2.2**: Drag-and-drop grid layout system
- **react-resizable 3.1.3**: Resizable components

### Data Visualization
- **Recharts 3.7.0**: Charting library for React

### External APIs
- **Open-Meteo API**: Free weather data API (no API key required)
  - Documentation: https://open-meteo.com/en/docs

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting rules

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd obswat_board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 User Documentation

### Getting Started

1. **Adding Widgets**
   - Click the "Add Widget" button in the header
   - Select a widget type from the dialog
   - The widget will appear on your dashboard

2. **Moving Widgets**
   - Click and drag any widget to reposition it
   - The grid will automatically adjust other widgets

3. **Resizing Widgets**
   - Hover over the bottom-right corner of a widget
   - Click and drag to resize
   - Minimum and maximum sizes are enforced per widget type

4. **Customizing Widgets**
   - Click the settings icon (⚙️) on any widget
   - Adjust settings in the dialog:
     - Change panel name and subtitle
     - Select text color and size
     - Configure widget-specific options
   - Click "Done" to save changes

### Widget-Specific Guides

#### Weather Widget
1. Open settings from the widget
2. **Location**: Enter latitude and longitude coordinates
   - Default: Ho Chi Minh City (10.8231°N, 106.6297°E)
3. **Display Options**: Check/uncheck to show/hide:
   - Temperature (default: on)
   - Relative Humidity
   - Wind Speed
   - Weather Condition (default: on)
   - Sea Level Pressure
4. Weather data refreshes automatically every 10 minutes

#### Counter & Revenue Widgets
1. Open settings from the widget (settings icon ⚙️)
2. **Time Range**: Select from dropdown:
   - Today
   - This Week
   - This Month
   - This Year
3. Data automatically updates based on selected time range
4. The subtitle displays the current time range
5. Each time range shows different random data that scales with the period

#### Clock Widget
1. Open settings from the widget
2. **Display Style**: Choose from dropdown:
   - **Text**: Simple time and date display
   - **Calendar**: Shows time at top + full month calendar grid with current day highlighted
   - **Digital**: Digital clock display with monospace font
3. Customize panel name, subtitle, text color, and text size
4. Clock updates in real-time every second

#### Chart Widget
1. Click settings icon to open menu with two options
2. Choose **Chart Settings** for:
   - Chart Type: Line, Bar, or Area
   - Color: Select from Opswat-themed color palette
   - Line Width: Adjust slider (1-5)
3. Choose **Widget Settings** for:
   - Panel name and subtitle
   - Text color and size
4. Chart automatically resizes with panel dimensions

### Keyboard Shortcuts

- **Drag**: Click and hold widget, then move mouse
- **Resize**: Hover over widget corner, then drag
- **Remove**: Click the X icon in widget header

### Tips & Best Practices

- **Layout Planning**: Plan your widget layout before adding many widgets
- **Responsive Design**: Test your dashboard on different screen sizes
- **Widget Settings**: All widgets have settings buttons (⚙️) for customization
- **Weather Updates**: Weather data updates automatically every 10 minutes; no manual refresh needed
- **Chart Sizing**: Charts automatically adapt to panel size - resize panels to see charts adjust
- **Time Range Data**: Counter and Revenue widgets show different data for each time range
- **Clock Styles**: Try different clock display styles to find your preferred view
- **Statistics Widget**: The "Statistics" widget uses the Revenue widget type for metrics display

## 🏗️ Project Structure

```
obswat_board/
├── src/
│   ├── components/
│   │   ├── dialogs/          # Settings and configuration dialogs
│   │   │   ├── AddWidgetDialog.tsx
│   │   │   ├── AddWidgetDialog.tsx
│   │   │   ├── ChartSettingsDialog.tsx
│   │   │   ├── ClockSettingsDialog.tsx
│   │   │   ├── CounterRevenueSettingsDialog.tsx
│   │   │   ├── WeatherSettingsDialog.tsx
│   │   │   └── WidgetSettingsDialog.tsx
│   │   ├── widgets/          # Individual widget components
│   │   │   ├── ChartWidget.tsx
│   │   │   ├── ClockWidget.tsx
│   │   │   ├── CounterWidget.tsx
│   │   │   ├── InfoWidget.tsx
│   │   │   ├── RevenueWidget.tsx
│   │   │   ├── WeatherWidget.tsx
│   │   │   └── WidgetRenderer.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── DashboardGrid.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── WidgetCard.tsx
│   ├── constants/
│   │   └── widgets.constants.ts
│   ├── theme/
│   │   └── theme.ts          # Material-UI theme configuration
│   ├── types/
│   │   └── widget.types.ts  # TypeScript type definitions
│   ├── utils/
│   │   ├── weather.api.ts   # Weather API integration
│   │   └── widget.utils.ts
│   ├── App.tsx              # Main application component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Theme Customization

The application uses a custom Material-UI theme with the following color palette:

- **Primary Blue**: `#0066cc`
- **Secondary Cyan**: `#00a8e8`
- **Background Dark**: `#0a1929`
- **Card Background**: `#1a2332`
- **Header Background**: `#0f172a`
- **Text Primary**: `#e8eaed`
- **Text Secondary**: `#9aa0a6`
- **Border**: `#2d3748`

To customize the theme, edit `src/theme/theme.ts`.

## 🔧 Development

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Consistent component structure
- Type-safe props and state

### Adding New Widgets

1. Create widget component in `src/components/widgets/`
2. Add widget type to `src/types/widget.types.ts`
3. Register in `src/components/widgets/WidgetRenderer.tsx`
4. Add to `AddWidgetDialog.tsx` options
5. Define default layout in `src/utils/widget.utils.ts`

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is an assessment project. For questions or issues, please contact the project maintainer.

---

**Built with ❤️ using React, TypeScript, and Material-UI**
