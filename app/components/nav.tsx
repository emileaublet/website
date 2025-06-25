import Link from "next/link";
import { Emiles } from "./emiles";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export const Nav = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link
        className="text-xl font-medium tracking-tight flex items-center gap-4 hover:text-emerald-600"
        href="/"
      >
        <Emiles small />
        <span className="font-mono font-medium max-md:hidden">
          Émile Aublet
        </span>
      </Link>
      <div className="flex gap-4">
        <Link href="https://github.com/emileaublet">
          <span className="sr-only">GitHub</span>
          <FaGithub className="size-6 hover:text-emerald-600" />
        </Link>
        <Link href="https://www.linkedin.com/in/emileaublet/">
          <span className="sr-only">LinkedIn</span>
          <FaLinkedin className="size-6 hover:text-emerald-600" />
        </Link>
        <Link href="mailto:emileaublet@gmail.com">
          <span className="sr-only">Email</span>
          <FaEnvelope className="size-6 hover:text-emerald-600" />
        </Link>
      </div>
    </nav>
  );
};
