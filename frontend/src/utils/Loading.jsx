import React from "react";

function Loading({text}) {
  return (
    <div className=" absolute top-0 bottom-0 rounded-2xl opacity-70 right-0 left-0 flex justify-center flex-col items-center bg-gray-100 z-3">
      <div className="border-8 h-[95%] w-[95%] border-t-gray-300 animate-spin border-blue-900 sm:h-1/2 sm:w-1/2 max-h-[200px] max-w-[200px] rounded-full z-10 mb-4"></div>
      <span className=" animate-ping text-xl text-blue-900 font-semibold">{text}</span>
    </div>
  );
}

export default Loading;
