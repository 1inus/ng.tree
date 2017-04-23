import "reflect-metadata";
import "zone.js";

import {Component, NgModule, ViewChild} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgTree} from "../ngTree";

@Component({
	selector: 'app',
	template: `
		<button (click)="addNode();">add node</button>
		<ngTree [treeData]="treeData" [treeMap]="treeMap" [treeConfig]="treeConfig"></ngTree>
	`
})
export class App {
	public treeData: any[] = [{
        name: "folder",
        isOpen:true,
        iconSelector:"computer"
        nameSelector:"warning"
        nodes: [{
            name: 'file'
        }]
    },{
        name: 'another folder',
        nodes:[{
            name: 'another file'
        }]
    }];
	
	public treeConfig : any = {
		/*open or close tree node*/
		onFold : (node:any):boolean => {
			if(!node.isOpen){
				node.iconSelector = "icon_flickr";
				setTimeout(()=>{
					node.iconSelector = null;
					node.isOpen = true;
				}, 1000);
				return false;
			} else {
				return true;
			}
		},
		
		/*click icon or name*/
		onClick : (node:any):void => {
			node.isChecked = !node.isChecked;
		},
		
		/*before node render*/
		dataFilter : (data) => {
			return data;
		}
	}
	
	/**/
	public treeMap = {
		children:"nodes"
	};
	
	addNode(){
		this.treeData[0].nodes.push({
			name: 'new node',
			nodes:[{
				name: 'my document'
			}]
		});
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