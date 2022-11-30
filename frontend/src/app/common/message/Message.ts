export class Message {
    title: string;
    description: string;
    level: "info" | "danger" | "confirm";
    timeout?: number;
    icon?: string;

    constructor(title: string, description: string, level: "info" | "danger" | "confirm", timeout?: number, icon?: string) {
        this.title = title;
        this.description = description;
        this.level = level;
        this.timeout = timeout;
        this.icon = icon;
    }
}