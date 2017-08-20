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
var ng_tree_1 = require("../ng.tree");
var App = (function () {
    function App() {
        var _this = this;
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
        this.treeConfig = {
            enableDrag: true,
            onFold: function (node) {
                console.log(_this.treeNo1.searchNodes(null, { name: "我的电脑" }));
                return true;
            },
            onDragover: function (e, node, parent, siblings, index) {
                return true;
            },
            onDrop: function (e, node, parent, siblings, index, position) {
                if (position == "top") {
                    _this.dragstartData.siblings.splice(_this.dragstartData.index, 1);
                    siblings.splice(siblings.indexOf(node), 0, _this.dragstartData.node);
                }
                else if (position == "bottom") {
                    _this.dragstartData.siblings.splice(_this.dragstartData.index, 1);
                    siblings.splice(siblings.indexOf(node) + 1, 0, _this.dragstartData.node);
                }
                else {
                    node.children = node.children || [];
                    node.children.push(_this.dragstartData.node);
                    _this.dragstartData.siblings.splice(_this.dragstartData.index, 1);
                }
            },
            onDragstart: function (e, node, parent, siblings, index) {
                _this.dragstartData = {
                    node: node,
                    parent: parent,
                    siblings: siblings,
                    index: index
                };
                return true;
            },
            onDragend: function (e, node, parent, siblings, index) {
                console.log(node);
            }
        };
    }
    __decorate([
        core_1.ViewChild('treeNo1'),
        __metadata("design:type", ng_tree_1.NgTree)
    ], App.prototype, "treeNo1", void 0);
    App = __decorate([
        core_1.Component({
            selector: '.demos',
            template: "\n\t\t<div class=\"demo demo1\">\n\t\t\t<ngTree #treeNo1 [treeData]=\"treeData\" [treeConfig]=\"treeConfig\"></ngTree>\n\t\t</div>"
        })
    ], App);
    return App;
}());
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            entryComponents: [ng_tree_1.NgTree],
            declarations: [ng_tree_1.NgTree, App],
            bootstrap: [App]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
