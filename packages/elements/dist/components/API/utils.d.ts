import { TableOfContentsItem } from '@stoplight/elements-core';
import { GroupNode, OperationNode, ServiceChildNode, ServiceNode } from '../../utils/oas/types';
export declare type TagGroup = {
    title: string;
    items: OperationNode[];
};
export declare type TagGroupWithModels = {
    title: string;
    items: GroupNode[];
};
export declare const computeTagGroups: (serviceNode: ServiceNode) => {
    groups: TagGroup[];
    ungrouped: OperationNode[];
};
export declare const computeTagGroupsWithModels: (serviceNode: ServiceNode) => {
    groups: TagGroupWithModels[];
    ungrouped: (OperationNode | import("../../utils/oas/types").SchemaNode)[];
};
interface ComputeAPITreeConfig {
    hideSchemas?: boolean;
    hideInternal?: boolean;
    groupModels?: boolean;
}
export declare const computeAPITree: (serviceNode: ServiceNode, config?: ComputeAPITreeConfig) => TableOfContentsItem[];
export declare const findFirstNodeSlug: (tree: TableOfContentsItem[]) => string | void;
export declare const isInternal: (node: ServiceChildNode | ServiceNode) => boolean;
export {};
