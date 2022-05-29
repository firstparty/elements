import { IServer as _IServer } from '@stoplight/types';
export declare type IServer = Omit<_IServer, 'id'>;
export declare const getServersToDisplay: (originalServers: IServer[], mockUrl?: string | undefined) => IServer[];
export declare const getServerUrlWithDefaultValues: (server: IServer) => string | null;
