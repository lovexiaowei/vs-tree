export default class Node {
    constructor(ops: any);
    id: number;
    checked: any;
    expanded: boolean;
    indeterminate: boolean;
    visbile: boolean;
    disabled: any;
    enterGap: number;
    loaded: boolean;
    isLeaf: boolean;
    level: any;
    childNodes: any[];
    store: any;
    parent: any;
    originData: any;
    __buffer: {};
    data: any;
    initData(): void;
    createNode(): HTMLDivElement;
    dom: HTMLDivElement | undefined;
    createInner(): HTMLDivElement;
    loadingEl: HTMLSpanElement | undefined;
    cusmtomNode(name: any, info: any): any;
    createContent(): any;
    createExpandEmpty(): HTMLSpanElement;
    createExpand(): HTMLSpanElement;
    expandEl: HTMLSpanElement | undefined;
    createCheckbox(): HTMLLabelElement;
    radioNode: HTMLInputElement | undefined;
    checkboxNode: HTMLInputElement | undefined;
    checkboxEl: HTMLInputElement | undefined;
    handleCheckChange(e: any): void;
    createText(): any;
    createIcon(): HTMLSpanElement;
    setData(data: any): void;
    insertChild(child: any, index: any): any;
    insertBefore(child: any, ref: any): void;
    insertAfter(child: any, ref: any): void;
    updateExpand(expand: any): void;
    updateChecked(check: any, isInitDefault: any): void;
    sortId: number | undefined;
    updateCheckedParent(_checked: any, isInitDefault: any): void;
    updateRadioChecked(checked: any, isInitDefault: any): void;
    setChecked(checked: any, isInitDefault: any): void;
    setDisabled(disabled?: boolean): void;
    setExpandAll(expand: any, noUpdate: any): void;
    setExpand(expand: any, noUpdate: any): void;
    storeUpdate(): void;
    createAnimation(): void;
    transitionNode: HTMLDivElement | undefined;
    createDraggable(dom: any): void;
    handleLastDrop(dragNode: any, enterGap: any): void;
    setAccordion(expand: any): void;
    loadData(callback: any): void;
    loading: boolean | undefined;
    remove(): void;
    setTitle(title: any): void;
    getSon(level: any): any;
    append(data: any): void;
    unshift(data: any): void;
}
