import { isHttpOperation, isHttpService, TableOfContentsItem } from '@stoplight/elements-core';
import { NodeType } from '@stoplight/types';
import { defaults } from 'lodash';

import { GroupNode, OperationNode, ServiceChildNode, ServiceNode } from '../../utils/oas/types';

export type TagGroup = { title: string; items: OperationNode[] };
export type TagGroupWithModels = { title: string; items: GroupNode[] };

export const computeTagGroups = (serviceNode: ServiceNode) => {
  const groupsByTagId: { [tagId: string]: TagGroup } = {};
  const ungrouped = [];

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  for (const node of serviceNode.children) {
    if (node.type !== NodeType.HttpOperation) continue;
    const tagName = node.tags[0];

    if (tagName) {
      const tagId = tagName.toLowerCase();
      if (groupsByTagId[tagId]) {
        groupsByTagId[tagId].items.push(node);
      } else {
        const serviceTagIndex = lowerCaseServiceTags.findIndex(tn => tn === tagId);
        const serviceTagName = serviceNode.tags[serviceTagIndex];
        groupsByTagId[tagId] = {
          title: serviceTagName || tagName,
          items: [node],
        };
      }
    } else {
      ungrouped.push(node);
    }
  }

  const orderedTagGroups = Object.entries(groupsByTagId)
    .sort(([g1], [g2]) => {
      const g1LC = g1.toLowerCase();
      const g2LC = g2.toLowerCase();
      const g1Idx = lowerCaseServiceTags.findIndex(tn => tn === g1LC);
      const g2Idx = lowerCaseServiceTags.findIndex(tn => tn === g2LC);

      // Move not-tagged groups to the bottom
      if (g1Idx < 0 && g2Idx < 0) return 0;
      if (g1Idx < 0) return 1;
      if (g2Idx < 0) return -1;

      // sort tagged groups according to the order found in HttpService
      return g1Idx - g2Idx;
    })
    .map(([, tagGroup]) => tagGroup);

  return { groups: orderedTagGroups, ungrouped };
};

export const computeTagGroupsWithModels = (serviceNode: ServiceNode) => {
  const groupsByTagId: { [tagId: string]: TagGroupWithModels } = {};
  const ungrouped = [];

  const lowerCaseServiceTags = serviceNode.tags.map(tn => tn.toLowerCase());

  for (const node of serviceNode.children) {
    if (node.type !== NodeType.HttpOperation && node.type !== NodeType.Model) continue;
    const tagName = node.tags[0];

    if (node.type === NodeType.Model && !tagName) continue;

    if (tagName) {
      const tagId = tagName.toLowerCase();
      if (groupsByTagId[tagId]) {
        groupsByTagId[tagId].items.push(node);
      } else {
        const serviceTagIndex = lowerCaseServiceTags.findIndex(tn => tn === tagId);
        const serviceTagName = serviceNode.tags[serviceTagIndex];
        groupsByTagId[tagId] = {
          title: serviceTagName || tagName,
          items: [node],
        };
      }

      // now sort the group so that it has the model inside
      groupsByTagId[tagId].items = Object.values(groupsByTagId[tagId].items).sort((first, second) => {
        return first.type === NodeType.Model ? -1 : 1;
      });
    } else {
      ungrouped.push(node);
    }
  }

  const orderedTagGroups = Object.entries(groupsByTagId)
    .sort(([g1], [g2]) => {
      const g1LC = g1.toLowerCase();
      const g2LC = g2.toLowerCase();
      const g1Idx = lowerCaseServiceTags.findIndex(tn => tn === g1LC);
      const g2Idx = lowerCaseServiceTags.findIndex(tn => tn === g2LC);

      // Move not-tagged groups to the bottom
      if (g1Idx < 0 && g2Idx < 0) return 0;
      if (g1Idx < 0) return 1;
      if (g2Idx < 0) return -1;

      // sort tagged groups according to the order found in HttpService
      return g1Idx - g2Idx;
    })
    .map(([, tagGroup]) => tagGroup);

  return { groups: orderedTagGroups, ungrouped };
};

interface ComputeAPITreeConfig {
  hideSchemas?: boolean;
  hideInternal?: boolean;
  groupModels?: boolean;
  noMeta?: boolean;
}

const defaultComputerAPITreeConfig = {
  hideSchemas: false,
  hideInternal: false,
};

export const computeAPITree = (serviceNode: ServiceNode, config: ComputeAPITreeConfig = {}) => {
  const mergedConfig = defaults(config, defaultComputerAPITreeConfig);
  const tree: TableOfContentsItem[] = [];

  tree.push({
    id: '/',
    slug: '/',
    title: 'Overview',
    type: 'overview',
    meta: '',
  });

  const operationNodes = serviceNode.children.filter(node => node.type === NodeType.HttpOperation);
  if (operationNodes.length) {
    tree.push({
      title: 'Endpoints',
    });

    const { groups, ungrouped } = config.groupModels
      ? computeTagGroupsWithModels(serviceNode)
      : computeTagGroups(serviceNode);

    // Show ungroupped operations above tag groups
    ungrouped.forEach(operationNode => {
      if (operationNode.type === NodeType.Model || (mergedConfig.hideInternal && operationNode.data.internal)) {
        return;
      }
      tree.push({
        id: operationNode.uri,
        slug: operationNode.uri,
        title: operationNode.name,
        type: operationNode.type,
        meta: mergedConfig.noMeta ? '' : operationNode.data.method,
      });
    });

    groups.forEach(group => {
      const items = group.items.flatMap(operationNode => {
        if (mergedConfig.hideInternal && operationNode.type === NodeType.HttpOperation && operationNode.data.internal) {
          return [];
        }
        return {
          id: operationNode.uri,
          slug: operationNode.uri,
          title: operationNode.name,
          type: operationNode.type,
          meta: mergedConfig.noMeta ? '' : operationNode.type === NodeType.Model ? '' : operationNode.data.method,
        };
      });
      if (items.length > 0) {
        tree.push({
          title: group.title,
          items,
        });
      }
    });
  }

  let schemaNodes = serviceNode.children.filter(node => node.type === NodeType.Model);
  if (mergedConfig.hideInternal) {
    schemaNodes = schemaNodes.filter(node => !node.data['x-internal']);
  }

  if (!mergedConfig.hideSchemas && schemaNodes.length) {
    tree.push({
      title: 'Schemas',
    });

    schemaNodes.forEach(node => {
      tree.push({
        id: node.uri,
        slug: node.uri,
        title: node.name,
        type: node.type,
        meta: '',
      });
    });
  }
  return tree;
};

export const findFirstNodeSlug = (tree: TableOfContentsItem[]): string | void => {
  for (const item of tree) {
    if ('slug' in item) {
      return item.slug;
    }

    if ('items' in item) {
      const slug = findFirstNodeSlug(item.items);
      if (slug) {
        return slug;
      }
    }
  }

  return;
};

export const isInternal = (node: ServiceChildNode | ServiceNode): boolean => {
  const data = node.data;

  if (isHttpOperation(data)) {
    return !!data.internal;
  }

  if (isHttpService(data)) {
    return false;
  }

  return !!data['x-internal'];
};
