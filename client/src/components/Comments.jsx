function Comments({ comment }) {

  return (
    <div className='flex '>
      <img  src={comment.userId.picture} className='flex-none rounded-full w-8 h-8 mt-2 mr-2'/>
      <div className='p-3  bg-base-200 rounded-2xl'>
        <p className='font-medium'> {comment.userId.username} </p>
        <p className='max-w-48 md:max-w-md break-words'>{ comment.text }</p>
      </div>
    </div>
  );
}

export default Comments;