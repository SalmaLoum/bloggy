const newFormHandler = async (event) => {
  event.preventDefault()

  const title = document.querySelector('#blog-title').value.trim()
  const description = document.querySelector('#description').value.trim()
  const date = document.querySelector('#blog-date').value.trim()

  if (title && description && date) {
    let input = JSON.stringify({
      title,
      description,
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
    if (!date) {
      document.querySelector('#blog_date').className =
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
    title = data.title
    description.value = data.description
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

let editBtn = document.querySelectorAll('#bloggy-edit')
for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener('click', editBtnHandler)
  console.log('clicked')
}
