import BotClient from "./Client";
import { IGuild } from "../typings";
import { UserResolvable } from "discord.js";

export default class Util {
    constructor(public client: BotClient) {}
    public base64 = {
        encode: (text: string): string => {
            return Buffer.from(text).toString("base64");
        },
        decode: (base64: string): string => {
            return Buffer.from(base64, "base64").toString();
        }
    };

    public hex = {
        encode: (text: string): string => {
            return Buffer.from(text).toString("hex");
        },
        decode: (hex: string): string => {
            return Buffer.from(hex, "hex").toString();
        }
    };

    public async hastebin(text: string): Promise<string> {
        const { body } = await this.client.request.post("https://bin.hzmi.xyz/documents")
            .send(text);
        return `https://bin.hzmi.xyz/${body.key}`;
    }

    public getAvatar(user: UserResolvable | any): string {
        return this.client.users.resolve(user)!.displayAvatarURL({ format: "png", size: 2048, dynamic: true });
    }

    public getGuildIcon(guild: IGuild): string | any {
        return guild.iconURL({ format: "png", size: 2048, dynamic: true });
    }

    public bytesToSize(bytes: number): string {
        if (isNaN(bytes) && bytes != 0) throw new Error(`[bytesToSize] (bytes) Error: bytes is not a Number/Integer, received: ${typeof bytes}`);
        const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
        if (bytes < 2 && bytes > 0) return `${bytes} Byte`;
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
        if (i == 0) return bytes + " " + sizes[i];
        if (sizes[i] === undefined) return bytes + " " + sizes[sizes.length - 1];
        return Number(bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
    }

    public parseDur(ms: number): string {
        let seconds = ms / 1000;
        const days = parseInt((seconds / 86400).toString());
        seconds = seconds % 86400;
        const hours = parseInt((seconds / 3600).toString());
        seconds = seconds % 3600;
        const minutes = parseInt((seconds / 60).toString());
        seconds = parseInt((seconds % 60).toString());


        if (days) {
            return `${days}d ${hours}h ${minutes}min ${seconds}s`;
        } else if (hours) {
            return `${hours}h ${minutes}min ${seconds}s`;
        } else if (minutes) {
            return `${minutes}min ${seconds}s`;
        }
        return `${seconds}s`;
    }

    public trimArray(arr: string[], length = 10): string[] {
        const len = arr.length - length;
        const temp = arr.slice(0, length);
        temp.push(`...${len} more.`);
        return temp;
    }

    public percentOf(num: number, prcnt: number): number {
        if (!num || isNaN(num)) throw new Error(`[percentOf] (num) Error: num is not a Number/Integer, received: ${typeof num}`);
        if (!prcnt || isNaN(prcnt)) prcnt = 100;
        const number = Number(num);
        const percent = Number(prcnt);
        const result = percent / 100 * number;
        return result;
    }

    public getPercentage(percentFor: number, percentOf: number): string {
        if (!percentFor || isNaN(percentFor)) throw new Error(`[getPercentage] (percentFor) Error: percentFor is not a Number/Integer, received: ${typeof percentFor}`);
        if (!percentOf || isNaN(percentOf)) throw new Error(`[getPercentage] (percentOf) Error: percentOf is not a Number/Integer, received: ${typeof percentOf}`);
        const percentage = Math.floor(percentFor / percentOf * 100);
        return `${percentage}%`;
    }

    public codeblock(text: string, code: string): string {
        return `\`\`\`${code}\n${text}\`\`\``;
    }

    public getFirstLetter(string: string): string {
        return string.split("")[0];
    }
}