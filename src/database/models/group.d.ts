import { Document } from 'mongoose';
export interface IGroup extends Document {
    id: string;
    isCreated: boolean;
    eventId: string;
}
declare const _default: any;
export default _default;
