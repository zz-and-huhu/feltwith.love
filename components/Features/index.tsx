import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container">
          <SectionTitle
            title="Made by love"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
          />

          <div className="flex flex-col gap-20">
            {featuresData.map((feature, index) => (
              <SingleFeature
                key={feature.id}
                feature={feature}
                isImageLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
