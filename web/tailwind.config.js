module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Raleway', 'ui-sans-serif', 'system-ui'],
            serif: ['ui-serif', 'Georgia'],
            mono: ['Source Code Pro', 'ui-monospace', 'SFMono-Regular'],
            body: ['Raleway'],
        },
        extend: {
            fontSize: { hero: '14rem' },
            colors: {
                primary: '#0000d7',
            },
            spacing: {
                hero: '40rem',
            },
        },
    },
    plugins: [],
}
