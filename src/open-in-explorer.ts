/**
 * Open in Explorer Extension
 *
 * Adds an /explorer command that opens the session's current working directory
 * in the OS default file explorer.
 *
 * Cross-platform:
 *   - Linux: xdg-open
 *   - macOS: open
 *   - Windows: explorer
 */

import { spawn } from "node:child_process";
import { platform } from "node:os";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function getOpenCommand(target: string): { cmd: string; args: string[] } {
	switch (platform()) {
		case "darwin":
			return { cmd: "open", args: [target] };
		case "win32":
			// explorer.exe handles forward slashes fine, but use backslashes for safety
			return { cmd: "explorer", args: [target.replace(/\//g, "\\")] };
		default:
			// Linux and other Unix-like
			return { cmd: "xdg-open", args: [target] };
	}
}

function openInExplorer(target: string): Promise<void> {
	const { cmd, args } = getOpenCommand(target);

	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, {
			stdio: "ignore",
			detached: true, // Don't block the parent process
			windowsHide: true,
		});

		// Unref so pi doesn't wait for the explorer process
		child.unref();

		child.on("error", (err) => {
			reject(new Error(`Failed to open explorer: ${err.message}`));
		});

		// Resolve immediately — the explorer process manages itself
		child.on("spawn", () => {
			resolve();
		});
	});
}

export default function (pi: ExtensionAPI) {
	pi.registerCommand("explorer", {
		description: "Open the current working directory in the OS file explorer",

		handler: async (_args, ctx) => {
			const dir = ctx.cwd;

			try {
				await openInExplorer(dir);
				ctx.ui.notify(`Opened ${dir} in file explorer`, "info");
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				ctx.ui.notify(`Failed: ${message}`, "error");
			}
		},
	});
}
