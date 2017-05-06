import "reflect-metadata";
import "zone.js";

import {Component, NgModule, ViewChild, ElementRef} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgTree} from "../ngTree";

@Component({
	selector: '.demos',
	template: `
		<div class="demo demo1">
			<h2>ordinary ng-tree</h2>
			<ngTree [treeData]="treeData" [treeConfig]="treeConfig"></ngTree>
		</div>
		<div class="demo demo2">
			<h2>custom icon</h2>
			<ngTree [treeData]="treeData1" [treeConfig]="treeConfig1"></ngTree>
		</div>
		<div class="demo demo3">
			<h2>custom edit tool</h2>
			<ngTree [treeData]="treeData1" [treeConfig]="treeConfig2"></ngTree>
		</div>
	`
})
class App {
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
	
	public treeConfig : any = {}
	
	
	/*demo1*/
	public treeData1: any[] = [{
		name: "我的电脑",
		isOpen:true,
		iconClass:"icon_computer",
		nameClass:"warning",
		enableTool:false,
		children:[{
			name: 'secret🤐',
			iconClass:"icon_folder_lock",
			enableTool:false
		},{
			name: 'photos',
			iconClass:"icon_photo",
			enableTool:false
		}]
	}, {
		name:"✌nice day✌",
		iconClass:"icon_sunny",
		enableTool:false,
		isOpen:true,
		children:[
			{name:"😀",iconClass:false,isChecked:true},{name:"😍",iconClass:false},{name:"🚴",iconClass:false},
			{name:"😘",iconClass:false},{name:"😴",iconClass:false}]
	}];
	
	public treeConfig1 : any = {
		/*open or close tree node*/
		onFold : (node:any):boolean => {
			if(!node.isOpen && node.iconClass=="icon_cloud"){
				let icon = node.iconClass;
				node.iconClass = "icon_sunny";
				setTimeout(()=>{
					node.isOpen = true;
					node.iconClass = icon;
				}, 1000);
				return false;
			} else {
				return true;
			}
		},
		
		/*before node render*/
		dataFilter : (data:any) => {
			return data;
		},
		
		onToolClick:function(node:any, toolName:any){
			/*do something*/
			console.log(node, name);
		}
	}
	
	public treeConfig2 : any = {
		tools:[
			{name:"icon-plus", title:"添加"},
			{name:"icon-edit", title:"编辑"},
			{name:"icon-bin", title:"删除"}],
			
		onToolClick:(node:any, name:any)=>{
			if(name=="icon-plus"){
				node.children = node.children || [];
				node.children.push({
					name : node.name,
					enableTool:false,
					iconClass:false
				});
			} else if(name=="icon-edit"){
				node.name = (new Date().getTime()).toString().substring(8, 13);
			} else {
				let index = node.ngTreeNodeParent.children.indexOf(node);
				node.ngTreeNodeParent.children.splice(index, 1);
				return true;
			}
		}
	}
	
	/**/
	public treeMap = {
		children:"children"
	};
}

@Component({
	selector:".dialog",
	template:`<div>
		name:<input value=""/><button (click)="apply()">apply</button>
	</div>`
})
class editNode{
	private node:any;
	private input:any;
	
	constructor(private elementRef: ElementRef, private ly:NgLayerRef){
	}
	
	private apply(){
		this.input = this.elementRef.nativeElement.querySelector("input");
		console.log(this.node);
		this.node.name = this.input.value;
		this.ly.close();
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