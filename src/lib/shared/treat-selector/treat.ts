export interface Treat {
    name: string;
    calories: number;
    icon: string;
}

export const treats: Treat[] = [
    {
        name: 'Kölschs',
        calories: 132,
        icon: 'GlassMugVariant'
    },
    {
        name: 'Glasses of wine',
        calories: 140,
        icon: 'GlassWine'
    },
    {
        name: 'Mojitos',
        calories: 200,
        icon: 'GlassCocktail'
    },
    {
        name: 'Schwarzwäldertorte stücks',
        calories: 500,
        icon: 'CakeLayered'
    },
    {
        name: 'Döners',
        calories: 780,
        icon: 'Taco'
    }
];