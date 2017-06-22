rename from angular4-tree to ng.tree!

[document](https://1inus.github.io/ng-tree-site/doc.html)

[live demo](https://1inus.github.io/ng-tree-site)

# screenshot

![screenshot](https://1inus.github.io/ng-tree-site/screenshot.png)
![screenshot](https://1inus.github.io/ng-tree-site/screenshot1.png)

# NPM
```
npm install ng.tree
```

# Release notes
* 2017/4/23——rename from angular4-tree to ng.tree!
* 2017/4/23——publish to npm

#TODO
* search
* drag and drop

# Classes & Api
## NgTree
ngTree component. useage : 
<code class="lang-TypeScript"><ngTree [treeData]="TreeData[]" [treeConfig]="TreeConfig"></ngTree></code>

* <code class="lang-TypeScript">public searchNodes(nodes:any[], condition:string|{[key:string]:any}, ignoreCase?:boolean):any[]</code>,only work for tree root instance
* <code class="lang-TypeScript">public findNodeSiblings(node:any):any[]</code>,only work for tree root instance
* <code class="lang-TypeScript">public findNodeParent(node:any):any</code>,only work for tree root instance, if node belongs to root, return an empty object, otherwise return null

## TreeData
data for creating tree

* <code class="lang-TypeScript">name?:string</code>,tree node name
* <code class="lang-TypeScript">isOpen?:boolean</code>,collapse or not(node has subtree)
* <code class="lang-TypeScript">iconClass?:string|boolean</code>,a class selector add to icon element, false to disable node icon
* <code class="lang-TypeScript">nameClass?:string</code>,a class selector add to name element
* <code class="lang-TypeScript">children?:TreeData[]</code>,sub tree data
* <code class="lang-TypeScript">isChecked?:boolean</code>,is checked
* <code class="lang-TypeScript">tools?: {name:string, title?:string}[]</code>,customized edit button

## TreeConfig

* <code>onFold? : (node?:any) => boolean;</code>,execute before treenode collapse or uncollapse, returns false to disable the default action
* <code>onClick? : (node?:any) => void;</code>,trigger on icon or name click
* <code>onToolClick? : (node?:any, toolname?:string) => void;</code>trigger on tool button click
* <code>dataFilter?: (nodeData?:any) => any</code>,format customized data to TreeData. effect on tree init
* <code>tools?: {name:string, title?:string}[]</code>,customized edit button
* <code>enableTools?:boolean</code>,enable toolbar or not
* <code>dataMap?any</code>,format customized data to TreeData
	* <code>dataMap.name?:string</code>,default to "name"
	* <code>dataMap.isOpen?:string</code>,deafult to 'isOpen'
	* <code>dataMap.iconClass?:string</code>,default to "iconClass"
	* <code>dataMap.nameClass?:string</code>,default to "nameClass"
	* <code>dataMap.children?:string</code>,default to "children"
	* <code>dataMap.isChecked?:string</code>,default to "isChecked"
	* <code>dataMap.tools?:string</code>,default to "tools"
	* <code>dataMap.enableTools? : string</code>,default to "enableTools"

#Usage & demo
talk is cheape, show you my code

##step 1
import css
```html
<link rel="stylesheet" href="../node_modules/ng-tree/style/tree.css">
```
##step 2
use it
```TypeScript
import {Component, NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgTree} from "ng.tree";

@Component({
	selector: 'app',
	template: `<ngTree [treeData]="treeData" [treeConfig]="treeConfig"></ngTree>`
})
export class App {
	public treeData: any[] = [{
		name: "folder",
		isOpen:true,
		iconSelector:"computer",
		nameSelector:"warning",
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
		dataMap:{
			children:"nodes"
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
```