import  {model, Schema, Document} from 'mongoose';
import { hash } from 'bcryptjs';

const ImageSchema = new Schema({
    getUrl: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


export default model('Image', ImageSchema);