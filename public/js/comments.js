const submitComment = async () => {
  const comments = document.querySelector('#comment').value
  const bloggy_id = document.querySelector('#bloggy')
  let blogId = bloggy_id.getAttribute('data-id')

  console.log('I made it here!')

  console.log(blogId)
  if (comments) {
    console.log(comments)

    let input = JSON.stringify({
      comments,
      blog_id: blogId,
    })

    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.location.replace(`/bloggy/${blogId}`)
    }
  }
}
document.querySelector('.comment-btn').addEventListener('click', submitComment)
