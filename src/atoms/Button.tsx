interface Props {
    children?:React.ReactNode;
    type?: "submit" | "reset";
}

export const Button = ({
    children,
    type,
}: Props) => {

    return (
        <>
            <button type={type}
            className="bg-primary text-white font-medium px-6 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
            >
                {children}
            </button>
        </>
    )
};