/**
 * Created by lwei on 2017/4/15.
 */

import { Component, Input, ViewContainerRef } from '@angular/core';

export interface TreeData {
	[key: string]: any;

	/**
	 * tree node name
	 */
	name?: string;

	/**
	 * collapse or not(node has subtree)
	 */
	isOpen?: boolean;

	/**
	 * a class selector add to icon element, false to disable node icon
	 */
	iconClass?: string | boolean;

	/**
	 * a class selector add to name element
	 */
	nameClass?: string;

	/**
	 * sub tree data
	 */
	children?: TreeData[];

	/**
	 * is checked
	 */
	isChecked?: boolean;

	/**
	 *
	 */
	tools?: { name: string, title?: string }[];
}

/*配置*/
export interface TreeConfig {
	/**
	 * execute before treenode collapse or uncollapse
	 * @param node
	 */
	onFold?: (node?: any) => boolean;

	/**
	 * trigger on mouse right click (DilipKumar katre addded on 12 dec 2017)
	  * @param mouse event
	 * @param node
	 */
  onClick?: (node?: any) => void;
  /**
	 * trigger on icon or name click
	 * @param node
	 */
  onContextMenu?: (event: MouseEvent,node?: any) => void;
	/**
	 * trigger on tool button click
	 * @param node
	 * @param toolName
	 */
	onToolClick?: (event: MouseEvent, node?: any, toolName?: string) => void;

	/**
	 * @param event dragstart event object
	 * @param node 
	 * @param parent node parent
	 * @param siblings node siblings
	 * @param index node index
	 */
	onDragstart?: (event: MouseEvent, node?: any, parent?: any, siblings?: any, index?: number) => boolean;

	/**
	 * @param event drop event object
	 * @param node 
	 * @param parent node parent
	 * @param siblings node siblings
	 * @param index node index
	 * @param position "top", "middle", "bottom"
	 */
	onDrop?: (event: MouseEvent, node?: any, parent?: any, sibliings?: any, index?: number, position?: string) => void;

	/**
	 * @param event dragover event object
	 * @param node 
	 * @param parent node parent
	 * @param siblings node siblings
	 * @param index node index
	 * 
	 * @return return true to enable drop
	 */
	onDragover?: (event: Event, node?: any, parent?: any, sibliing?: any, index?: number) => boolean;

	/**
	 * @param event dragover event object
	 * @param node 
	 * @param parent node parent
	 * @param siblings node siblings
	 * @param index node index
	 * 
	 * @return return true to enable drop
	 */
	onDragend?: (event: Event, node?: any, parent?: any, sibliing?: any, index?: number) => boolean;

	/**
	 * TODO
	 */
	/*onDrop? : (sourceNode?:any, targetNode?:any) => boolean;
	
	searchText?:string;*/

	/**
	 * format customized data to TreeData. effect on tree init
	 * @param nodeData
	 */
	dataFilter?: (nodeData?: any) => any;

	/**
	 *
	 */
	tools?: { name: string, iconClass: string, title?: string }[];

	/**
	 *
	 */
	enableTools?: boolean;

	enableDrag?: boolean;

	/**
	 * format customized data to TreeData
	 */
	dataMap?: {
		/**
		 * default to "name"
		 */
		name?: string;

		/**
		 * deafult to 'isOpen'
		 */
		isOpen?: string;

		/**
		 * default to "iconClass"
		 */
		iconClass?: string;

		/**
		 * default to "nameClass"
		 */
		nameClass?: string;

		/**
		 * default to "children"
		 */
		children?: string;

		/**
		 * default to "isChecked"
		 */
		isChecked?: string;

		/**
		 * default to "tools"
		 */
		tools?: string;

		/**
		 * default to "enableTools"
		 */
		enableTools?: string;
	}
}

