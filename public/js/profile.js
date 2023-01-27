const newFormHandler = async (event) => {
  event.preventDefault()

  const title = document.querySelector('#blog-title').value.trim()
  const name = document.querySelector('#name').value.trim()
  const description = document.querySelector('#description').value.trim()
  const date = document.querySelector('#blog_name').value.trim()

  if (title && description && user_name && date) {
    let input = JSON.stringify({
      title,
      description,
      user_name,
      blog_date: date,
    })

    const response = await fetch(`/api/bloggy/`, {
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      // /profile corresponds to homeRoutes.js on BE
      document.location.replace('/profile')
    }

    //Error bars when no entry is provided by users.
  } else {
    if (!title) {
      document.querySelector('#name').className = 'input-error form-control'
    }
    if (!description) {
      document.querySelector(' #description').className =
        'input-error form-control'
    }
    if (!name) {
      document.querySelector('#user-name').className =
        'input-error form-control'
    }
    if (!date) {
      document.querySelector('#blog_date').className =
        'input-error form-control'
    }

    document.querySelector('.error-text').textContent =
      'You need to complete all fields to post a blog!'
  }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/bloggy/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      document.location.replace('/profile')
    }
  }
}

document
  .querySelector('.bloggy-form')
  .addEventListener('submit', newFormHandler)

var deleteBtn = document.querySelector('#bloggy-list')
console.log(deleteBtn)
deleteBtn.addEventListener('click', delButtonHandler)
