import { cn } from "@/lib/utils";

const BatIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 269.996 269.996"
            xmlSpace="preserve"
            className={cn("h-6 w-6", className)}
        >
            <g>
                <g>
                    <path
                        fill="currentcolor"
                        d="M256.925,137.064c-0.823,0.067-1.63,0.149-2.426,0.24
			C255.365,137.532,256.189,137.475,256.925,137.064z"
                    />
                    <path
                        fill="currentcolor"
                        d="M267.728,99.195c-29.327-26.908-9.023-52.473,2.268-59.774
			c-74.255,29.398-69.55,105.234-81.829,113.156c-11.727,7.797-22.692-2.98-28.14-13.195c3.392,13.162-10.42,21.885-20.414,7.166
			c2.686,20.109,9.489,33.442-18.316,25.955C90.703,164.274,39.174,139.222,0,170.907c22.894-1.74,47.758,16.474,46.624,36.849
			c16.125-12.228,41.249,3.672,40.871,22.819c7.446-20.636,40.434-25.318,55.434-6.389c-5.479-33.531,35.738-27.986,44.412-6.672
			c-10.837-45.279,22.031-46.93,40.482-36.654c-6.701-28.987,4.347-40.996,26.676-43.555
			C245.425,134.918,231.762,100.52,267.728,99.195z"
                    />
                </g>
            </g>
        </svg>
    );
};
BatIcon.displayName = "BatIcon";

export default BatIcon;
