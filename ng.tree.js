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
var NgTree = NgTree_1 = (function () {
    function NgTree(view) {
        this.nodeCount = 0;
        this.treeElement = view.element.nativeElement;
    }
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
        var _this = this;
        if (!this.isSub) {
            var defaultMap = Object.assign({}, NgTree_1.DATAMAP);
            this.treeMap = this.treeConfig ? Object.assign(defaultMap, this.treeConfig.dataMap) : defaultMap;
            this.treeContext = {
                nodeSelected: []
            };
        }
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
            this.treeConfig.onToolClick(node, e.target.className);
        }
        return false;
    };
    return NgTree;
}());
NgTree.DATAMAP = {
    name: "name",
    isOpen: "isOpen",
    iconClass: "iconClass",
    nameClass: "nameClass",
    children: "children",
    isChecked: "isChecked",
    tools: "tools",
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
        template: '<div class="ngtree_node" *ngFor="let n of tData">' +
            '<div class="ngtree_node_info"' +
            '[ngClass]="{ngtree_folder: n[treeMap.children], ngtree_node_open:n[treeMap.isOpen], ngtree_node_selected:n[treeMap.isChecked]}">' +
            '<div class="ngtree_connect" (click)="openNode(n, $event)"></div>' +
            '<div (click)="nodeClick(n, $event);" class="ngtree_node_info_wraper">' +
            '<div class="{{n[treeMap.iconClass]}} ngtree_node_icon {{!(n[treeMap.iconClass])?\'ngtree_folder_icon\':\'\'}}"' +
            '[ngClass]="{tree_icon_hide:n[treeMap.iconClass]==false}"></div>' +
            '<div class="ngtree_node_name {{n[treeMap.nameClass]}}">{{n[treeMap.name]}}</div>' +
            '<div class="ngtree_node_toolbar" (click)="onEdit(n, $event)" *ngIf="n[treeMap.enableTools]!=false && (treeConfig.tools||treeData.tools)">' +
            '<div class="{{t.name}}" *ngFor="let t of (n[treeMap.tools] || treeConfig.tools)" title="{{t.title}}"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<ngTree ' +
            'class="sub_ngtree"' +
            '[isSub]="true"' +
            '[parent]="n"' +
            '[treeMap]="treeMap"' +
            '[treeConfig]="treeConfig"' +
            '[treeContext]="treeContext"' +
            '[isOpen]="n[treeMap.isOpen]"' +
            '[(treeData)]="n[treeMap.children]"></ngTree>' +
            '</div>'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], NgTree);
exports.NgTree = NgTree;
var NgTree_1;
//# sourceMappingURL=ng.tree.js.map