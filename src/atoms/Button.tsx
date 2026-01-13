interface Props {
    children?:React.ReactNode;
    type?: "submit" | "reset";
    onClick?: () => void; 
}

export const Button = ({
    children,
    type,
}: Props) => {

    return (
        <>
            <button type={type}
            className="bg-primary size-text text-white font-medium px-6 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
            >
                {children}
            </button>
        </>
    )
};