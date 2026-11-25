type RichTextProps = {
    html: string;
    className?: string;
};

export function RichText({ html, className = "" }: RichTextProps) {
    return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
