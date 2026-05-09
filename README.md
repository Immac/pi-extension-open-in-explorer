# Open in Explorer

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Pi Extension](https://img.shields.io/badge/pi--extension-command-orange?style=flat-square)

Opens the session's current working directory in your OS default file explorer. Cross-platform — works on Linux, macOS, and Windows.

## Features

- 📂 Opens `ctx.cwd` in the native file manager
- 🖥️ Cross-platform: `xdg-open` (Linux), `open` (macOS), `explorer` (Windows)
- ⚡ Detached process — pi keeps running without waiting for the explorer to close
- 🔔 Notifies you whether the operation succeeded or failed

## Command

| Command | Description |
|---------|-------------|
| `/explorer` | Open the current working directory in the file explorer |

## Quick Start

### Install

```bash
pi install ./path/to/open-in-explorer
```

### Use

In any session, type:

```
/explorer
```

Your OS file manager opens showing the current project directory.

## How It Works

The extension reads `ctx.cwd` (the session's current working directory), then spawns the appropriate platform command:

- **Linux**: `xdg-open <dir>`
- **macOS**: `open <dir>`
- **Windows**: `explorer <dir>`

The child process is detached and unref'd, so pi doesn't wait for the file explorer to close.

## Development

```bash
npm install
npx tsc --noEmit   # type-check only (JS at runtime, no build step)
```

## License

MIT
