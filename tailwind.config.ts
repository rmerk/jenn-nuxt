import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: { sans: ['Darker Grotesque', ...defaultTheme.fontFamily.sans], },
            fontSize: {
                xs: '0.694rem',
                sm: '0.833rem',
                base: '1rem',
                lg: '1.2rem',
                xl: '1.44rem',
                '2xl': '1.728rem',
                '3xl': '2.074rem',
                '4xl': '2.488rem',
                '5xl': '2.986rem'
            },
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
