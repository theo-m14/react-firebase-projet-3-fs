const CreatePost = () => {
  return (
    <div className="new-post-modal">
      <form>
        <textarea placeholder="Message..."></textarea>
        <input type="submit" value="Poster" />
      </form>
    </div>
  );
};

export default CreatePost;
