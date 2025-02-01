import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/icons/logo-1.png";
import Link from "next/link";
interface IProps {
  width: string;
  height: string;
}
function Logo({ height = "80px", width = "80px" }: IProps) {
  return (
    <Link href={"/"} className="relative z-50" style={{ width, height }}>
      <Image
        src={logo}
        alt="store"
        className="overflow-visible object-cover"
        fill
      />
    </Link>
  );
}

export default Logo;
