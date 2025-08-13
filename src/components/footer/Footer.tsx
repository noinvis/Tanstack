import { memo } from "react";

const Footer = () => {
  return (
    <footer className="h-[400px] bg-[lightgray] w-full flex justify-center">
      <div className="flex justify-between items-center container max-[400px]:flex-col max-[400px]:justify-center">
        <p className="text-[30px]">Footer</p>
        <p className="text-[20px]">Lorem ipsum dolor sit amet.</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
