import { Document, Model } from 'mongoose';
export interface IGroup extends Document {
    id: string;
    hasEvent: boolean;
    eventId: string;
    time: string;
    save: () => void;
}
declare const Group: Model<IGroup>;
export default Group;
