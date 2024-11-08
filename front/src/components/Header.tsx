import { Feather } from "@phosphor-icons/react/dist/ssr"

interface HeaderProps {
  pageLabel: string
}

function Header({ pageLabel }: HeaderProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="w-tb-26 h-tb-26 flex justify-center items-center bg-green-3 rounded-sm">
          <Feather size={24} className="text-white" />
        </div>
        <strong className="text-4xl text-green-3 font-serif font-light">
          TB List
        </strong>
      </div>

      <h1 className="text-2xl text-gray-5">
        {pageLabel}
      </h1>
    </>
  );
}

export default Header;
