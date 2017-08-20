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
var core_1 = require("@angular/core");
var NgTree = (function () {
    function NgTree(view) {
        this.nodeCount = 0;
        this.treeElement = view.element.nativeElement;
    }
    NgTree_1 = NgTree;
    NgTree.prototype.searchNodes = function (nodes, condition, ignoreCase) {
        if (!this.treeRoot) {
            console.error("please search from tree root");
            return;
        }
        var stack = [];
        var vals = [];
        vals = vals.concat(this.filter((nodes ? nodes : this.treeRoot), condition));
        this.treeRoot.forEach(function (item) {
            stack.push(item);
        });
        var item, children;
        while (stack.length) {
            item = stack.shift();
            children = item[this.treeMap.children];
            if (children && children.length) {
                vals = vals.concat(this.filter(children, condition));
                stack = stack.concat(item.children);
            }
        }
        return vals;
    };
    NgTree.prototype.filter = function (nodes, condition, ignoreCase) {
        nodes = nodes || this.treeRoot;
        if (!condition)
            return nodes;
        var argType = typeof condition;
        if (argType == "string") {
            condition = condition.trim();
            if (condition == "") {
                return nodes;
            }
            if (ignoreCase) {
                condition = condition.toUpperCase();
            }
            return nodes.filter(function (o) {
                if (!o)
                    return;
                var val;
                return Object.keys(o).some(function (k) {
                    val = o[k];
                    if (typeof val == "string") {
                        if (ignoreCase) {
                            return val.toUpperCase().indexOf(condition) > -1;
                        }
                        else {
                            return val.indexOf(condition) > -1;
                        }
                    }
                    else {
                        return false;
                    }
                });
            });
        }
        else if (argType === 'object') {
            return nodes.filter(function (o) {
                if (!o)
                    return o;
                return Object.keys(condition).every(function (k) {
                    return o[k] == condition[k];
                });
            });
        }
        else {
            return nodes;
        }
    };
    NgTree.prototype.findNodeSiblings = function (node) {
        if (!this.treeRoot) {
            console.error("please find from tree root");
            return;
        }
        var stack = [];
        if (this.treeRoot.indexOf(node) > -1) {
            return this.treeRoot;
        }
        this.treeRoot.forEach(function (item) {
            stack.push(item);
        });
        var item, children;
        while (stack.length) {
            item = stack.shift();
            children = item[this.treeMap.children];
            if (children && children.length) {
                if (children.indexOf(node) > -1) {
                    return children;
                }
                else {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };
    NgTree.prototype.findNodeParent = function (node) {
        if (!this.treeRoot) {
            console.error("please find from tree root");
            return;
        }
        var stack = [];
        this.treeRoot.forEach(function (item) {
            if (node == item) {
                return {};
            }
            stack.push(item);
        });
        var item, children;
        while (stack.length) {
            item = stack.shift();
            children = item[this.treeMap.children];
            if (children && children.length) {
                if (children.indexOf(node) > -1) {
                    return item;
                }
                else {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };
    NgTree.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.isOpen && this.isSub) {
            if (this.openTimeout) {
                clearTimeout(this.openTimeout);
                this.openTimeout = null;
            }
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }
            if (changes.isOpen.currentValue) {
                this.treeElement.style.height = this.treeElement.scrollHeight + "px";
                this.openTimeout = setTimeout(function () {
                    _this.treeElement.style.height = "auto";
                    clearTimeout(_this.openTimeout);
                    _this.openTimeout = null;
                }, 200);
            }
            else {
                this.treeElement.style.height = this.treeElement.scrollHeight + "px";
                this.closeTimeout = setTimeout(function () {
                    _this.treeElement.style.height = 0;
                    clearTimeout(_this.closeTimeout);
                    _this.closeTimeout = null;
                }, 1);
            }
        }
    };
    NgTree.prototype.ngOnInit = function () {
        if (!this.isSub) {
            this.treeRoot = this.treeData;
            var defaultMap = Object.assign({}, NgTree_1.DATAMAP);
            this.treeMap = this.treeConfig ? Object.assign(defaultMap, this.treeConfig.dataMap) : defaultMap;
            this.treeContext = {
                nodeSelected: [],
                treeRootElement: this.treeElement
            };
        }
        if (this.treeData) {
            if (this.treeConfig && typeof this.treeConfig.dataFilter == "function") {
                this.tData = this.treeConfig.dataFilter(this.treeData);
            }
            else {
                this.tData = this.treeData;
            }
            this.nodeCount = this.treeData.length;
        }
        else {
            this.tData = null;
            this.nodeCount = 0;
        }
    };
    NgTree.prototype.ngDoCheck = function () {
        if (this.treeData && this.nodeCount != this.treeData.length) {
            this.ngOnInit();
        }
    };
    NgTree.prototype.openNode = function (node, e) {
        e.stopPropagation();
        e.preventDefault();
        if (node[this.treeMap.children]) {
            if (!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)) {
                node.isOpen = !node.isOpen;
            }
        }
        return false;
    };
    NgTree.prototype.nodeClick = function (node, e) {
        e.preventDefault();
        if (this.treeConfig && this.treeConfig.onClick) {
            if (this.treeConfig.onClick(node)) {
                node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
            }
        }
        else {
            node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
        }
        return false;
    };
    NgTree.prototype.onEdit = function (node, e) {
        e.stopPropagation();
        if (this.treeConfig && this.treeConfig.onToolClick) {
            this.treeConfig.onToolClick(node, e.target.dataset.name);
        }
        return false;
    };
    NgTree.prototype.dragstart = function (e, node, index) {
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
    };
    NgTree.prototype.dragenter = function (e, node) {
        e.stopPropagation();
        if (node != this.treeContext.dragNode) {
            e.target.classList.add("ngtree_enter_node");
        }
    };
    NgTree.prototype.dragleave = function (e, node) {
        e.stopPropagation();
        if (node != this.treeContext.dragNode) {
            e.target.classList.remove("ngtree_enter_node");
            var pl = e.target.parentNode.classList;
            pl.remove("ngtree_drag_top");
            pl.remove("ngtree_drag_bottom");
            pl.remove("ngtree_drag_middle");
        }
        delete this.treeContext.dropPosition;
    };
    NgTree.prototype.dragover = function (e, node, index, max) {
        e.stopPropagation();
        if (node != this.treeContext.dragNode) {
            var parent_1 = e.target.parentNode, pl = parent_1.classList;
            this.treeContext.dragoverTarget = parent_1;
            if (e.offsetY < this.treeContext.partUnit) {
                if (index == 0 || this.tData[index - 1] != this.treeContext.dragstartData.node) {
                    this.treeContext.dropPosition = "top";
                    pl.add("ngtree_drag_top");
                    pl.remove("ngtree_drag_bottom");
                    pl.remove("ngtree_drag_middle");
                }
            }
            else if (e.offsetY > this.treeContext.partUnit * 2) {
                if (index == this.tData.length || this.tData[index + 1] != this.treeContext.dragstartData.node) {
                    this.treeContext.dropPosition = "bottom";
                    pl.add("ngtree_drag_bottom");
                    pl.remove("ngtree_drag_top");
                    pl.remove("ngtree_drag_middle");
                }
            }
            else {
                this.treeContext.dropPosition = "middle";
                pl.add("ngtree_drag_middle");
                pl.remove("ngtree_drag_top");
                pl.remove("ngtree_drag_bottom");
            }
            if (this.treeConfig.onDragover) {
                if (this.treeConfig.onDragover(e, node, this.parent, this.treeData, index)) {
                    e.preventDefault();
                }
            }
            else {
                e.preventDefault();
            }
        }
    };
    NgTree.prototype.drop = function (e, node, index) {
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
        var old = document.querySelector(".ngtree_enter_node");
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
    };
    NgTree.prototype.dragend = function (e, node, index) {
        this.treeContext.treeRootElement.classList.remove("ngtree_dragging");
        var old = document.querySelector(".ngtree_enter_node");
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
    };
    NgTree.DATAMAP = {
        name: "name",
        tools: "tools",
        isOpen: "isOpen",
        children: "children",
        iconClass: "iconClass",
        nameClass: "nameClass",
        isChecked: "isChecked",
        enableTools: "enableTool"
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgTree.prototype, "parent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgTree.prototype, "isSub", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgTree.prototype, "treeData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgTree.prototype, "treeContext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgTree.prototype, "treeConfig", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgTree.prototype, "treeMap", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgTree.prototype, "isOpen", void 0);
    NgTree = NgTree_1 = __decorate([
        core_1.Component({
            selector: 'ngTree',
            template: "<div class=\"ngtree_node\" *ngFor=\"let n of tData;let i = index\">\n\t<div class=\"ngtree_node_info\"\n\t[attr.draggable]=\"treeConfig.enableDrag ? true:false\"\n\t(drop)=\"drop($event, n, i, tData.length)\"\n\t(dragend)=\"dragend($event, n, i, tData.length)\"\n\t(dragover)=\"dragover($event, n, i, tData.length)\"\n\t(dragstart)=\"dragstart($event, n, i, tData.length)\"\n\t(dragenter)=\"dragenter($event, n, i, tData.length)\"\n\t(dragleave)=\"dragleave($event, n, i, tData.length)\"\n\n\t[ngClass]=\"{ngtree_folder: n[treeMap.children], ngtree_node_open:n[treeMap.isOpen], ngtree_node_selected:n[treeMap.isChecked]}\">\n\t\t<div class=\"ngtree_connect\" (click)=\"openNode(n, $event)\"></div>\n\t\t<div (click)=\"nodeClick(n, $event)\" class=\"ngtree_node_info_wraper\">\n\t\t\t<div class=\"{{n[treeMap.iconClass]}} ngtree_node_icon {{!(n[treeMap.iconClass])?'ngtree_folder_icon':''}}\"\n\t\t\t\t[ngClass]=\"{tree_icon_hide:n[treeMap.iconClass]==false}\"></div>\n\t\t\t<div class=\"ngtree_node_name {{n[treeMap.nameClass]}}\">{{n[treeMap.name]}}</div>\n\t\t\t<div class=\"ngtree_node_toolbar\" (click)=\"onEdit(n, $event)\" *ngIf=\"n[treeMap.enableTools]!=false && (treeConfig.tools||treeData.tools)\">\n\t\t\t\t<div class=\"{{t.iconClass}}\" [attr.data-name]=\"t.name\" *ngFor=\"let t of (n[treeMap.tools] || treeConfig.tools)\" title=\"{{t.title}}\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<ngTree \n\t\tclass=\"sub_ngtree\"\n\t\t[isSub]=\"true\"\n\t\t[parent]=\"n\"\n\t\t[treeMap]=\"treeMap\"\n\t\t[treeConfig]=\"treeConfig\"\n\t\t[treeContext]=\"treeContext\"\n\t\t[isOpen]=\"n[treeMap.isOpen]\"\n\t\t[(treeData)]=\"n[treeMap.children]\"></ngTree>\n</div>"
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], NgTree);
    return NgTree;
    var NgTree_1;
}());
exports.NgTree = NgTree;
