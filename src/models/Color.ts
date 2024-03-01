import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

class ColorClass {
    @prop({ required: true })
    public hex: string;
}

const Color = mongoose.models.ColorClass || getModelForClass(ColorClass);

export { Color, ColorClass };
