export const generateShareCard = (score: number, userName: string) => ({
  title: `${userName} scored ${score}`,
  description: 'Share your achievement',
});

export default generateShareCard;
