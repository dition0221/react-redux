import { Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  Variants,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const Anchor = styled(motion.button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  fill: ${(props) => props.theme.textColor};
  position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
  &:active {
    background-color: tomato;
  }
  svg {
    width: 100%;
    aspect-ratio: 1/1;
  }
`;

const anchorVariants: Variants = {
  top: { display: "none" },
  scroll: { display: "block" },
};

export default function Layout() {
  // Anchor
  const { scrollY } = useScroll();
  const anchorAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) anchorAnimation.start("scroll");
    else anchorAnimation.start("top");
  });
  const goToTop = () => scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      <Anchor
        onClick={goToTop}
        variants={anchorVariants}
        initial="top"
        animate={anchorAnimation}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </Anchor>
    </>
  );
}
