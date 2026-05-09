# open-in-explorer Architecture

## Purpose

A pi.dev **command** extension.

## System Components

### Main Entrypoint

The primary extension logic is registered via `pi.registerTool()` and/or `pi.registerCommand()`.

### Source Files

- `package-lock.json`
- `package.json`
- `src/open-in-explorer.ts`
- `tsconfig.json`

## Key Principles

- Tool-first interface over command sprawl
- External workspace development, not in pi runtime folders
- TypeScript-first implementation
- Explicit entrypoint with named files
- Always validate before install
