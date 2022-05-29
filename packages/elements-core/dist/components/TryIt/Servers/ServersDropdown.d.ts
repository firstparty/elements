import type { IServer } from '../../../utils/http-spec/IServer';
export declare type ServersDropdownProps = {
    servers: IServer[];
};
export declare const ServersDropdown: {
    ({ servers }: ServersDropdownProps): JSX.Element;
    displayName: string;
};
