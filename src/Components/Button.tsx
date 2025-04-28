import {ButtonHTMLAttributes} from "react";

type ButtonProps = {
    title: string
    onClick: (...args: any) => void
    disabled?: boolean
}

type Props = ButtonHTMLAttributes<HTMLButtonElement>&ButtonProps

export const Button = ({title, onClick, disabled, className}: Props) => {
    return <button
        onClick={() => onClick()}
        disabled={disabled}
        className={className}
    >
        {title}
    </button>
}
