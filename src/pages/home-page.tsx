import { BackgroundVideo, HomeHero } from "../components";

export const HomePage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <BackgroundVideo />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      <HomeHero />
    </section>
  );
};
