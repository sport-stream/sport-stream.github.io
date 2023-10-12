export const Video = (props: any) => {
  const video = props.video;
  return (
    <div>
      <p>Rate: {video.rate}</p>
      {JSON.stringify(video)}
      <iframe
        title="sports streams, football, soccer, nfl, nhl, nba"
        width="100%"
        height="800"
        style={{ border: "none", overflow: "hidden", paddingTop: "" }}
        src={video.link}
      ></iframe>
    </div>
  );
};
