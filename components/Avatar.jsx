function Avatar({ url, className }) {
  return (
    <img
      className={`h-11 rounded-full cursor-pointer transition duration-150 transform hover:scale-125 ${className}`}
      loading="loading"
      src={url}
      alt="profile pic"
    />
  );
}

export default Avatar;
