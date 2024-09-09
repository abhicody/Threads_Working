import RepostThreadCard from "@/components/cards/RepostThreadCard";
import RepostComment from "@/components/forms/RepostComment";
import ShareButtons from "@/components/ui2/ShareButton";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <RepostThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
        <div className="mt-2 text-body-bold ">
          <ShareButtons />
        </div>
      </div>

      <div className="mt-7">
        <RepostComment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  );
}
