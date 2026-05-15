import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../utils/copyToClipboard";

function CopyButton({ text }) {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {

        try {

            await copyToClipboard(text);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (err) {

            console.error(err);
        }
    };

    return (

        <button
            type="button"
            title={copied ? "Copied" : "Copy"}
            onClick={handleCopy}
            className={`
                cursor-pointer
                hover:bg-gray-200
                transition
                duration-300
                active:bg-gray-400
                active:scale-90
                rounded-full
                p-2
                ${copied ? "bg-gray-200" : ""}
            `}
        >

            {copied ? (
                <Check size={12} />
            ) : (
                <Copy size={12} />
            )}

        </button>
    );
}

export default CopyButton;