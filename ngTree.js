/**
 * Created by lwei on 2017/4/15.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NgTree = NgTree_1 = (function () {
    function NgTree() {
    }
    /**
     *
     */
    NgTree.prototype.ngOnChanges = function (changes) {
        //console.log(changes);
    };
    NgTree.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.isSub) {
            var defaultMap = Object.assign({}, NgTree_1.DATAMAP);
            this.treeMap = Object.assign(defaultMap, this.treeMap);
            this.treeContext = {
                nodeSelected: [],
                something: "梁威"
            };
        }
        /*add parent refrence to children node*/
        if (this.treeData) {
            this.treeData.forEach(function (t, i) {
                if (_this.parent) {
                    t.ngTreeNodeParent = _this.parent;
                }
                else {
                    t.ngTreeNodeParent = {};
                    t.ngTreeNodeParent[_this.treeMap.children] = _this.treeData;
                }
            });
            /*format or filter tree datas before subtree being created*/
            if (this.treeConfig && typeof this.treeConfig.dataFilter == "function") {
                this.tData = this.treeConfig.dataFilter(this.treeData);
            }
            else {
                this.tData = this.treeData;
            }
        }
    };
    /*打开或者关闭树形节点*/
    NgTree.prototype.openNode = function (node, e) {
        e.stopPropagation();
        /*即将折叠或打开*/
        if (node[this.treeMap.children]) {
            if (!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)) {
                node.isOpen = !node.isOpen;
            }
        }
    };
    /*节点被点击*/
    NgTree.prototype.nodeClick = function (node, e) {
        if (this.treeConfig && this.treeConfig.onClick) {
            this.treeConfig.onClick(node);
        }
    };
    return NgTree;
}());
NgTree.DATAMAP = {
    name: "name",
    isOpen: "isOpen",
    iconSelector: "iconSelector",
    nameSelector: "nameSelector",
    children: "children",
    isChecked: "isChecked"
};
__decorate([
    core_1.Input()
], NgTree.prototype, "parent");
__decorate([
    core_1.Input()
], NgTree.prototype, "isSub");
__decorate([
    core_1.Input()
], NgTree.prototype, "treeData");
__decorate([
    core_1.Input()
], NgTree.prototype, "treeContext");
__decorate([
    core_1.Input()
], NgTree.prototype, "treeMap");
__decorate([
    core_1.Input()
], NgTree.prototype, "treeConfig");
NgTree = NgTree_1 = __decorate([
    core_1.Component({
        selector: 'ngTree',
        template: "\n<div class=\"tree_node\" *ngFor=\"let n of tData\">\n\t<div\n\tclass=\"tree_node_info\"\n\t[ngClass]=\"{'tree_folder': n[treeMap.children], 'tree_node_open':n[treeMap.isOpen], 'tree_node_selected':n[treeMap.isChecked]}\">\n\t\t<div class=\"tree_connect\" (click)=\"openNode(n, $event)\"></div>\n\t\t<div (click)=\"nodeClick(n, $event);\" class=\"tree_node_info_wraper\">\n\t\t\t<div class=\"tree_node_icon {{n[treeMap.iconSelector]}}\"></div>\n\t\t\t<div class=\"tree_node_name {{n[treeMap.nameSelector]}}\">{{n[treeMap.name]}}</div>\n\t\t</div>\n\t</div>\n\t<ngTree\n\t\tclass=\"sub_tree\"\n\t\t\n\t\t[isSub]=\"true\"\n\t\t[parent]=\"n\"\n\t\t[treeMap]=\"treeMap\"\n\t\t[treeConfig]=\"treeConfig\"\n\t\t[treeContext]=\"treeContext\"\n\t\t[treeData]=\"n[treeMap.children]\"></ngTree>\n</div>\n"
    })
], NgTree);
exports.NgTree = NgTree;
var NgTree_1;
