# NoteMark 📝

A beautiful markdown note-taking app built with Electron and React.

## Features

- ✨ Clean, modern interface
- 📝 Rich markdown editing
- 🗂️ Note organization and management
- 🎨 Beautiful UI with dark/light theme support
- 💾 Local file storage
- 🚀 Fast and responsive

## Installation

### macOS
1. Download the `NoteMark-Mac-1.0.0.dmg` file from the releases
2. Double-click the DMG file to mount it
3. Drag the NoteMark app to your Applications folder
4. Launch NoteMark from your Applications folder

### Windows
1. Download the `NoteMark-Windows-1.0.0-Setup.exe` file
2. Run the installer and follow the setup wizard
3. Launch NoteMark from the Start menu

### Linux
1. Download the `NoteMark-Linux-1.0.0.AppImage` file
2. Make it executable: `chmod +x NoteMark-Linux-1.0.0.AppImage`
3. Run the AppImage file

## Usage

1. **Create a new note**: Click the "+" button or use Cmd/Ctrl+N
2. **Edit notes**: Use the built-in markdown editor with live preview
3. **Organize**: Your notes are automatically saved to your local file system
4. **Search**: Use the search functionality to find your notes quickly

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Build for specific platform
npm run build:mac
npm run build:win
npm run build:linux
```

## Building from Source

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the app: `npm run build`
4. Find the distributable in the `release/` folder

## License

MIT License - feel free to use and modify as needed!

---

**Note**: This is a local-first application. Your notes are stored on your device and are not synced to any cloud service.
