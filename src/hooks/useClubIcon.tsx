import TTII from "../static/json/TTII.json";
import stringSimilarity from "string-similarity";
import defaultClubIcon from "../static/img/defaultClubIcon.png";

const getMostSimilarClub = (clubName: string) => {
  const clubKey = stringSimilarity.findBestMatch(clubName, Object.keys(TTII));
  return clubKey.bestMatch.rating > 0.7 ? clubKey.bestMatch.target : null;
};

export const useClubIcon = (clubName: string) => {
  if (!clubName) return defaultClubIcon;
  const mostSimilarClub = getMostSimilarClub(clubName);
  if (!mostSimilarClub) return defaultClubIcon;
  const teamId = (TTII as any)[mostSimilarClub];

  return `https://media.api-sports.io/football/teams/${teamId}.png`;
};
