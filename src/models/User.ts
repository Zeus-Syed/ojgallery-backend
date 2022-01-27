import  {model, Schema, Document} from 'mongoose';
import { hash } from 'bcryptjs';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 9,
        maxlength: 9
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export interface IUser extends Document{
    id: Schema.Types.ObjectId,
    password: string
};

// Before saving, convert password to hash
UserSchema.pre<IUser>('save', async function (next) {
    try {
        this.password = await hash(this.password, 10);
        next();
    } catch (error) {
        next();
    }
});

export default model('User', UserSchema);