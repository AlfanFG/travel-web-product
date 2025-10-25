import type { IComment } from "@/feature/comments/hooks";
import moment from "moment";
import DOMPurify from "dompurify";

export default function CommentBox({
  content,
  updatedAt,

  user,
}: IComment) {
  const comment = DOMPurify.sanitize(content);
  return (
    <div className="chat chat-start py-4">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-header">
        {user.username}
        <time className="text-xs opacity-50">
          {moment(updatedAt).format("DD MM YYYY - HH:MM")}
        </time>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: comment }}
        className="chat-bubble"
      />
    </div>
  );
}
