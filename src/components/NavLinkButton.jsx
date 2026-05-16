import { Link } from "react-router-dom";

function NavLinkButton({
    to,
    children,
    className = ""
}) {

    return (

        <div className="mt-3 flex items-center justify-center">

            <Link
                to={to}
                className={`
                    text-sm
                    text-blue-600
                    hover:text-black
                    font-medium
                    px-2
                    py-1
                    rounded-md
                    hover:bg-gray-100
                    transition
                    cursor-pointer
                    ${className}
                `}
            >
                {children}
            </Link>

        </div>
    );
}

export default NavLinkButton;