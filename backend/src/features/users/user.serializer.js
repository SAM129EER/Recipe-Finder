const serializeUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
});

export { serializeUser };
