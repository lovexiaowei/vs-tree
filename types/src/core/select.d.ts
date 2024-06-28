export default class Select {
    constructor(store: any);
    list: any[];
    store: any;
    addNode(node: any): void;
    shiftAdd(node: any, pre: any): void;
    has(node: any): boolean;
    moveTo(node: any): void;
    clear(): void;
}
