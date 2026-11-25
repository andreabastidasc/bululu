import { CommentItem } from "@/components/molecules/CommentItem";
import type { Comment } from "@/lib/api";

type CommentsSectionProps = {
    comments: Comment[];
    open: boolean;
};

export function CommentsSection({ comments, open }: CommentsSectionProps) {
    const total = comments.reduce((sum, comment) => sum + 1 + comment.replies.length, 0);

    return (
        <section className="border-t-3 border-ink bg-paper" aria-labelledby="comentarios-title">
            <div className="wrap mx-auto flex max-w-[728px] flex-col gap-6 py-12 md:py-16">
                <h2 id="comentarios-title" className="font-display text-[36px] leading-none font-normal">
                    Comentarios{total > 0 && ` (${total})`}
                </h2>

                {comments.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                        {comments.map((comment) => (
                            <li
                                key={comment.id}
                                className="flex flex-col gap-4 rounded-3xl border-3 border-ink bg-paper p-5 shadow-hard-sm"
                            >
                                <CommentItem comment={comment} />
                                {comment.replies.length > 0 && (
                                    <ul className="flex flex-col gap-4 border-l-3 border-lemon pl-4">
                                        {comment.replies.map((reply) => (
                                            <li key={reply.id}>
                                                <CommentItem comment={reply} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-ink-soft">
                        {open ? "Todavía no hay comentarios." : "Este artículo no tiene comentarios."}
                    </p>
                )}
            </div>
        </section>
    );
}
