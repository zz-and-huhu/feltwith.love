import { Feature } from "@/types/feature";

const SingleFeature = ({
  feature,
  isImageLeft,
}: {
  feature: Feature;
  isImageLeft: boolean;
}) => {
  const { icon, title, paragraph } = feature;
  const imageAlignment = isImageLeft ? "flex-row" : "flex-row-reverse";

  return (
    <div className={`flex w-full ${imageAlignment} gap-8`}>
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="flex items-center justify-center rounded-md">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="mb-10 text-2xl font-bold text-black dark:text-white sm:text-2xl lg:text-4xl xl:text-4xl">
          {title}
        </h3>
        <p className="pr-[10px] text-xl leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
