import homeVideo from "../assets/home.mp4";

export const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src={homeVideo} type="video/mp4" />
    </video>
  );
};

