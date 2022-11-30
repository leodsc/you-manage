export type Requirement = {
    text: string,
    validation: (value: string) => boolean,
    isValid?: boolean,
}

export type AppForm = {
    htmlFor: string,
    type: string,
    placeholder: string,
    title: string,
    model: any,
    name: string,
    pattern?: string,
    showAllRequirements?: boolean,
    requirements?: Requirement[],
    transform?: (value: string) => string
}