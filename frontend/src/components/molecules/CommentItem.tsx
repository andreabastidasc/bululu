import { type CommentReply, formatDate } from "@/lib/api";

export function CommentItem({ comment }: { comment: CommentReply }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="text-base">{comment.author_name}</strong>
                <time dateTime={comment.created_at} className="text-sm text-ink-soft">
                    {formatDate(comment.created_at)}
                </time>
            </div>
            <p className="text-base whitespace-pre-line">{comment.body}</p>
        </div>
    );
}
