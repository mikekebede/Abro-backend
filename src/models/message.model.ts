import { Document, Schema, model } from "mongoose";

interface IMessage extends Document {
    senderId: Schema.Types.ObjectId;
    receiverId: Schema.Types.ObjectId;
    text?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Message = model<IMessage>("Message", messageSchema);
export default Message;
export { IMessage };
