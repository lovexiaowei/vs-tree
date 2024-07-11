export default class Context {
    constructor(tree: any);
    tree: any;
    save(): void;
    restore(): void;
}
