#NPM
```
npm install angular4-tree
```

#Release notes
* 2017/4/23——publish to npm

#TODO
* search
* drag and drop

# Classes
## NgTree
ngTree component. useage : 
<code class="lang-TypeScript"><ngTree [treeData]="TreeData[]" [treeMap]="TreeMap" [treeConfig]="TreeConfig"></ngTree></code>
```TypeScript
export class NgTree;
```

## TreeData
data for creating tree

```TypeScript
export interface TreeData{
	[key:string]: any;
	
	/**
	 * default to "name"
	 */
	name?:string;
	
	/**
	 * deafult to 'isOpen'
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
```

## TreeDataMap
format customized data to TreeData

```TypeScript
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
```
## TreeConfig
```TypeScript
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
	 * format customized data to TreeData. effect on tree init
	 */
	dataFilter?: (nodeData?:any) => any;
}
```
#Usage & demo
talk is cheape, show you my code

##step 1
import css
```html
<link rel="stylesheet" href="node_modules/angular2-layer/css/dialog.css" />
```
##step 2
use it
```TypeScript
import {Component, NgModule, ViewChild} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgTree} from "../tree";

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
```