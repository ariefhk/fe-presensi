import clsx from "clsx";

export default function Input({ id, type = "text", className, ...props }) {
    return <input id={id} type={type} {...props} className={clsx("", className)} />;
}
