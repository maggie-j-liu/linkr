const getUserId = (message) => {
  const user = message.member?.user ?? message.user;
  return user.id;
};

export default getUserId;
