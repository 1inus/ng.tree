"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var ngTree_1 = require("../ngTree");
var App = (function () {
    function App() {
        this.treeData = [{
                name: "我的电脑",
                isOpen: true,
                nameClass: "warning",
                children: [{
                        name: '笔记',
                        isOpen: true,
                        children: [{
                                name: 'java'
                            }, {
                                name: 'js'
                            }]
                    }, {
                        name: '电子书'
                    }]
            }, {
                name: '我的网盘',
                isOpen: true,
                children: [{
                        name: 'secret🤐'
                    }, {
                        name: 'photos'
                    }, {
                        name: 'documents'
                    }]
            }];
        this.treeConfig = {};
        this.treeData1 = [{
                name: "我的电脑",
                isOpen: true,
                iconClass: "icon_computer",
                nameClass: "warning",
                enableTool: false,
                children: [{
                        name: 'secret🤐',
                        iconClass: "icon_folder_lock",
                        enableTool: false
                    }, {
                        name: 'photos',
                        iconClass: "icon_photo",
                        enableTool: false
                    }]
            }, {
                name: "✌nice day✌",
                iconClass: "icon_sunny",
                enableTool: false,
                isOpen: true,
                children: [
                    { name: "😀", iconClass: false, isChecked: true }, { name: "😍", iconClass: false }, { name: "🚴", iconClass: false },
                    { name: "😘", iconClass: false }, { name: "😴", iconClass: false }
                ]
            }];
        this.treeConfig1 = {
            onFold: function (node) {
                if (!node.isOpen && node.iconClass == "icon_cloud") {
                    var icon_1 = node.iconClass;
                    node.iconClass = "icon_sunny";
                    setTimeout(function () {
                        node.isOpen = true;
                        node.iconClass = icon_1;
                    }, 1000);
                    return false;
                }
                else {
                    return true;
                }
            },
            dataFilter: function (data) {
                return data;
            },
            onToolClick: function (node, toolName) {
                console.log(node, name);
            }
        };
        this.treeConfig2 = {
            tools: [
                { name: "icon-plus", title: "添加" },
                { name: "icon-edit", title: "编辑" },
                { name: "icon-bin", title: "删除" }
            ],
            onToolClick: function (node, name) {
                if (name == "icon-plus") {
                    node.children = node.children || [];
                    node.children.push({
                        name: node.name,
                        enableTool: false,
                        iconClass: false
                    });
                }
                else if (name == "icon-edit") {
                    node.name = (new Date().getTime()).toString().substring(8, 13);
                }
                else {
                    var index = node.ngTreeNodeParent.children.indexOf(node);
                    node.ngTreeNodeParent.children.splice(index, 1);
                    return true;
                }
            }
        };
        this.treeMap = {
            children: "children"
        };
    }
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: '.demos',
        template: "\n\t\t<div class=\"demo demo1\">\n\t\t\t<h2>ordinary ng-tree</h2>\n\t\t\t<ngTree [treeData]=\"treeData\" [treeConfig]=\"treeConfig\"></ngTree>\n\t\t</div>\n\t\t<div class=\"demo demo2\">\n\t\t\t<h2>custom icon</h2>\n\t\t\t<ngTree [treeData]=\"treeData1\" [treeConfig]=\"treeConfig1\"></ngTree>\n\t\t</div>\n\t\t<div class=\"demo demo3\">\n\t\t\t<h2>custom edit tool</h2>\n\t\t\t<ngTree [treeData]=\"treeData1\" [treeConfig]=\"treeConfig2\"></ngTree>\n\t\t</div>\n\t"
    })
], App);
var editNode = (function () {
    function editNode(elementRef, ly) {
        this.elementRef = elementRef;
        this.ly = ly;
    }
    editNode.prototype.apply = function () {
        this.input = this.elementRef.nativeElement.querySelector("input");
        console.log(this.node);
        this.node.name = this.input.value;
        this.ly.close();
    };
    return editNode;
}());
editNode = __decorate([
    core_1.Component({
        selector: ".dialog",
        template: "<div>\n\t\tname:<input value=\"\"/><button (click)=\"apply()\">apply</button>\n\t</div>"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, Object])
], editNode);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        entryComponents: [ngTree_1.NgTree],
        declarations: [ngTree_1.NgTree, App],
        bootstrap: [App]
    })
], AppModule);
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map