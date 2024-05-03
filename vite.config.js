import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default () => {
    return defineConfig({
        base: '',
        plugins: [reactRefresh()],
        // plugins: [reactRefresh(), react()],
    });
};
