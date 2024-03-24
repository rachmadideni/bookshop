"use client";

type SiteTitleProps = {
  title: string;
  slogan: string;
};

const SiteTitle = ({ title, slogan }: SiteTitleProps) => {
  return (
    <div className="flex flex-col w-full items-center md:items-start gap-4 bg-slate-500/0">
      <h1 className="md:text-left text-center text-5xl leading-none text-black font-poppins font-semibold capitalize">
        {title}
      </h1>
      <p className="text-black font-normal text-center text-lg leading-none capitalize">
        {slogan}
      </p>
    </div>
  );
};

export default SiteTitle;
