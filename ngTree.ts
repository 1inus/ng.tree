/**
 * Created by lwei on 2017/4/15.
 */

import {Component, Input} from '@angular/core';

export interface TreeData{
	[key:string]: any;
	
	/**
	 * node name
	 */
	name?:string;
	
	/**
	 * collapse or not(node has subtree)
	 */
	isOpen?:boolean;
	
	/**
	 * a class selector add to icon element
	 */
	iconSelector?:string;
	
	/**
	 * a class selector add to name element
	 */
	nameSelector?:string;
	
	/**
	 * sub tree data
	 */
	children?:TreeData[];
	
	/**
	 * is checked
	 */
	isChecked?:string;
}

/**
 * format customized data to TreeData
 */
export interface TreeDataMap{
	/**
	 * default to "name"
	 */
	name?:string;
	
	/**
	 * deafult to 'isOpen'
	 */
	isOpen?:string;
	
	/**
	 * default to "iconSelector"
	 */
	iconSelector?:string;
	
	/**
	 * default to "nameSelector"
	 */
	nameSelector?:string;
	
	/**
	 * default to "children"
	 */
	children?:string;
	
	/**
	 * default to "isChecked"
	 */
	isChecked?:string;
}

/*配置*/
export interface TreeConfig {
	/**
	 * execute before treenode collapse or uncollapse
	 */
	onFold? : (node?:any) => boolean;
	
	/**
	 * trigger on icon or name click
	 */
	onClick? : (node?:any) => void;
	
	/**
	 * 
	 */
	/*onDrop? : (sourceNode?:any, targetNode?:any) => boolean;
	
	searchText?:string;*/
	
	/**
	 * format customized data to TreeData. effect on tree init
	 */
	dataFilter?: (nodeData?:any) => any;
}

@Component({
	selector: 'ngTree',
	template:`
<div class="tree_node" *ngFor="let n of tData">
	<div
	class="tree_node_info"
	[ngClass]="{'tree_folder': n[treeMap.children], 'tree_node_open':n[treeMap.isOpen], 'tree_node_selected':n[treeMap.isChecked]}">
		<div class="tree_connect" (click)="openNode(n, $event)"></div>
		<div (click)="nodeClick(n, $event);" class="tree_node_info_wraper">
			<div class="tree_node_icon {{n[treeMap.iconSelector]}}"></div>
			<div class="tree_node_name {{n[treeMap.nameSelector]}}">{{n[treeMap.name]}}</div>
		</div>
	</div>
	<ngTree
		class="sub_tree"
		
		[isSub]="true"
		[parent]="n"
		[treeMap]="treeMap"
		[treeConfig]="treeConfig"
		[treeContext]="treeContext"
		[treeData]="n[treeMap.children]"></ngTree>
</div>
`
})
export class NgTree {
	static DATAMAP:TreeDataMap = {
		name:"name",
		isOpen:"isOpen",
		iconSelector:"iconSelector",
		nameSelector:"nameSelector",
		children:"children",
		isChecked:"isChecked"
	}
	
	@Input() private parent:any;
	@Input() private isSub: boolean;
	@Input() private treeData: any[];
	@Input() private treeContext:any;
	@Input() private treeMap: TreeDataMap;
	@Input() private treeConfig: TreeConfig;
	
	/**
	 * 
	 */
	ngOnChanges(changes) {
		//console.log(changes);
	}
	
	/**/
	private tData:any;
	ngOnInit(){
		if(!this.isSub){
			let defaultMap = Object.assign({}, NgTree.DATAMAP);
			this.treeMap = Object.assign(defaultMap, this.treeMap);
			this.treeContext = {
				nodeSelected:[],
				something:"梁威"
			}
		}
		
		/*add parent refrence to children node*/
		if(this.treeData){
			this.treeData.forEach((t, i)=>{
				if(this.parent){
					t.ngTreeNodeParent = this.parent;
				} else {
					t.ngTreeNodeParent = {};
					t.ngTreeNodeParent[this.treeMap.children] = this.treeData;
				}
			})
			
			/*format or filter tree datas before subtree being created*/
			if(this.treeConfig && typeof this.treeConfig.dataFilter == "function"){
				this.tData = this.treeConfig.dataFilter(this.treeData);
			} else {
				this.tData = this.treeData;
			}
		}
	}
	
	/*打开或者关闭树形节点*/
	private openNode(node:any, e:any){
		e.stopPropagation();
		
		/*即将折叠或打开*/
		if(node[this.treeMap.children]){
			if(!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)){
				node.isOpen = !node.isOpen;
			}
		}
	}
	
	/*节点被点击*/
	private nodeClick(node:any, e:any) {
		if(this.treeConfig && this.treeConfig.onClick){
			this.treeConfig.onClick(node);
		}
	}
}