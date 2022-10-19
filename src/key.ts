import { INGEST_KEY_PREFIX } from "./constats.js";

export function validateKey(key: string) {
	if (!key) {
		throw new Error(
			`Missing authentication key for Loggie - please provide a valid key.`,
		);
	}

	if (!key.startsWith(INGEST_KEY_PREFIX)) {
		throw new Error(
			`Invalid authentication key for Loggie - please provide a valid key.`,
		);
	}
}
