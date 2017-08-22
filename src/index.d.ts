export type Modifier = {
    [className: string]: any
} | string;

export interface ElementFactory {
    (elementName?: string|null, ...modifiers: Modifier[]): string;
    themed: (theme: string) => ElementFactory;
    add: (...classNames: Array<string | undefined>) => ElementFactory;
}

export function bem (blockElement: string, ...modifiers: Modifier[]): string

declare namespace BemFactory {
    export function block (blockName: string): ElementFactory;
    export function qa (blockName: string): ElementFactory;
}

export default BemFactory;
