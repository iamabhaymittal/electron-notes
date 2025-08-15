# Distribution Guide 🚀

Your NoteMark app is now ready for distribution! Here's how to share it with friends:

## What You Have

✅ **macOS DMG**: `release/1.0.0/NoteMark-Mac-1.0.0.dmg` (152 MB)
- This is a disk image that macOS users can easily install from
- Perfect for sharing with friends who use Mac

## How to Share

### Option 1: Direct File Sharing
1. **Upload to cloud storage** (Google Drive, Dropbox, etc.)
2. **Share the link** with your friends
3. **They download and install** the DMG file

### Option 2: Create a Simple Website
1. Upload the DMG to a web server
2. Create a simple download page
3. Share the website URL

### Option 3: Use GitHub Releases
1. Create a GitHub repository
2. Upload the DMG as a release asset
3. Share the release URL

## Installation Instructions for Friends

### For macOS Users:
1. **Download** the `NoteMark-Mac-1.0.0.dmg` file
2. **Double-click** the DMG file (it will mount like a disk)
3. **Drag** the NoteMark app to your Applications folder
4. **Launch** NoteMark from Applications
5. **First time**: Right-click and select "Open" if you get a security warning

### Troubleshooting:
- If you get "unidentified developer" error:
  - Go to System Preferences → Security & Privacy
  - Click "Open Anyway" for NoteMark
  - Or right-click the app and select "Open"

## Building for Other Platforms

If you want to support Windows and Linux users:

```bash
# Build for Windows
npm run build:win

# Build for Linux  
npm run build:linux
```

## File Sizes
- **macOS DMG**: ~152 MB
- **Windows Setup**: ~150 MB (estimated)
- **Linux AppImage**: ~150 MB (estimated)

## Next Steps

1. **Test the DMG** on your Mac to make sure it works
2. **Share with a friend** to get feedback
3. **Consider code signing** for better security (optional)
4. **Add an icon** to make it look more professional

## Security Note

The app is currently unsigned, which means:
- macOS may show a security warning
- Users need to "Open Anyway" the first time
- This is normal for personal/amateur apps
- Code signing requires an Apple Developer account ($99/year)

---

🎉 **Congratulations!** Your app is ready to share with the world!
