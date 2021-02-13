import { IGroup } from 'database/models/group';
export declare type PlayerType = {
    userId: string;
    displayName: string;
    pictureUrl: string;
    groups: IGroup[];
};
declare class Player {
    player: PlayerType;
    constructor(player: PlayerType);
}
export default Player;
