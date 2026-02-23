import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIndex }) => {
  const { fullName, profilePic, username } = conversation;

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = conversation?._id === selectedConversation?._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt={username} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{fullName.toUpperCase()}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
