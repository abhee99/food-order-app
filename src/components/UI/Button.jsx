export default function Button({ children, textOnly, className, ...prop }) {
    let cssClasses = textOnly ? 'text-button' : 'button'
    cssClasses += ' ' + className
    return <button className={cssClasses} {...prop}>{children}</button>;
}