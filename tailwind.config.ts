import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: { sans: ['Darker Grotesque', ...defaultTheme.fontFamily.sans] },
            fontSize: {
                'xs': '0.694rem',
                'sm': '0.833rem',
                'base': '1rem',
                'lg': '1.2rem',
                'xl': '1.44rem',
                '2xl': '1.728rem',
                '3xl': '2.074rem',
                '4xl': '2.488rem',
                '5xl': '2.986rem',
            },
            colors: {
                customPrimary: {
                    DEFAULT: '#8c593b',
                    hover: '#a97549',
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
                cream: {
                    DEFAULT: '#f6f2ee',
                    50: '#f6f2ee',
                    100: '#f0eae4',
                    200: '#e1d4c7',
                    300: '#ceb7a3',
                    400: '#b9967e',
                    500: '#aa7d65',
                    600: '#9d6c59',
                    700: '#83584b',
                    800: '#6b4a41',
                    900: '#573d37',
                    950: '#2e1f1c',
                },
                olive: {
                    DEFAULT: '#759052',
                    50: '#f4f6ef',
                    100: '#e6ecdb',
                    200: '#cfdbbb',
                    300: '#b0c393',
                    400: '#93ab70',
                    500: '#759052',
                    600: '#586247',
                    700: '#475833',
                    800: '#3d4a2e',
                    900: '#333e29',
                    950: '#1a2013',
                },
            },
            variants: {
                extend: {
                    textColor: ['hover'], // Ensure hover is available for text color
                    backgroundColor: ['hover'], // Ensure hover is available for background
                },
            },
        },
    },
};
