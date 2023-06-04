import { useMediaQuery } from 'react-responsive';

const useCheckIsMobileView = () => {
    const isMobileView = useMediaQuery({ query: `(max-width: 760px)` });
    return {isMobileView};
}

export default useCheckIsMobileView
