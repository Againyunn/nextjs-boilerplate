import Image from "next/image";
import XIcon from "assets/icon/Xicon.svg";

interface XButtonProps {
  onClick: () => void;
  classes?: string;
}
export default function XButton({ onClick, classes }: XButtonProps) {
  return (
    <button
      className={`rounded-lg  text-sm font-medium hover:text-white ${classes}`}
      title="X"
      onClick={onClick}
    >
      <Image src={XIcon} alt="X" height={16} width={16} />
    </button>
  );
}