@Component({
	selector: 'ngTree',
	template:
	`<div class="ngtree_node" *ngFor="let n of tData;let i = index">
	<div class="ngtree_node_info"
	[attr.draggable]="treeConfig.enableDrag ? true:false"
	(drop)="drop($event, n, i, tData.length)"
	(dragend)="dragend($event, n, i, tData.length)"
	(dragover)="dragover($event, n, i, tData.length)"
	(dragstart)="dragstart($event, n, i, tData.length)"
	(dragenter)="dragenter($event, n, i, tData.length)"
	(dragleave)="dragleave($event, n, i, tData.length)"

	[ngClass]="{ngtree_folder: n[treeMap.children], ngtree_node_open:n[treeMap.isOpen], ngtree_node_selected:n[treeMap.isChecked]}">
		<div class="ngtree_connect" (click)="openNode(n, $event)"></div>
		<div (click)="nodeClick(n, $event)" class="ngtree_node_info_wraper">
			<div class="{{n[treeMap.iconClass]}} ngtree_node_icon {{!(n[treeMap.iconClass])?'ngtree_folder_icon':''}}"
				[ngClass]="{tree_icon_hide:n[treeMap.iconClass]==false}"></div>
			<div (contextmenu)="nodeContextClick(n, $event)" class="ngtree_node_name {{n[treeMap.nameClass]}}">{{n[treeMap.name]}}</div>
			<div class="ngtree_node_toolbar" (click)="onEdit(n, $event)" *ngIf="n[treeMap.enableTools]!=false && (treeConfig.tools||treeData.tools)">
				<div class="{{t.iconClass}}" [attr.data-name]="t.name" *ngFor="let t of (n[treeMap.tools] || treeConfig.tools)" title="{{t.title}}"></div>
			</div>
		</div>
	</div>
	<ngTree 
		class="sub_ngtree"
		[isSub]="true"
		[parent]="n"
		[treeMap]="treeMap"
		[treeConfig]="treeConfig"
		[treeContext]="treeContext"
		[isOpen]="n[treeMap.isOpen]"
		[(treeData)]="n[treeMap.children]"></ngTree>
</div>`,
	styleUrls: [/*Right Click Pane style urls*/]
})
export class NgTree {
	static DATAMAP: any = {
		name: "name",
		tools: "tools",
		isOpen: "isOpen",
		children: "children",
		iconClass: "iconClass",
		nameClass: "nameClass",
		isChecked: "isChecked",
		enableTools: "enableTool"
	}

	private treeElement: any;
	private treeRoot: any;

	constructor(view: ViewContainerRef) {
		this.treeElement = view.element.nativeElement;
	}

	@Input() private parent: any;
	@Input() private isSub: boolean;
	@Input() private treeData: any[];
	@Input() private treeContext: any;
	@Input() private treeConfig: TreeConfig;
	@Input() private treeMap: any;
	@Input() private isOpen: any;

	private openTimeout: any;
	private closeTimeout: any;

	private nodeCount: number = 0;

	/**
	 * only work for tree root instance
	 * @param node 
	 * @return search nodes
	 */
	public searchNodes(nodes: any[], condition: string | { [key: string]: any }, ignoreCase?: boolean): any[] {
		if (!this.treeRoot) {
			console.error("please search from tree root");
			return;
		}

		let stack: any[] = [];
		let vals: any[] = [];

		//搜索第一层
		vals = vals.concat(this.filter((nodes ? nodes : this.treeRoot), condition));

		//先将第一层节点放入栈
		this.treeRoot.forEach((item: any) => {
			stack.push(item);
		});

		let item, children;
		while (stack.length) {
			item = stack.shift();
			children = item[this.treeMap.children];

			if (children && children.length) {
				vals = vals.concat(this.filter(children, condition));
				stack = stack.concat(item.children);
			}
		}

		return vals;
	}

	private filter(nodes: any[], condition: string | { [key: string]: any }, ignoreCase?: boolean): any[] {
		nodes = nodes || this.treeRoot;
		if (!condition) return nodes;

		let argType = typeof condition;

		if (argType == "string") {
			condition = (<string>condition).trim();
			if (condition == "") {
				return nodes;
			}

			if (ignoreCase) {
				condition = condition.toUpperCase();
			}

			return nodes.filter((o) => {
				if (!o) return;
				let val;
				return Object.keys(o).some((k) => {
					val = o[k];
					if (typeof val == "string") {
						if (ignoreCase) {
							return val.toUpperCase().indexOf((<string>condition)) > -1;
						} else {
							return val.indexOf((<string>condition)) > -1;
						}
					} else {
						return false;
					}
				})
			});
		} else if (argType === 'object') {
			return nodes.filter((o) => {
				if (!o) return o;
				return Object.keys(condition).every((k) => {
					return o[k] == (<any>condition)[k];
				})
			});
		} else {
			return nodes;
		}
	}

	/**
	 * only work for tree root instance
	 * @param node 
	 * @return siblings include itself
	 */
	public findNodeSiblings(node: any): any[] {
		if (!this.treeRoot) {
			console.error("please find from tree root");
			return;
		}

		let stack: any[] = [];

		if (this.treeRoot.indexOf(node) > -1) {
			return this.treeRoot;
		}

		//先将第一层节点放入栈
		this.treeRoot.forEach((item: any) => {
			stack.push(item);
		});

		let item, children;
		while (stack.length) {
			item = stack.shift();
			children = item[this.treeMap.children];

			if (children && children.length) {
				if (children.indexOf(node) > -1) {
					return children;
				} else {
					stack = stack.concat(item.children);
				}
			}
		}

		return null;
	}

