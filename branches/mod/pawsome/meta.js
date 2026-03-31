import { rm } from "fs/promises";
import { createWriteStream, mkdirSync } from "fs";
import { join } from "path";
import { Writable } from "stream";

export const name = "Pawsome";
export const description =
	"Injects Pawsome (an Equicord fork); This is not an officially supported Vencord install method";
export const incompatibilities = ["betterdiscord", "vencord", "moonlight", "equicord"];

export async function setup(target, log) {
	const releaseUrl = "https://github.com/enzomtpYT/PawsomeVencord/releases/download/latest/";

	mkdirSync(join(target, "pawsome-desktop"), { recursive: true });

	for (const f of ["pawtopMain.js", "pawtopPreload.js", "renderer.js", "renderer.css"]) {
		log(`Downloading ${f}...`);

		const p = join(target, "pawsome-desktop", f);
		await rm(p, { force: true });

		const req = await fetch(releaseUrl + f);
		await req.body.pipeTo(Writable.toWeb(createWriteStream(p)));
	}

	log("Done!");
}
