import { useEffect } from 'react'

export const useDynamicTitle = (title, defaultTitle='Film Fiesta') => {
    useEffect(() => {
        document.title = title;

        return () => {
            document.title = defaultTitle;
        }
    }, [defaultTitle, title]);
}
