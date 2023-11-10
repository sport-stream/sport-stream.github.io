import { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";

export const Ads = () => {
  return (
    <Container textAlign="center" style={{ marginTop: 20 }}>
      <iframe
        title="a-ads"
        data-aa="2270484"
        src="//ad.a-ads.com/2270484?size=728x90"
        style={{
          width: "728px",
          height: "90px",
          border: "0px",
          padding: 0,
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      ></iframe>
    </Container>
  );
};

export const VerticalAds = () => {
  const banner = useRef<HTMLDivElement>();

  const atOptions = {
    key: "35555cf299879d6cd0ae610d4038c613",
    format: "iframe",
    height: 600,
    width: 160,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);
  // Social Ad
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src =
  //     "//pl21302148.toprevenuegate.com/d2/b8/7f/d2b87fe3bf6c0ae7476fb1ef4572f3d2.js'";
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <Container textAlign="center" style={{ marginTop: 90 }}>
      <div
        className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center"
        // @ts-ignore
        ref={banner}
      ></div>
    </Container>
  );
};
// export const VerticalAds = () => {
//   return (
//     <Container textAlign="center" style={{ marginTop: 90 }}>
//       <iframe
//         title="a-ads"
//         data-aa="2271213"
//         src="//ad.a-ads.com/2271213?size=160x600"
//         style={{
//           width: "160px",
//           height: "600px",
//           border: "0px",
//           padding: 0,
//           overflow: "hidden",
//           backgroundColor: "transparent",
//         }}
//       ></iframe>
//     </Container>
//   );
// };

export const InvisibleAds = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const checkFocus = () => {
      if (document.activeElement === document.getElementById("ads")) {
        setTimeout(() => {
          setHide(true);
        }, 90);
        window.focus();
      }
    };

    window.setInterval(checkFocus, 100);
  }, []);

  if (hide) return null;
  return (
    <>
      <div
        id="pad"
        style={{
          zIndex: 4,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        onMouseMove={(e: any) => {
          setMousePosition({ x: e.clientX - 300, y: e.clientY - 100 });
        }}
      />
      <Container
        textAlign="center"
        style={{
          zIndex: 5,
          position: "absolute",
          top: mousePosition.y,
          left: mousePosition.x,
          opacity: 0,
        }}
      >
        <iframe
          id="ads"
          title="a-ads"
          data-aa="2270484"
          src="//ad.a-ads.com/2270484?size=728x90"
          style={{
            width: "728px",
            height: "90px",
            border: "0px",
            padding: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        ></iframe>
      </Container>
    </>
  );
};
