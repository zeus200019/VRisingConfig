# V Rising Server Configuration Tool

[中文](../README.md) | EN

![Version](https://img.shields.io/badge/Version-0.1.0-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![License](https://img.shields.io/badge/License-Apache--2.0-green)

## 📖 Project Introduction

The V Rising Server Configuration Tool is a modern web application designed to simplify the configuration process of V Rising game servers. Through an intuitive user interface, administrators can easily adjust various game parameters and export compatible JSON configuration files.

This tool integrates all configurable options for V Rising, including game modes, resource modifiers, castle systems, PVP settings, etc., making server management simpler and more efficient.

![Homepage Preview](/public/img/index.png)

## ✨ Key Features

- **Intuitive User Interface**: Modern, responsive design suitable for various devices
- **Comprehensive Configuration Options**: Contains all configurable parameters for V Rising
- **Real-time Visualization**: Intuitive display of day-night cycles, resource rates, and other parameters
- **Import/Export Functionality**: Convenient JSON configuration import and export
- **Modular Design**: Clearly categorized configuration modules
- **Default Presets**: Default configurations based on official recommendations

## 🛠️ Technology Stack

- **Next.js 15.2.2**: React framework for server-side rendering and static generation
- **React 19.0.0**: User interface library
- **TypeScript 5**: Type-safe JavaScript superset
- **CSS Modules**: Component-level style isolation

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/zeus200019/VRisingConfig.git
cd VRisingConfig
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit http://localhost:3000

### Production Build

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 📋 Configuration Modules

This tool includes the following configuration modules:

### Basic Information Configuration
- Server name and description settings

### Game Mode Settings
- Game difficulty (Easy/Normal/Hard)
- Game mode (PVP/PVE/No Castle Destruction PVP)
- Death drop and item binding rules

### Resource Modifier Settings
- Resource gathering rates
- Cost rates
- Building and research speed
- Merchant currency drop rates

### Game Time Settings
- Day-night cycle length
- Day/night duration ratio
- Blood moon frequency and duration

### Combat System Settings
- Vampire ability rates
- Enemy health and damage rates
- Equipment attribute rates

### Castle System Settings
- Castle quantity limits
- Castle heart level limits
- Maximum number of various castle structures

### PVP System Settings
- Player damage modes
- Castle damage rules
- Siege time and protection time

### Mortium Rift Settings (War Activities)
- Activity time settings
- Player count scaling

## 💾 Configuration Import/Export

### Export Configuration
1. After adjusting all parameters, enter the "Configuration Management" module
2. Click the "Copy JSON" button to copy the configuration to the clipboard, or click "Download Configuration File"

### Import Configuration
1. Enter the "Configuration Management" module
2. Click the "Import Configuration" button
3. Select a valid V Rising server configuration JSON file
4. Confirm import to apply settings

## 📱 Responsive Design

The tool supports various devices:
- Desktop computers
- Tablets
- Mobile devices

The interface automatically adjusts according to screen size, ensuring a good user experience on any device.

## ⚠️ Disclaimer

This tool is an unofficial third-party tool with no affiliation with V Rising game developer Stunlock Studios. Use of this tool is at the user's own risk. We are not responsible for any server failures, data loss, or gameplay issues resulting from the use of this tool.

V Rising and its related images, logos, and content are owned by Stunlock Studios. This tool is only for helping with server management and does not provide any copying or distribution of game content.

Detailed disclaimer content can be viewed within the tool.

## 🔧 Development Guide

### Project Structure

```
vrising-server-config/
├── public/               # Static resources
├── src/                  # Source code
│   ├── app/              # Next.js application pages
│   │   ├── Layout/       # Layout components
│   │   ├── ServerConfig/ # Server configuration components
│   │   └── ui/           # UI basic components
│   ├── contexts/         # React contexts
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

### Adding New Configuration Items

1. Define new configuration item types in the appropriate context
2. Implement UI elements in the corresponding component files
3. Ensure new configuration items are included in import/export functionality

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details

## 👥 Contribution

Contributions are welcome! Please feel free to submit issue reports or feature suggestions. If you want to contribute code, please create an issue first to discuss your ideas.

## 📢 Acknowledgements

- [V Rising](https://www.playvrising.com/) - For providing this excellent game
- [Stunlock Studios](https://www.stunlockstudios.com/) - Game developer
- And all those who have contributed to this project 