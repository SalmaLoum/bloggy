const submitComment = async () => {
  const comments = document.querySelector('#comment').value.trim()
  const bloggy_id = document.querySelector('#bloggy')
  let blogId = bloggy_id.getAttribute('data-id')
  console.log(blogId)
  if (comment) {
    console.log(comment)

    let input = JSON.stringify({
      comments,
      bloggy_id: blogId,
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
    } else {
    }
  }
}

document.querySelector('.btn').addEventListener('click', submitComment)
