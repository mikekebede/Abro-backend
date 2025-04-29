import mongoose,{ Document, Schema, model } from 'mongoose';

interface IPosting extends Document {
    creatorID: Schema.Types.ObjectId;
    serviceTitle: string;
    budget: string;
    deadline: string;
    skills: string;
    location: string;
    fullDescription: string;
    contactInfo: string;
    preferredQualifications: string;
    attachments: string;
    createdAt?: Date;
    updatedAt?: Date;
}
const postingSchema = new Schema<IPosting>({
    creatorID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceTitle: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: false
    },
    deadline: {
        type:String,
        required:true
    },
    skills: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true  
    },
    fullDescription: {
        type: String,
        required: false
    },
    contactInfo: {
        type: String,
        required: false
    },
    preferredQualifications: {
        type: String,
        required: false
    },
    attachments: {
        type: String,
        required: false
    },

},
{ timestamps: true }
);

const Posting = mongoose.model<IPosting>("Posting", postingSchema);
export default Posting;

