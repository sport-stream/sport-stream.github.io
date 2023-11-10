import { VerticalAds } from "../ads";
import { useDelay } from "../hooks/useDelay";

const Right = () => {
  const { isDelayed } = useDelay(1000);
  return <>{isDelayed ? undefined : <VerticalAds />}</>;
};
export default Right;
