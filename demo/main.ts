import "reflect-metadata";
import "zone.js";

import {Component, NgModule, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgTree} from "../ng.tree";

@Component({
	selector: '.demos',
	template: `
		<div class="demo demo1">
			<ngTree #treeNo1 [treeData]="treeData" [treeConfig]="treeConfig"></ngTree>
		</div>`
})
class App {
	@ViewChild('treeNo1')
	private treeNo1:NgTree;

	/*demo0*/
	public treeData: any[] = [{
		name: "我的电脑",
		isOpen:true,
		nameClass:"warning",
		children: [{
			name: '笔记',
			isOpen:true,
			children:[{
				name: 'java'
			},{
				name: 'js'
			}]
		},{
			name: '电子书'
		}]
	},{
		name: '我的网盘',
		isOpen:true,
		children:[{
			name: 'secret🤐'
		},{
			name: 'photos'
		},{
			name: 'documents'
		}]
	}];
	
	private dragstartData:any;
	public treeConfig : any = {
		enableDrag:true,
		/*open or close tree node*/
		onFold : (node:any):boolean => {
			console.log(this.treeNo1.searchNodes(null, {name:"我的电脑"}));
			return true;
		},
		onDragover:(e:MouseEvent, node:any, parent:any, siblings:any, index:number)=>{
			return true;
		},
		onDrop:(e:MouseEvent, node:any, parent:any, siblings:any, index:number, position:string)=>{
			if(position == "top") {
				this.dragstartData.siblings.splice(this.dragstartData.index, 1);
				siblings.splice(siblings.indexOf(node), 0, this.dragstartData.node);
			} else if(position == "bottom"){
				this.dragstartData.siblings.splice(this.dragstartData.index, 1);
				siblings.splice(siblings.indexOf(node)+1, 0, this.dragstartData.node);
			} else {
				node.children = node.children || [];
				node.children.push(this.dragstartData.node);
				this.dragstartData.siblings.splice(this.dragstartData.index, 1);
			}
		},
		onDragstart:(e:MouseEvent, node:any, parent:any, siblings:any, index:number)=>{
			this.dragstartData = {
				node:node,
				parent:parent,
				siblings:siblings,
				index:index
			}
		}
	}
}

@NgModule({
	imports: [BrowserModule],
	entryComponents:[NgTree],
	declarations: [NgTree, App],
	bootstrap: [App]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);