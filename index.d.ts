declare module 'ngTree' {
	export interface TreeData {
	    [key: string]: any;
	    name?: string;
	    isOpen?: boolean;
	    iconSelector?: string;
	    nameSelector?: string;
	    children?: TreeData[];
	    isChecked?: string;
	}
	export interface TreeDataMap {
	    name?: string;
	    isOpen?: string;
	    iconSelector?: string;
	    nameSelector?: string;
	    children?: string;
	    isChecked?: string;
	}
	export interface TreeConfig {
	    onFold?: (node?: any) => boolean;
	    onClick?: (node?: any) => void;
	    dataFilter?: (nodeData?: any) => any;
	}
	export class NgTree {
	    static DATAMAP: TreeDataMap;
	    private parent;
	    private isSub;
	    private treeData;
	    private treeContext;
	    private treeMap;
	    private treeConfig;
	    ngOnChanges(changes: any): void;
	    private tData;
	    ngOnInit(): void;
	    private openNode(node, e);
	    private nodeClick(node, e);
	}

}
