import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                customPrimary: {
                    default: '#8c593b',
                    50: '#f8f4ee',
                    100: '#ede3d4',
                    200: '#ddc8ab',
                    300: '#c9a47b',
                    400: '#b88757',
                    500: '#a97549',
                    600: '#8c593b',
                    700: '#754633',
                    800: '#633b30',
                    900: '#56332d',
                    950: '#311a17',
                },
            },
        },
    },
};
