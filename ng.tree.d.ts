import { ViewContainerRef } from '@angular/core';
export interface TreeData {
    [key: string]: any;
    name?: string;
    isOpen?: boolean;
    iconClass?: string | boolean;
    nameClass?: string;
    children?: TreeData[];
    isChecked?: boolean;
    tools?: {
        name: string;
        title?: string;
    }[];
}
export interface TreeConfig {
    onFold?: (node?: any) => boolean;
    onClick?: (node?: any) => void;
    onToolClick?: (event: MouseEvent, node?: any, toolName?: string) => void;
    onDragstart?: (event: MouseEvent, node?: any, parent?: any, siblings?: any, index?: number) => boolean;
    onDrop?: (event: MouseEvent, node?: any, parent?: any, sibliings?: any, index?: number, position?: string) => void;
    onDragover?: (event: Event, node?: any, parent?: any, sibliing?: any, index?: number) => boolean;
    dataFilter?: (nodeData?: any) => any;
    tools?: {
        name: string;
        title?: string;
    }[];
    enableTools?: boolean;
    enableDrag?: boolean;
    dataMap?: {
        name?: string;
        isOpen?: string;
        iconClass?: string;
        nameClass?: string;
        children?: string;
        isChecked?: string;
        tools?: string;
        enableTools?: string;
    };
}
export declare class NgTree {
    static DATAMAP: any;
    private treeElement;
    private treeRoot;
    constructor(view: ViewContainerRef);
    private parent;
    private isSub;
    private treeData;
    private treeContext;
    private treeConfig;
    private treeMap;
    private isOpen;
    private openTimeout;
    private closeTimeout;
    private nodeCount;
    searchNodes(nodes: any[], condition: string | {
        [key: string]: any;
    }, ignoreCase?: boolean): any[];
    private filter(nodes, condition, ignoreCase?);
    findNodeSiblings(node: any): any[];
    findNodeParent(node: any): any;
    private ngOnChanges(changes);
    private tData;
    private ngOnInit();
    private ngDoCheck();
    private openNode(node, e);
    private nodeClick(node, e);
    private onEdit(node, e);
    private dragstart(e, node, index);
    private dragenter(e, node);
    private dragleave(e, node);
    private dragover(e, node, index, max);
    private drop(e, node, index);
    private dragend(e, node, index);
}
