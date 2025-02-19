import type { IMarkdownViewerProps } from '@stoplight/markdown-viewer';
import { IHttpOperation, IHttpService, NodeType } from '@stoplight/types';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
export declare type JSONSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;
export declare type ParsedNode = {
    type: NodeType.Article;
    data: IMarkdownViewerProps['markdown'];
} | {
    type: NodeType.HttpOperation;
    data: IHttpOperation;
} | {
    type: NodeType.HttpService;
    data: IHttpService;
} | {
    type: NodeType.Model;
    data: JSONSchema7;
} | {
    type: NodeType.HttpServer;
    data: unknown;
} | {
    type: NodeType.Unknown;
    data: unknown;
} | {
    type: NodeType.TableOfContents;
    data: unknown;
} | {
    type: NodeType.Generic;
    data: unknown;
};
export interface INodeFilter {
    nodeUri?: string;
    nodeType?: string;
}
export interface IBranchNode {
    id: number;
    version?: string;
    isLatestVersion?: boolean;
    node: {
        id: number;
        uri: string;
    };
    snapshot: {
        id: number;
        type: string;
        name: string;
        summary?: string | null;
        data?: unknown;
        tagNames?: string[];
    };
}
export declare enum IntegrationKind {
    AzureDevopsServer = "azure_devops_server",
    BitbucketCloud = "bitbucket_cloud",
    BitbucketServer = "bitbucket_server",
    Builtin = "builtin",
    Gitea = "gitea",
    Github = "github",
    Gitlab = "gitlab",
    Ldap = "ldap",
    Saml = "saml"
}
export declare type BundledBranchNode = {
    id: number;
    data: string;
    type: NodeType;
    name: string;
    uri: string;
    summary: string;
    branchSlug: string;
    workspaceIntegration: {
        kind: IntegrationKind;
        apiUrl: string;
        hostUrl: string;
    };
    externalOrgSlug: string;
    externalSlug: string;
};
export interface ITableOfContentsTree {
    items: TableOfContentItem[];
}
export declare type TableOfContentItem = Divider | Group | Item;
export declare type Divider = {
    title: string;
    type: 'divider';
};
export declare type Group = {
    title: string;
    type: 'group';
    items: TableOfContentItem[];
    uri?: string;
};
export declare type Item = {
    title: string;
    type: 'item';
    uri: string;
};
export declare type RouterType = 'history' | 'memory' | 'hash' | 'static';
export interface RoutingProps {
    basePath?: string;
    staticRouterPath?: string;
    router?: RouterType;
}
export declare type ParamField = {
    name: string;
    description: string;
    example: string;
};
