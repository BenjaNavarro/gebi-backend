import { Schema } from 'mongoose';

export const AuthorsByProjectSchema = new Schema({
    proyecto: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    authorAndReviewer: [{
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    }],
},
{
    timestamps: true,
});