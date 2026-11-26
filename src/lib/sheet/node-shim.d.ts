// @types/node er ikke installert (ingen nye avhengigheter). Minimale typer for google.ts.
declare module 'node:crypto' {
	export function createSign(algorithm: string): {
		update(data: string): void;
		sign(privateKey: string): { toString(encoding: 'base64url'): string };
	};
}

declare class Buffer extends Uint8Array {
	static from(data: string | Uint8Array | ArrayBuffer): Buffer;
	toString(encoding?: 'base64url' | 'utf8'): string;
}
