export default function LoginSideScreen() {
  return (
    <div
      className="
      w-full 
      h-[33vh] md:h-[50vh] lg:h-screen lg:w-1/2  
      flex flex-col items-center justify-center
      text-center 
      md:text-4xl
      bg-[rgb(172,173,173)]
      rounded-2xl lg:rounded-b-none lg:rounded-l-2xl
      mt-1 lg:my-0
      "
    >
      <h1
        className="
        text-white 
        text-2xl md:text-3xl lg:text-5xl 
        font-serif 
        font-bold
        mx-14
        "
      >
        Your journey begins with a single step. We'll handle the rest.
      </h1>

      <p
        className="
        text-white 
        mt-4 
        text-lg md:text-base lg:text-xl 
        font-sans 
        opacity-75 
        mx-5
        "
      >
        Discover the world's most breathtaking destinations, curated for you.
      </p>
    </div>
  );
}
