let title = document.querySelector('#blog-title')
let description = document.querySelector('#description')
let date = document.querySelector('#blog-date')

const newFormHandler = async (event) => {
  event.preventDefault()

  if (title && description && date) {
    let input = JSON.stringify({
      title: title.value,
      description: description.value,
      blog_date: date.value,
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
      document.querySelector('#blog-title').className =
        'input-error form-control'
    }
    if (!description) {
      document.querySelector('#description').className =
        'input-error form-control'
    }
    if (!date) {
      document.querySelector('#blog-date').className =
        'input-error form-control'
    }

    document.querySelector('.error-text').textContent =
      'You need to complete all fields to post a blog!'
  }
}

const delBtnHandler = async (event) => {
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

const editBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')
    const response = await fetch(`/api/bloggy/${id}`)
    const data = await response.json()
    console.log(data)
    console.log(editPost)
    editPost[0].value = id

    description.value = data.description
    title.value = data.title
    date.value = data.blog_date
  }
}

const editPostHandler = async (event) => {
  console.log('we made it here!')
  console.log(event.target.value)
  const id = event.target.value
  console.log(id)

  const response = await fetch(`/api/bloggy/${id}`)
  const data = await response.json()
  console.log(data)

  const input = {
    title: title.value,
    description: description.value,
    date: date.value,
  }

  const updatedPost = await fetch(`/api/bloggy/${id}`, {
    method: 'PUT',
    body: input,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (updatedPost.ok) {
    alert('update failed!')
  }
}

// const response = await fetch(`/api/bloggy/`, {
//   method: 'PUT',
//   body: input,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

document
  .querySelector('.bloggy-form')
  .addEventListener('submit', newFormHandler)

//looping through the delete button to delete any post
let deleteBtn = document.querySelectorAll('.bloggy-list')
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', delBtnHandler)
}

//looping through the post's edit button (next to the delete button)
let editBtn = document.querySelectorAll('#bloggy-edit')
for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener('click', editBtnHandler)
  console.log('clicked')
}

//Edit post
let editPost = document.querySelectorAll('#edit-post')
for (let i = 0; i < editPost.length; i++) {
  editPost[i].addEventListener('click', editPostHandler)
  console.log('clicked')
}
