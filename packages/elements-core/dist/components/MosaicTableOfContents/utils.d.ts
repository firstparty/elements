import { TableOfContentsDivider, TableOfContentsExternalLink, TableOfContentsGroup, TableOfContentsItem, TableOfContentsNode, TableOfContentsNodeGroup } from './types';
export declare function getHtmlIdFromItemId(id: string): string;
export declare function isGroupOpenByDefault(depth: number, item: TableOfContentsGroup | TableOfContentsNodeGroup, activeId?: string, maxDepthOpenByDefault?: number): boolean | "" | undefined;
export declare function findFirstNode(items: TableOfContentsItem[]): TableOfContentsNode | TableOfContentsNodeGroup | void;
export declare function isDivider(item: TableOfContentsItem): item is TableOfContentsDivider;
export declare function isGroup(item: TableOfContentsItem): item is TableOfContentsGroup;
export declare function isNodeGroup(item: TableOfContentsItem): item is TableOfContentsNodeGroup;
export declare function isNode(item: TableOfContentsItem): item is TableOfContentsNode;
export declare function isExternalLink(item: TableOfContentsItem): item is TableOfContentsExternalLink;
