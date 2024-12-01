import { useEffect, useState } from "react";

export default function usePageHeight() {
    const [height, setHeight] = useState(0);
    useEffect(() => {
        setHeight(document.getElementsByTagName("body")[0].clientHeight);
    }, []);
    return height;
}
