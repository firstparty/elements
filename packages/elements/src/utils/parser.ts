import { parse } from '@stoplight/yaml';

import { computeAPITree } from '../components/API/utils';
import { transformOasToServiceNode } from './oas';

export const parseDocument = (document: string) => {
  const parsedDocument = parse(document);
  const serviceNode = transformOasToServiceNode(parsedDocument);

  if (serviceNode !== null) {
    return computeAPITree(serviceNode);
  }

  return serviceNode;
};