	/**
	 * only work for tree root instance
	 * @param node 
	 * @return parent if node belongs to root, return an empty object, otherwise return null
	 */
	public findNodeParent(node: any): any {
		if (!this.treeRoot) {
			console.error("please find from tree root");
			return;
		}

		let stack: any[] = [];

		//先将第一层节点放入栈
		this.treeRoot.forEach((item: any) => {
			if (node == item) {
				return {};
			}

			stack.push(item);
		});

		let item, children;
		while (stack.length) {
			item = stack.shift();
			children = item[this.treeMap.children];

			if (children && children.length) {
				if (children.indexOf(node) > -1) {
					return item;
				} else {
					stack = stack.concat(item.children);
				}
			}
		}

		return null;
	}

	/**/
	private ngOnChanges(changes: any) {
		if (changes.isOpen && this.isSub) {
			if (this.openTimeout) {
				clearTimeout(this.openTimeout);
				this.openTimeout = null;
			}

			if (this.closeTimeout) {
				clearTimeout(this.closeTimeout);
				this.closeTimeout = null;
			}

			/*enable css3 height animation*/
			if (changes.isOpen.currentValue) {
				this.treeElement.style.height = this.treeElement.scrollHeight + "px";
				this.openTimeout = setTimeout(() => {
					this.treeElement.style.height = "auto";
					clearTimeout(this.openTimeout);
					this.openTimeout = null;
				}, 200);
			} else {
				this.treeElement.style.height = this.treeElement.scrollHeight + "px";
				this.closeTimeout = setTimeout(() => {
					this.treeElement.style.height = 0;
					clearTimeout(this.closeTimeout);
					this.closeTimeout = null;
				}, 1);
			}
		}
	}

	/**/ //DilipKumar katre made this property public on 25th Nov 2017)
	public tData: any;
	private ngOnInit() {
		if (!this.isSub) {
			this.treeRoot = this.treeData;
			let defaultMap = Object.assign({}, NgTree.DATAMAP);
			this.treeMap = this.treeConfig ? Object.assign(defaultMap, this.treeConfig.dataMap) : defaultMap;
			this.treeContext = {
				nodeSelected: [],
				treeRootElement: this.treeElement
			}
		}

		/*add parent refrence to children node*/
		if (this.treeData) {
			/*format or filter tree datas before subtree being created*/
			if (this.treeConfig && typeof this.treeConfig.dataFilter === "function") {
				this.tData = this.treeConfig.dataFilter(this.treeData);
			} else {
				this.tData = this.treeData;
			}
			this.nodeCount = this.treeData.length;
		} else {
			this.tData = null;
			this.nodeCount = 0;
		}
	}

	private ngDoCheck() {
		if (this.treeData && this.nodeCount !== this.treeData.length) {
			this.ngOnInit();
		}
	}

	/*打开或者关闭树形节点*/
	private openNode(node: any, e: any) {
		e.stopPropagation();
		e.preventDefault();

		/*即将折叠或打开*/
		if (node[this.treeMap.children]) {
			if (!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)) {
				node.isOpen = !node.isOpen;
			}
		}

