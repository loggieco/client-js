import { LogSeverity } from "./constats.js";
import { validateKey } from "./key.js";
import { log } from "./log.js";

export type Options = {
	key: string; // Starts with "iak_"
	ingestHost?: string; // default: "https://in.loggie.co"
};

/**
 * Constructs a new instance of the Loggie client.
 *
 * @example
 * ```ts
 * const loggie = new Loggie({
 *   key: "iak_xxx",
 * });
 * loggie.log("INFO", "Hello, world!");
 * ```
 * @param {Options} options
 * @param {string} options.key The Loggie ingest key. Starts with `iak_`.
 * @param {string=} options.ingestHost The Loggie ingest host. Defaults to "https://in.loggie.co".
 */
export class Loggie {
	public readonly log;

	constructor(options: Options) {
		validateKey(options.key);

		if (!options.key) {
			throw new Error(
				"Missing authentication key to `new Loggie()` - please provide a valid key.",
			);
		}

		/**
		 * Logs a message to Loggie.
		 * @param {LogSeverity} severity The severity of the log message.
		 * @param {String} content The content of the log message.
		 * @param {String=} source The source of the log message. (Optional)
		 * @returns {Promise<boolean>} A promise that resolves to `true` if the log message was successfully sent to Loggie.
		 */
		this.log = async (
			severity: LogSeverity,
			content: string,
			source: string,
		) => {
			const source_not_null = source || "UNKNOWN";

			return await log(severity, content, source_not_null, options.key);
		};
	}
}
