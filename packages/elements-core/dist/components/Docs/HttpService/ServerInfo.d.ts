import * as React from 'react';
import { IServer } from '../../../utils/http-spec/IServer';
interface ServerInfoProps {
    servers: IServer[];
    mockUrl?: string;
}
export declare const ServerInfo: React.FC<ServerInfoProps>;
export {};