		return false;
	}

	/*节点被点击*/
	private nodeClick(node: any, e: any) {
		e.preventDefault();

		if (this.treeConfig && this.treeConfig.onClick) {
			if (this.treeConfig.onClick(node)) {
				node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
			}
		} else {
			node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
		}

		return false;
	}
  /*Dilip-On right click*/
  private nodeContextClick(node: any, e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (this.treeConfig && this.treeConfig.onContextMenu) {
      this.treeConfig.onContextMenu(e, node); 
    } 

    return false;
  }

	private onEdit(node: any, e: any) {
		e.stopPropagation();
		if (this.treeConfig && this.treeConfig.onToolClick) {
			this.treeConfig.onToolClick(e, node, e.target.dataset.name);
		}

		return false;
	}


	private dragstart(e: any, node: any, index: any) {
		e.stopPropagation();

		if (this.treeConfig.onDragstart) {
			if (!this.treeConfig.onDragstart(e, node, this.parent, this.treeData, index)) {
				e.preventDefault();
				return;
			}
		}

		this.treeContext.treeRootElement.classList.add("ngtree_dragging");
		e.dataTransfer.setDragImage(e.target.querySelector(".ngtree_node_info_wraper"), -10, 10);

		this.treeContext.dragNode = node;
		this.treeContext.partUnit = e.target.clientHeight / 3;
		this.treeContext.dragstartData = {
			node: node,
			index: index,
			parent: this.parent,
			siblings: this.treeData
		};
		e.target.parentNode.classList.add("ngtree_dragging_node");


	}

	private dragenter(e: any, node: any) {
		e.stopPropagation();
		if (node !== this.treeContext.dragNode) {
			e.target.classList.add("ngtree_enter_node");
		}
	}

	private dragleave(e: any, node: any) {
		e.stopPropagation();
		if (node != this.treeContext.dragNode) {
			e.target.classList.remove("ngtree_enter_node");

			let pl = e.target.parentNode.classList;
			pl.remove("ngtree_drag_top");
			pl.remove("ngtree_drag_bottom");
			pl.remove("ngtree_drag_middle");
		}
		delete this.treeContext.dropPosition;
	}

	private dragover(e: any, node: any, index: number, max: number) {
		e.stopPropagation();
		if (node != this.treeContext.dragNode) {
			let parent = e.target.parentNode,
				pl = parent.classList;

			this.treeContext.dragoverTarget = parent;

			if (e.offsetY < this.treeContext.partUnit) {
				if (index == 0 || this.tData[index - 1] != this.treeContext.dragstartData.node) {
					this.treeContext.dropPosition = "top";
					pl.add("ngtree_drag_top");
					pl.remove("ngtree_drag_bottom");
					pl.remove("ngtree_drag_middle");
				}
			} else if (e.offsetY > this.treeContext.partUnit * 2) {
				if (index == this.tData.length || this.tData[index + 1] != this.treeContext.dragstartData.node) {
					this.treeContext.dropPosition = "bottom";
					pl.add("ngtree_drag_bottom");
					pl.remove("ngtree_drag_top");
					pl.remove("ngtree_drag_middle");
				}
			} else {
				this.treeContext.dropPosition = "middle";
				pl.add("ngtree_drag_middle");
				pl.remove("ngtree_drag_top");
				pl.remove("ngtree_drag_bottom");
			}

			if (this.treeConfig.onDragover) {
				if (this.treeConfig.onDragover(e, node, this.parent, this.treeData, index)) {
					e.preventDefault();
				}
			} else {
				e.preventDefault();
			}
		}

	}

	private drop(e: any, node: any, index: any) {
		//e.stopPropagation();

		this.treeContext.dropData = {
			node: node,
			index: index,
			parent: this.parent,
			siblings: this.treeData,
			dropPosition: this.treeContext.dropPosition
		};

		delete this.treeContext.dragNode;

		if (this.treeConfig.onDragover) {
			this.treeConfig.onDragover(e, node, this.parent, this.treeData, index);
		}

		if (this.treeConfig.onDrop) {
			this.treeConfig.onDrop(e, node, this.parent, this.treeData, index, this.treeContext.dropPosition);
		}

		this.treeContext.treeRootElement.classList.remove("ngtree_dragging");
		let old = document.querySelector(".ngtree_enter_node");
		if (old) {
			old.classList.remove("ngtree_enter_node");
		}
		old = document.querySelector(".ngtree_dragging_node");
		if (old) {
			old.classList.remove("ngtree_dragging_node");
		}

		if (this.treeContext.dragoverTarget) {
			var l = this.treeContext.dragoverTarget.classList;
			l.remove("ngtree_drag_top");
			l.remove("ngtree_drag_bottom");
			l.remove("ngtree_drag_middle");
		}
	}

	private dragend(e: any, node: any, index: any) {
		this.treeContext.treeRootElement.classList.remove("ngtree_dragging");
		let old = document.querySelector(".ngtree_enter_node");
		if (old) {
			old.classList.remove("ngtree_enter_node");
		}
		old = document.querySelector(".ngtree_dragging_node");
		if (old) {
			old.classList.remove("ngtree_dragging_node");
		}

		if (this.treeContext.dragoverTarget) {
			var l = this.treeContext.dragoverTarget.classList;
			l.remove("ngtree_drag_top");
			l.remove("ngtree_drag_bottom");
			l.remove("ngtree_drag_middle");
		}

		if (this.treeConfig.onDragend) {
			this.treeConfig.onDragend(e, node, this.parent, this.treeData, index);
		}
	}
}
