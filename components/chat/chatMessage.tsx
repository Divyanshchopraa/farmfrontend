type Props = {
  message: string;
  role: "user" | "bot";
};

export default function ChatMessage({ message, role }: Props) {
  return (
    <div
      className={`w-full flex ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
          role === "user"
            ? "bg-green-600 text-white right-full"
            : "bg-white text-gray-800 shadow"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
