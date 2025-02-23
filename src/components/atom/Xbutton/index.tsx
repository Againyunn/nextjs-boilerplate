import Image from "next/image";
import XIcon from "assets/icon/Xicon.svg";

interface XButtonProps {
  onClick: () => void;
}
export default function XButton({ onClick }: XButtonProps) {
  return (
    <button
      className="rounded-lg bg-gray-700 px-3 py-1 text-sm font-medium text-gray-100 hover:bg-gray-500 hover:text-white"
      title="X"
      onClick={onClick}
    >
      <Image src={XIcon} alt="X" />
    </button>
  );
}
