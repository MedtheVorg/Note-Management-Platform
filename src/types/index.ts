import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';

export type Note = {
    _id: string;
    content: string;
    isArchived: boolean;
    createdAt: string;
    color: Color;
};
export type Color = {
    _id: string;
    hex: string;
};

export type LogoProps = ComponentPropsWithoutRef<'div'>;

export type CreateFormProps = {
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export type ColorSelectProps = {
    selectedColor: string;
    setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
};
