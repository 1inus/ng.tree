declare module 'ng.tree' {
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
	    onToolClick?: (node?: any, toolName?: string) => void;
	    dataFilter?: (nodeData?: any) => any;
	    tools?: {
	        name: string;
	        title?: string;
	    }[];
	    enableTools?: boolean;
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
	export class NgTree {
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
	    searchNodes(condition: {
	        [key: string]: any;
	    }): any[];
	    private filter(value, condition);
	    findNodeSiblings(node: any): any[];
	    findNodeParent(node: any): any;
	    private ngOnChanges(changes);
	    private tData;
	    private ngOnInit();
	    private ngDoCheck();
	    private openNode(node, e);
	    private nodeClick(node, e);
	    private onEdit(node, e);
	}

}
