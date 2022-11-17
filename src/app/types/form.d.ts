export type Data = "email" | "date" | "text" | "password";

export type Label = {
    name: string,
    title: string,
    placeholder: string,
    data: string,
    icon?: string,
}