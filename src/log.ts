import { fetch } from "./fetch.js";
import { DEFAULT_INGEST_HOST, LogSeverity } from "./constats.js";

/**
 * Logs a message to Loggie.
 * @param {LogSeverity} severity The severity of the log message.
 * @param {string} content The content of the log message.
 * @param {string=} source The source of the log message. (Optional)
 * @returns {Promise<boolean>} A promise that resolves to `true` if the log message was successfully sent to Loggie.
 * @example
 * ```ts
 * loggie.log("INFO", "Hello, world!", "my-app");
 * ```
 */
export async function log(
	severity: LogSeverity,
	content: string,
	source: string,
	ingestKey: string,
): Promise<boolean> {
	const response = await fetch(DEFAULT_INGEST_HOST + "/log", {
		method: "POST",
		body: JSON.stringify({
			severity,
			content,
			source,
		}),
		headers: {
			"Authorization": `Bearer ${ingestKey}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		return false;
	}

	if (!JSON.parse(await response.text()).status) {
		return false;
	}

	return true;
}
